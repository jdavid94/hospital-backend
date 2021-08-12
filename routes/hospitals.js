/*
    Route: /api/hospital
*/
const { Router } = require('express');
// How to Validate
const { check } = require('express-validator');
const { validateCampos } = require('../middlewares/validate-campos');
const { validateJWT } = require('../middlewares/validate-jwt');
const {
    getHospitals,
    postHospital,
    putHospital,
    deleteHospital
} = require('../controllers/hospitalsController');
// Controller Import
const router = Router();

// Call the Controller Hospital Function
router.get('/', getHospitals);
router.post('/', [validateJWT, check('name', 'Hospital Name is Requried').not().isEmpty(), validateCampos], postHospital);
router.put('/:id', [validateJWT, check('name', 'Hospital Name is Requried').not().isEmpty(), validateCampos], putHospital);
router.delete('/:id', validateJWT, deleteHospital);

module.exports = router;