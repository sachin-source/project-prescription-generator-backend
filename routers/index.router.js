const express = require('express');
const { authenticate } = require('../services/comman');
const router = express.Router();

const userRoutes = require("./user.router");
const patientRoutes = require("./patient.router");
const prescriptionRoutes = require("./prescription.router");
const visitRoutes = require("./visit.router");

// mount user routes at /users
router.use('/user', userRoutes);
router.use('/patient', patientRoutes);
router.use('/prescription', authenticate, prescriptionRoutes);
router.use('/visit', visitRoutes);

router.get('/*', (req, res) =>
    res.send('OK')
);
module.exports = router;