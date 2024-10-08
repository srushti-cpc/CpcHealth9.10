const express = require('express');
const router = express.Router();
const { CreateSpeciality,GetSpeciality} = require('../controllers/SpecialityController');

router.post('/create',CreateSpeciality);
router.get('/getspeciality',GetSpeciality);
module.exports = router;
