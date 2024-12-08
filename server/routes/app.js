const express = require('express');
const { verifyToken } = require('../middlewares/auth');
const { listAllApps, activateIntegration, listInstalledApps, removeApp, runIntegratedApp } = require('../controllers/app');

const router = express.Router();

router.get('/app/all', verifyToken, listAllApps);
router.get('/app/installed', verifyToken, listInstalledApps);
router.post('/app/install', verifyToken, activateIntegration);
router.get('/app/remove/:appId', verifyToken, removeApp);
router.get('/app/run/:appId/:listingId', verifyToken, runIntegratedApp);

module.exports = router;