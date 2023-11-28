const express = require("express");
const userRouter = require("./routes/userRoutes");
const invoiceRouter = require("./routes/invoiceRoutes");
const transactionRouter = require("./routes/transactionRoutes");

const app = express();

//middleware to add body property to req
app.use(express.json());

//Mounting the Router on a route.
app.use("/api/v1/users", userRouter);
app.use("/api/v1/invoices", invoiceRouter);
app.use("/api/v1/transactions", transactionRouter);

app.all("*", (req, res, next) => {
  res.status(404).json({
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

module.exports = app;
