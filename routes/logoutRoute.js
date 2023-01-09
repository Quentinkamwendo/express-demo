const express = require("express");

const logoutController = require('../controllers/logoutController')
const router = express.Router();

router.route('/').get(logoutController.logoutUser)

module.exports = router;