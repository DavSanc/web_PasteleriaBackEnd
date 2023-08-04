const { dbConnection } = require('./config/mongo.config');
const { route } = require('./routes/auth.routes');

require( 'dotenv' ).config();

const 
    express = require( 'express'  ),
    app = express(),
    cors = require( 'cors' ),
    PORT = process.env.PORT || 4000;

// console.log( process.env );

/** Middleware de Express */
app.use( express.static( 'public') );   // Directorio público
app.use( '/uploads', express.static( 'uploads' ) );
app.use( cors() );              // Cross-Origin-Resources-Sharing
app.use( express.json() );      // Lectura Parseo del body

/** Define todas las rutas */
app.use( '/api/auth', require( './routes/auth.routes' ) );
app.use( '/api/products', require( './routes/products.routes' ) );
app.use( '/api/categories', require( './routes/categories.routes' ) );

dbConnection();                 // Invoca la inicializacion de la base de datos

app.listen( PORT, () => {
    console.log( `Servidor lanzado en http://localhost:${ PORT }` );
});