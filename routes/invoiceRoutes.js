const express = require("express");
const invoiceController = require("../controllers/invoiceController");
const authController = require("../controllers/authController");

//Creater a Router for each resource basically a sub-application for each resource
const router = express.Router();

router
  .route("/")
  .post(
    authController.protect,
    authController.restrictTo("receiver", "admin"),
    invoiceController.createInvoice
  )
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    invoiceController.getAllInvoices
  );

router
  .route("/:id")
  .get(invoiceController.getInvoice)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    invoiceController.updateInvoice
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    invoiceController.deleteInvoice
  );

module.exports = router;
