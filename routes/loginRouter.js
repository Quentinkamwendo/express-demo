const express = require("express");
const loginControllers = require('../controllers/loginControllers')

const router = express.Router();

// Set up the login route
router.route('/')
    .get(loginControllers.loginForm)
    .post(loginControllers.loginUser)

module.exports = router;