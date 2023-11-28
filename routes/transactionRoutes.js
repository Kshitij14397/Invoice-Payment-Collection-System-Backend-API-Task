const express = require("express");
const transactionController = require("../controllers/transactionController");
const authController = require("../controllers/authController");

//Creater a Router for each resource basically a sub-application for each resource
const router = express.Router();

router
  .route("/")
  .post(
    authController.protect,
    authController.restrictTo("payer", "admin"),
    transactionController.createTransaction
  )
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    transactionController.getAllTransactions
  );

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    transactionController.getTransaction
  )
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    transactionController.updateTransaction
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    transactionController.deleteTransaction
  );

module.exports = router;
