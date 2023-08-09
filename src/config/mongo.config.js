 //Funciona con la configuracion mongo atlas

const { connect } = require ('mongoose');

// Configuracion para la conexion con MongoDB
async function dbConnect() {
    const DB_URI = `${ process.env.DB_URI }`;     // <string> 
    await connect( DB_URI );
}


module.exports = dbConnect;

//Funciona con la configuracion local

// const mongoose = require("mongoose");

// const dbConnection = async () => {
//     try {
//         await mongoose.connect( process.env.DB_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//           useCreateIndex: true
//         });

//         console.log( 'Database initialized successfully' );
//     } 
//     catch ( error ) {
//         console.error( error );
//         throw new Error( 'Error initializing database' );
//     }
// }


// module.exports = {
//     dbConnection
// }