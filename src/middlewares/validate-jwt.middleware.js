const { request, response } = require( 'express' );
const { verify } = require( 'jsonwebtoken' );


const validateToken = ( req = request, res = response, next ) => {

    // 1. Obtener el token de los headers
    const token = req.header( 'X-Token' );

    if( ! token ) { 
        return res.status( 401 ).json({
            ok: false,
            path: '/renew',
            msg: 'Error al obtener el token'
        });
    }


    try {
        // 1. Verificamos autenticidad del token
        const
            payload = verify( token, process.env.SECRET_JWT_SEED ),
            { uid, name } = payload;


        // 2. Establecemos datos del payload dentro del objeto request
        req.authUser = {
            uid, name
        }

    } 
    catch ( error ) {
        console.error( error );
        return res.status( 401 ).json({
            ok: false,
            path: '/renew',
            msg: 'Token no valido'
        });
    }

    next();
}


module.exports = {
    validateToken
};