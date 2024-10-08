const express = require('express');
const router = express.Router();
const { CreateLanguage,GetLanguage } = require('../controllers/LanguageController');

router.post('/create',CreateLanguage);
router.get('/getlanguage',GetLanguage);

module.exports = router;
