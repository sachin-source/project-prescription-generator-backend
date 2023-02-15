const express = require('express');
const router = express.Router();

const patientController = require("../controllers/patient.controller")

router.route('/').get(patientController.getPatientList);

module.exports = router;