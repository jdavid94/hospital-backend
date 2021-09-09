/*
    Route: /api/users
*/
const { Router } = require('express');
// How to Validate
const { check } = require('express-validator');
const { validateCampos } = require('../middlewares/validate-campos');
const { validateJWT, validarADMIN_ROLE, validarSameUser } = require('../middlewares/validate-jwt');
// Controller Import
const { getUsers, postUser, putUser, deleteUser } = require('../controllers/usersController');
const router = Router();

// Call the Controller User Function
router.get('/', validateJWT, getUsers);
router.post('/', [check('name', 'Name is Required').not().isEmpty(),
    check('password', 'Password is Required').not().isEmpty(),
    check('email', 'Email is Required').isEmail(),
    validateCampos // Call Middleware For Validation

], postUser);
router.put('/:id', [validateJWT, validarSameUser, check('name', 'Name is Required').not().isEmpty(),
    check('email', 'Email is Required').isEmail(),
    //check('role', 'Role is Required').not().isEmpty(),
    validateCampos
], putUser);
router.delete('/:id', [validateJWT, validarADMIN_ROLE], deleteUser);

module.exports = router;