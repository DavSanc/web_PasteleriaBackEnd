const ProductModel = require( '../models/Products.js' );


const insertProduct = async ( dataProduct ) => {
    const newProduct = new ProductModel( dataProduct );

    return await newProduct.save();
}

const getAllProducts = async () => {
    return await ProductModel.find({});
}

const getProductByID = async ( productId ) => {
    return await ProductModel.findOne({ _id: productId }, {
        userId: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0
    });
}

const getProductByUserID = async ( userId ) => {
    return await ProductModel.find({ userId }, {
        createdAt: 0,
        updatedAt: 0,
        __v: 0
    });
}

const removeProductByID = async ( productId, userId ) => {
    return await ProductModel.findOneAndRemove({ _id: productId, userId });
}

const updateProductByID = async ( productId, userId, updateProduct ) => {
    return await ProductModel.findOneAndUpdate( 
        { _id: productId, userId },     // Id del documento que deseamos actualizar
        updateProduct,                  // El documento por el que vamos a actualizar 
        { new: true }                   // Configuracion para el comando Update
    );
}


module.exports = {
    insertProduct,
    getAllProducts,
    getProductByID,
    removeProductByID,
    updateProductByID,
    getProductByUserID
}