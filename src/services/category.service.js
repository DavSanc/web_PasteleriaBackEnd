const Category = require( '../models/Category' );


const getAllCategories = async () => {
    return await Category.find({});
}

// category: { name: '', description: '' }
const insertCategory = async ( category ) => {
    return await Category.create( category );
}
// const insertCategory = async ( category ) => {
//     const createCategory = await Category( category );
//     createCategory.save();
// }

const reformCategory = async ( categoryId, updateData ) => {
    return await Category.findOneAndUpdate(
        { _id: categoryId },    // Encontrar la categoria (_id)
        updateData,             // Los datos (objeto) por el que voy a reemplazar los valores exustentes
        { new: true }           // (Opcional) Establecer una configuracion sobre la consulta
    );
}


const removeCategory = async ( categoryId ) => {
    return await Category.findOneAndRemove({ _id: categoryId });
}


module.exports = {
    getAllCategories,
    insertCategory,
    reformCategory,
    removeCategory
}