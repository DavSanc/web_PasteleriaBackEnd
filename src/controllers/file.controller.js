const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

// Controlador para eliminar un archivo
const deleteFile = async (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname,'../../storage', filename) ;
  console.log(path.join(__dirname,'../../storage', filename ) );

  try {
    // Elimina el archivo
    await unlinkAsync(filePath);

    res.json({
      ok: true,
      msg: 'Archivo eliminado exitosamente',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al eliminar el archivo',
    });
  }
};

module.exports = {
  deleteFile,
};
