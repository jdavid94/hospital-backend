/*
    Route: /api/login
*/
const { Router } = require('express');
const { check } = require('express-validator')
const { login, googleSignIn } = require('../controllers/authController');
const { validateCampos } = require('../middlewares/validate-campos');
const router = Router();

router.post('/', [check('email', 'Email Required').isEmail(),
    check('password', 'Password is Required').not().isEmpty(),
    validateCampos
], login);

router.post('/google', [check('token', 'Token is Required').not().isEmpty(),
    validateCampos
], googleSignIn);




module.exports = router;