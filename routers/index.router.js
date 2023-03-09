const express = require('express');
const { authenticate } = require('../services/comman');
const router = express.Router();

const userRoutes = require("./user.router");
const patientRoutes = require("./patient.router");
const prescriptionRoutes = require("./prescription.router");

// mount user routes at /users
router.use('/user', userRoutes);
router.use('/patient', patientRoutes);
router.use('/prescription', prescriptionRoutes);

router.get('/*', (req, res) =>
    res.send('OK')
);
module.exports = router;