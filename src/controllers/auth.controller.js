const { response, request } = require( 'express' );
const User = require('../models/User');
const { hashSync, genSaltSync, compareSync } = require( 'bcryptjs' );
const { generateToken } = require( '../helpers/jwt.js' );


const createUser = async ( req = request, res = response ) => {

    const { name, email, password } = req.body;

    try {
        // 1. Verificar que existe el 'email'
        const userFound = await User.findOne({ email });

        if( userFound ) {
            return res.status( 400 ).json({
                ok: false,
                path: '/register',
                msg: 'El usuario ya existe'
            });
        }

        // 2. Crear el nuevo usuario
        const dbUser = new User( req.body );

        // 2. Encriptar la contraseña
        const salt = genSaltSync();
        
        dbUser.password = hashSync( password, salt );

        // 3. Generar el JWT, como metodo de autenticación pasiva
        const token = await generateToken( dbUser._id, name );

        // 4. Registrar usuario en la base de datos
        const newUser = await dbUser.save();

        // 5. Responder al cliente
        console.log( newUser );
        res.status( 201 ).json({
            ok: true,
            path: '/register',
            msg: 'Usuario creado existosamente',
            token,
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        }); 
    } 
    catch ( error ) {
        console.log( error );
        return res.status( 500 ).json({
            ok: false,
            path: '/register',
            msg: 'Error al registrar usuario'
        });    
    }

}

const loginUser = async ( req = request, res = response ) => {

    const { email, password } = req.body;

    try {
        // 1. Verificar que existe el 'email'
        const userFound = await User.findOne({ email });

        if( ! userFound ) {
            return res.status( 400 ).json({
                ok: false,
                path: '/login',
                msg: 'El email del usuario no existe'
            });
        }

        // 2. Confirmamos si el password hace match
        const isValidPassword = compareSync( password, userFound.password );
    
        if( ! isValidPassword ) {
            return res.status( 400 ).json({
                ok: false,
                path: '/login',
                msg: 'El password no es valido'
            });
        }

        // 3. Generar el JWT, como metodo de autenticación pasiva
        const token = await generateToken( userFound._id, userFound.name );


        // 5. Responder al cliente
        console.log( userFound );
        res.status( 201 ).json({
            ok: true,
            path: '/login',
            msg: 'Usuario se ha logueado existosamente',
            token,
            user: userFound
        }); 
    } 
    catch ( error ) {
        console.log( error );
        return res.status( 500 ).json({
            ok: false,
            path: '/login',
            msg: 'Error al loguear usuario'
        }); 
    }

}

const renewToken = async ( req = request, res = response ) => {

    const { uid, name } = req.authUser;

    // 1. Verificar que existe el 'email'
    const userFound = await User.findById( uid );

    if( ! userFound ) {
        return res.status( 400 ).json({
            ok: false,
            path: '/renew',
            msg: 'No renueva el token el usuario no existe'
        });
    }

    // 2. Generar el JWT, como metodo de autenticación pasiva
    const token = await generateToken( uid, name );

    return res.json({
        ok: true,
        path: '/renew',
        msg: 'Token renovado',
        token,
        id: uid,
        name,
        email: userFound.email,
        role: userFound.role
    });
}

module.exports = {
    createUser,
    loginUser,
    renewToken
}