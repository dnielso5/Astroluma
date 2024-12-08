const express = require('express');
const {
    dashboard,
    saveSettings,
    getSetting,
    saveThemeSettings,
    saveWeatherSettings,
    weatherData
} = require('../controllers/manage');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

// Dashboard route
router.get('/dashboard', verifyToken, dashboard);

// Weather data route
router.get('/weather', verifyToken, weatherData);

// Settings routes
router.post('/settings', verifyToken, saveSettings); // Save all settings
router.post('/settings/theme', verifyToken, saveThemeSettings); // Save theme settings
router.post('/settings/weather', verifyToken, saveWeatherSettings); // Save weather settings
router.get('/settings', verifyToken, getSetting); // Get current settings

module.exports = router;
