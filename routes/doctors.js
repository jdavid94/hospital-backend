/*
    Route: /api/doctors
*/
const { Router } = require('express');
// How to Validate
const { check } = require('express-validator');
const { validateCampos } = require('../middlewares/validate-campos');
const { validateJWT } = require('../middlewares/validate-jwt');
const {
    getDoctors,
    postDoctor,
    putDoctor,
    deleteDoctor,
    getDoctorByID
} = require('../controllers/doctorsController');
// Controller Import
const router = Router();

// Call the Controller Hospital Function
router.get('/', validateJWT, getDoctors);
router.post('/', [
    validateJWT, check('name', 'Doctor Name is Requried').not().isEmpty(), check('hospital', 'Hospital ID Must be Valid').isMongoId(), validateCampos
], postDoctor);
router.put('/:id', [validateJWT, check('name', 'Doctor Name is Requried').not().isEmpty(), check('hospital', 'Hospital ID Must be Valid').isMongoId(), validateCampos], putDoctor);
router.get('/:id', validateJWT, getDoctorByID);
router.delete('/:id', validateJWT, deleteDoctor);

module.exports = router;