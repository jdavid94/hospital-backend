/*
    Route: /api/upload/
*/
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
// How to Validate
//const { validateJWT } = require('../middlewares/validate-jwt');
// Controller Import
const { fileUpload, returnImage } = require('../controllers/uploadController');
const router = Router();
// Default options
router.use(expressFileUpload());

// Call the Controller Upload Function
router.put('/:type/:id', fileUpload);
router.get('/:type/:photo', returnImage);


module.exports = router;