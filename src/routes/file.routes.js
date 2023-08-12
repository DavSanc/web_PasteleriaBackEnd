const express = require('express');
const router = express.Router();
const fileController = require('../controllers/file.controller');

// Ruta para eliminar un archivo
router.delete('/:filename', fileController.deleteFile);

module.exports = router;
