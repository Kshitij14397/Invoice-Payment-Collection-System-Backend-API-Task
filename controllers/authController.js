const { promisify } = require("util");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);

    const token = signToken(newUser._id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      throw new Error("Please provide email and password!");
    }

    // 2) Check if user exists and password is correct
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new Error("Incorrect email or password");
    }

    // 3) If everything ok, send token to the client
    const token = signToken(user._id);
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    res.status(401).json({
      message: err,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    // 1) Getting token and check its there
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    //console.log(token);

    if (!token) {
      throw new Error("You are not logged in! Please log in to get access.");
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      throw new Error("The user belonging to this token does no longer exist");
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      throw new Error("User recently changed password! Please login again.");
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err,
    });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    try {
      // roles ['admin', 'payer', 'receiver]. role='admin'
      console.log(roles);
      console.log(req.user.role);
      if (!roles.includes(req.user.role)) {
        throw new Error("You do not have permission to perform this action");
      }
      next();
    } catch (err) {
      res.status(403).json({
        message: err,
      });
    }
  };
};
