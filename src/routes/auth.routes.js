const { Router } = require( 'express' );
const { createUser, loginUser, renewToken } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const validateInputFields = require('../middlewares/validate-input-fields.middleware');
const { validateToken } = require('../middlewares/validate-jwt.middleware');

const router = Router();


router.post( 
    '/register', 
    [
        check( 'name', '\'name\' doesn\'t exists').exists()
            .not().isEmpty()
            .withMessage( 'Name is required' ),
        check( 'email', 'Email is required' )
            .trim()
            .isEmail(),
        check( 'password', 'Password is required' )
            .trim()
            .isLength({ min: 8 })
            .withMessage( 'Must be at least 8 chars long' ),
        validateInputFields
    ], 
    createUser 
);
router.post( 
    '/login', 
    [
        check( 'email', 'Email is required' )
            .trim()
            .isEmail()
            .withMessage( 'Must be at least 8 chars long' ),
        check( 'password', 'Password is required' )
            .trim()
            .isLength({ min: 8 }),
        validateInputFields
    ],
    loginUser 
);
router.get( '/renew', validateToken, renewToken );


module.exports = router;