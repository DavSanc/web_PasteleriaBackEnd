const { Schema, model } = require( 'mongoose' );

const UserSchema = new Schema(
    {
        name: {
            type: 'string',
            required: true,
        },
        email: {
            type: 'string',
            required: true,
            unique: true
        },
        password: {
            type: 'string',
            required: true,
        },
        role: {
            type: String,
            required: true,
            default: 'registered'
        },
    },{
        timestamps: true
    }
);


module.exports = model( 'User', UserSchema );