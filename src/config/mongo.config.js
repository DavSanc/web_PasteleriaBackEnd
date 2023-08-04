const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect( process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true
        });

        console.log( 'Database initialized successfully' );
    } 
    catch ( error ) {
        console.error( error );
        throw new Error( 'Error initializing database' );
    }
}


module.exports = {
    dbConnection
}