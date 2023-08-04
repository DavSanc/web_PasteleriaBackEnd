const { Schema, model } = require( 'mongoose' );


const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String
});


module.exports = model(
    'category',     // Nombre de la entidad (documento) que se registrara en la base de datos (en plural)
    categorySchema  // Estructura de datos que vamos a generar en nuestro documento
);