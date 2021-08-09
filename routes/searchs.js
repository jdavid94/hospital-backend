/*
    Route: /api/all/:search
*/
const { Router } = require('express');
// How to Validate
const { check } = require('express-validator');
const { validateCampos } = require('../middlewares/validate-campos');
const { validateJWT } = require('../middlewares/validate-jwt');
// Controller Import
const { getAll, getCollection } = require('../controllers/searchsController');
const router = Router();

// Call the Controller Search Function
router.get('/:search', validateJWT, getAll);
router.get('/collection/:table/:search', validateJWT, getCollection);

module.exports = router;