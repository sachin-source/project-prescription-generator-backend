const express = require('express');
const router = express.Router();

const visitController = require("../controllers/visit.controller")

router.route('/').get(visitController.getvisitList);

module.exports = router;