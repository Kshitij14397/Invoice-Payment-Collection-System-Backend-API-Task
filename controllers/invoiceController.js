const Invoice = require("../models/invoiceModel");

exports.createInvoice = async (req, res, next) => {
  try {
    const newInvoice = await Invoice.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newInvoice,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getAllInvoices = async (req, res, next) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json({
      status: "success",
      results: invoices.length,
      data: {
        invoices,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getInvoice = async (req, res, next) => {
  try {
    const id = req.params.id;
    const invoice = await Invoice.findById(id);

    res.status(200).json({
      status: "success",
      data: {
        invoice,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        invoice,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: {
        invoice,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
