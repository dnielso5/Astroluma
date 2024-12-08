const express = require('express');
const { verifyToken } = require('../middlewares/auth');
const { saveDevice, deleteDevice, deviceDetails, reorderDevices, wakeDevice, listDevices, listDbDevices } = require('../controllers/networkdevice');

const router = express.Router();

router.post('/networkdevices/save/device', verifyToken, saveDevice);
router.get('/networkdevices/devices', verifyToken, listDevices);
router.get('/networkdevices/db/devices', verifyToken, listDbDevices);
router.get('/networkdevices/delete/:deviceId', verifyToken, deleteDevice);
router.get('/networkdevices/device/:deviceId', verifyToken, deviceDetails);
router.post('/networkdevices/device/reorder', verifyToken, reorderDevices);
router.get('/networkdevices/wake/:deviceId', verifyToken, wakeDevice);

module.exports = router;