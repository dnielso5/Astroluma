const express = require('express');
const { verifyToken } = require('../middlewares/auth');
const { savePage, pageList, pageInfo, deletePage, managePage } = require('../controllers/page');

const router = express.Router();

router.post('/page/save', verifyToken, savePage);
router.get('/page/list', verifyToken, pageList);
router.get('/page/list/:active', verifyToken, pageList);
router.get('/page/info/:pageId', verifyToken, pageInfo);
router.get('/page/info/:pageId/:active', verifyToken, pageInfo);
router.get('/page/delete/:pageId', verifyToken, deletePage);
router.get('/page/action/:pageId/:action', verifyToken, managePage);

module.exports = router;