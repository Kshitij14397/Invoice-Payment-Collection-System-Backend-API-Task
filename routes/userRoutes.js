const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

//Creater a Router for each resource basically a sub-application for each resource
const router = express.Router();

router
  .route("/")
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    userController.createUser
  )
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    userController.getAllUsers
  );

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    userController.getUser
  )
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    userController.updateUser
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    userController.deleteUser
  );

router.route("/signup").post(authController.signup);

router.route("/login").post(authController.login);

module.exports = router;
