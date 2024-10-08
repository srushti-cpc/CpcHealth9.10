const express = require('express');
const router = express.Router();
const { CreateInsurance,GetInsurances } = require('../controllers/insuranceController');

router.post('/create',CreateInsurance);
router.get('/getinsurances',GetInsurances);

module.exports = router;
