const express = require('express');
const router = express.Router();

const prescriptionController = require("../controllers/prescription.controller")

router.route('/').post(prescriptionController.savePrescription);

module.exports = router;