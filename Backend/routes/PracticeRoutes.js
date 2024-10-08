const express = require('express');
const router = express.Router();
const { CreatePractice,GetPractice} = require('../controllers/PracticeController');

router.post('/create',CreatePractice);
router.get('/getpracticename',GetPractice);

module.exports = router;
