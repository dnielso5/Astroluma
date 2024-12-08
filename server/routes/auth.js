const express = require('express');
const { doLogin } = require('../controllers/auth');

const router = express.Router();

router.post('/login', doLogin);

module.exports = router;