const express = require('express');
const router = express.Router();

const { regValidation, loginValidation } = require('../middleware/validation');

const { registerUser, loginUser } = require('../controllers/UserController');

router.post('/register', regValidation, registerUser);
router.post('/login', loginValidation, loginUser);

module.exports = router;
