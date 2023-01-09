const express = require('express');
const registerController = require('../controllers/registerController')
const router = express.Router();

// Set up route for registration form and registration submission
router.route('/')
    .get(registerController.registerForm)
    .post(registerController.registerNewUser)

module.exports = router;