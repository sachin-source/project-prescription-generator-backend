const express = require('express');
var multipart = require('connect-multiparty');

const router = express.Router();
var multipartMiddleware = multipart({
    uploadDir: __dirname + '/../uploads',
    maxFilesSize:10 * 1024 * 1024
});

const prescriptionController = require("../controllers/prescription.controller")

router.route('/').post(prescriptionController.savePrescription);
router.route('/upload').post(multipartMiddleware, prescriptionController.uploadPrescriptions);
module.exports = router;