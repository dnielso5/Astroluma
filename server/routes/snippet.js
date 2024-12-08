const express = require('express');
const { verifyToken } = require('../middlewares/auth');
const { saveSnippet, listSnippet, listFilesInSnippet, saveCodeToSnippet, deleteCodeFromSnippet, deleteSnippet } = require('../controllers/snippet');

const router = express.Router();

router.post('/snippet/item', verifyToken, saveSnippet);
router.get('/snippet/list/:snippetId', verifyToken, listFilesInSnippet);
router.post('/snippet/save/:snippetId', verifyToken, saveCodeToSnippet);
router.get('/snippet/:snippetId/delete', verifyToken, deleteSnippet);
router.get('/snippet/:snippetId/delete/:codeId', verifyToken, deleteCodeFromSnippet);
router.get('/snippet/:snippetId/items/search/:query', verifyToken, listSnippet);
router.get('/snippet/:snippetId/items/:page/search/:query', verifyToken, listSnippet);
router.get('/snippet/:snippetId/items', verifyToken, listSnippet);
router.get('/snippet/:snippetId/items/:page', verifyToken, listSnippet);

module.exports = router;