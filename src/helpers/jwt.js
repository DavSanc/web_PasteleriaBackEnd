const { sign } = require( 'jsonwebtoken' );

const generateToken = ( uid, name ) => {
    const payload = {
        uid, name
    }

    return new Promise( ( resolve, reject ) => {

        sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '1h'
        }, ( err, token ) => {
            if( err ) {
                console.log( err );
                reject( err );
            }
            else {
                console.log( token );
                resolve( token );
            }
        });

    });

}


module.exports = {
    generateToken
}