const { response, request } = require( 'express' );
const { hashSync, genSaltSync, compareSync } = require( 'bcryptjs' );

// Importa el módulo 'path' para trabajar con rutas de archivos
const path = require( 'path' );

const { generateToken } = require( '../helpers/jwt.js' );
const { insertProduct, getAllProducts, getProductByID, updateProductByID, removeProductByID, getProductByUserID } = require( '../services/product.service' );
const { PATH_STORAGE } = require( '../middlewares/upload-file.middleware.js' );


const User = require( '../models/User' );


const getProducts = async ( req = request, res = response ) => {

    try {
        const data = await getAllProducts()   // Pendiente

        res.status( 200 ).json({
            ok: true,
            path: '/products',
            msg: 'Obtiene todos los productos',
            products: data
        }); 
    } 
    catch ( error ) {
        console.log( error );
        return res.status( 500 ).json({
            ok: false,
            path: '/products',
            msg: 'Error al obtener los productos'
        });    
    }

}

const getProductById = async ( req = request, res = response ) => {
    const productId = req.params.id;

    try {
        const data = await getProductByID( productId );

        res.status( 201 ).json({
            ok: true,
            path: `/products/${ productId }`,
            msg: 'Obtiene producto por ID',
            product: data
        }); 
    } 
    catch ( error ) {
        console.log( error );
        return res.status( 500 ).json({
            ok: false,
            path: `/products/${ productId }`,
            msg: 'Error al obtener producto por ID'
        });    
    }

}

const getProductsByUserId = async ( req = request, res = request ) => {

    const userId = req.authUser.uid;

    try {
        const data = await getProductByUserID( userId );

        console.log( data );

        res.status( 200 ).json({
            ok: true,
            path: `/products/user/${ userId }`,
            msg: 'Obtiene el listado de productos por usuario',
            products: data
        }); 
    } catch (error) {
        console.log( error );
        return res.status( 500 ).json({
            ok: false,
            path: `/products/user/${ userId }`,
            msg: 'Error al obtener el listado de productos por usuario'
        });    
    }
}

const createProduct = async ( req = request, res = response ) => {
    const inputData = req.body;
    const userId = req.authUser.uid;

    // Verifica si se ha subido un archivo
    if ( ! req.file ) {
        return res.status( 400 ).json({ error: 'Debes subir un archivo' });
    }

    // Asegúrate de que PATH_STORAGE esté definido y tenga el valor correcto
    if ( ! PATH_STORAGE ) {
        res.status( 500 ).json({
            ok: false,
            path: '/products',
            msg: 'No se ha configurado correctamente la ruta de almacenamiento de archivos',
        }); 
    }

    const filePath = path.join( PATH_STORAGE, req.file.filename );        // Obtiene la ruta del archivo subido

    // Aquí puedes hacer lo que necesites con la ruta del archivo
    // Por ejemplo, puedes guardar el `filePath` en la base de datos junto con otros datos del producto
    const newProduct = { ...inputData, userId, urlImage: filePath };

    try {
        const data = await insertProduct( newProduct );
    
        // Devuelve una respuesta adecuada al cliente
        res.status( 200 ).json({
            ok: true,
            path: '/products',
            msg: 'Producto creado exitosamente',
            filePath,
            product: data
        }); 
    } 
    catch ( error ) {
        console.log( error );
        return res.status( 500 ).json({
            ok: false,
            path: '/products',
            msg: 'Error al crear producto'
        });    
    }

}

const updateProduct = async ( req = request, res = response ) => {
    const 
        productId = req.params.id,
        inputData = req.body,
        userId = req.authUser.uid;

    // Verifica si se ha subido un archivo
    if ( ! req.file ) {
        return res.status( 400 ).json({ error: 'Debes subir un archivo' });
    }

    // Asegúrate de que PATH_STORAGE esté definido y tenga el valor correcto
    if ( ! PATH_STORAGE ) {
        res.status( 500 ).json({
            ok: false,
            path: '/products',
            msg: 'No se ha configurado correctamente la ruta de almacenamiento de archivos',
        }); 
    }

    const filePath = path.join( PATH_STORAGE, req.file.filename );        // Obtiene la ruta del archivo subido

    // Aquí puedes hacer lo que necesites con la ruta del archivo
    // Por ejemplo, puedes guardar el `filePath` en la base de datos junto con otros datos del producto
    const updateProduct = { ...inputData, userId, urlImage: filePath };

    try {
        const data = await updateProductByID( productId, userId, updateProduct );

        if( data ) {
            res.status( 200 ).json({
                ok: true,
                path: `/products/${ productId }`,
                msg: 'Actualiza producto',
                product: data
            }); 
        }
        else {
            return res.status( 404 ).json({
                ok: false,
                path: `/products/${ productId }`,
                msg: 'Producto no encontrado'
            }); 
        }

    } 
    catch ( error ) {
        console.log( error );
        return res.status( 500 ).json({
            ok: false,
            path: `/products/${ productId }`,
            msg: 'Error al actualizar producto'
        });    
    }

}

const deleteProduct = async ( req = request, res = response ) => {
    const productId = req.params.id;
    const userId = req.authUser.uid;

    try {
        const data = await removeProductByID( productId, userId );

        if( data ) {
            res.status( 200 ).json({
                ok: true,
                path: `/products/${ productId }`,
                msg: 'Eliminar producto',
                product: data
            });    
        }
        else {
            return res.status( 404 ).json({
                ok: false,
                path: `/products/${ productId }`,
                msg: 'Producto no encontrado'
            });    
        }

    } 
    catch ( error ) {
        console.log( error );
        return res.status( 500 ).json({
            ok: false,
            path: `/products/${ productId }`,
            msg: 'Error al eliminar producto'
        });    
    }

}


module.exports = {
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductsByUserId
}