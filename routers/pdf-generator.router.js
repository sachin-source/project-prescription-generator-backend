const express = require('express');
const router = express.Router();

const pdfGeneratorController = require("../controllers/pdf-generator.controller")

router.route('/').get(pdfGeneratorController.getDataToPDF);

module.exports = router;