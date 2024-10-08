const express = require('express');
const router = express.Router();
const { createProvider,GetProviderData } = require('../controllers/ProviderController');

router.post('/create',createProvider);
router.get('/getprovider',GetProviderData);


module.exports = router;
