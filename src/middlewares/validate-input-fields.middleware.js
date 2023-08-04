const { request, response } = require("express");
const { validationResult } = require("express-validator");


const validateInputFields = ( req = request, res = response, next ) => {
    const errors = validationResult( req );
    console.log( errors );

    // Verificamos si la lista de errores no esta vacia
    if( ! errors.isEmpty() ) {
        return res.status( 400 ).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    next();
}


module.exports = validateInputFields;