const express = require('express');
const { saveFolder, 
    listingDetails, 
    listItems, 
    saveLink, 
    reOrder, 
    deleteListing, 
    manageListItems, 
    saveTodo, 
    saveStream, 
    listStreams, 
    generatePreview, 
    moveListingTo, 
    saveSnippet 
} = require('../controllers/listing');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

router.post('/listing/save/folder', verifyToken, saveFolder);
router.post('/listing/save/link', verifyToken, saveLink);
router.post('/listing/save/todo', verifyToken, saveTodo);
router.post('/listing/save/snippet', verifyToken, saveSnippet);
router.post('/listing/save/stream', verifyToken, saveStream);
router.get('/listing/folder/list', verifyToken, listItems);
router.get('/listing/folder/stream/list', verifyToken, listStreams);
router.get('/listing/folder/:listingId/list/manage/:type', verifyToken, manageListItems);
router.get('/listing/folder/:listingId/list', verifyToken, listItems);
router.post('/listing/folder/:listingId/reorder', verifyToken, reOrder);
router.get('/listing/folder/:listingId', verifyToken, listingDetails);
router.get('/listing/link/:listingId', verifyToken, listingDetails);
router.get('/listing/snippet/:listingId', verifyToken, listingDetails);
router.get('/listing/todo/:listingId', verifyToken, listingDetails);
router.get('/listing/stream/preview/:listingId', generatePreview);
router.get('/listing/stream/:listingId', verifyToken, listingDetails);
router.get('/listing/delete/:listingId', verifyToken, deleteListing);
router.get('/listing/move/:listingId/to/:parentId', verifyToken, moveListingTo);

module.exports = router;