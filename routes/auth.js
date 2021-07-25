/*
    Route: /api/login
*/
const { Router } = require('express');
const { check } = require('express-validator')
const { login } = require('../controllers/authController');
const { validateCampos } = require('../middlewares/validate-campos');
const router = Router();

router.post('/', [check('email', 'Email Required').isEmail(),
    check('password', 'Password is Required').not().isEmpty(),
    validateCampos
], login);




module.exports = router;