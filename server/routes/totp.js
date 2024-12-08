const express = require('express');
const { verifyToken } = require('../middlewares/auth');
const { listTotp, deleteTotp, saveTotp, totpDetails, reorderTotp } = require('../controllers/totp');

const router = express.Router();

router.post('/totp/save', verifyToken, saveTotp);
router.get('/totp/list', verifyToken, listTotp);
router.get('/totp/delete/:authId', verifyToken, deleteTotp);
router.get('/totp/:authId', verifyToken, totpDetails);
router.post('/totp/reorder', verifyToken, reorderTotp);

module.exports = router;