const { Router } = require( 'express' );
const { getProducts, createProduct, getProductById, updateProduct, deleteProduct, getProductsByUserId } = require('../controllers/product.controller');
const { getCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/category.controller');

const router = Router();

/** 
 * Ruta actual: http://localhost:5000/api/categories
 */

// Ruta para obtener todos las categorias
router.get( 
    '/', 
    getCategories
);


// Ruta para crear categoria (Restringida)
router.post( 
    '/', 
    createCategory
);

// Ruta para actualizar categoria (Restringida)
router.patch( 
    '/:id', 
    updateCategory
);

// Ruta para eliminar categoria (Restringida)
router.delete( 
    '/:id', 
    deleteCategory
);



module.exports = router;