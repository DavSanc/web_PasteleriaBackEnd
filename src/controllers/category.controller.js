const { response, request } = require( 'express' );
const { getAllCategories, insertCategory, removeCategory, reformCategory } = require('../services/category.service');


const getCategories = async ( req = request, res = response ) => {
    try {

        const data = await getAllCategories();

        res.status( 200 ).json({
            ok: true,
            path: '/categories',
            msg: 'Obtiene todos los categorias',
            categories: data
        }); 
    } 
    catch ( error ) {
        console.log( error );
        return res.status( 500 ).json({
            ok: false,
            path: '/categories',
            msg: 'Error al obtener los categorias'
        });    
    }

}

const createCategory = async ( req = request, res = response ) => {
    const inputData = req.body;

    try {

        const data = await insertCategory( inputData );
        
        res.status( 201 ).json({
            ok: true,
            path: '/categories',
            msg: 'Crea categoria',
            category: data
        }); 
    } 
    catch ( error ) {
        console.log( error );
        return res.status( 500 ).json({
            ok: false,
            path: '/categories',
            msg: 'Error al crear categoria'
        });    
    }

}

const updateCategory = async ( req = request, res = response ) => {
    const 
        categoryId = req.params.id,
        inputData = req.body;

    const data = await reformCategory( categoryId, inputData );

    try {

        res.status( 201 ).json({
            ok: true,
            path: `/categories/123`,
            msg: 'Actualiza categoria',
            category: data
        }); 
    } 
    catch ( error ) {
        console.log( error );
        return res.status( 500 ).json({
            ok: false,
            path: `/categories/123`,
            msg: 'Error al actualizar categoria'
        });    
    }

}

const deleteCategory = async ( req = request, res = response ) => {
    const categoryId = req.params.id;

    const data = await removeCategory( categoryId );
    
    try {

        res.status( 201 ).json({
            ok: true,
            path: `/categories/123`,
            msg: 'Eliminar categoria',
            category: data
        }); 
    } 
    catch ( error ) {
        console.log( error );
        return res.status( 500 ).json({
            ok: false,
            path: `/categories/123`,
            msg: 'Error al eliminar categoria'
        });    
    }

}


module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
}