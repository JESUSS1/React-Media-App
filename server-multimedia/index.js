const express = require('express');
require('dotenv').config();
const path = require('path');
const ms = require('mediaserver');
const fs = require('fs');
const app = express();
const cors = require("cors");

app.use(cors());

// Sirve los archivos estáticos de la carpeta pública en otro servidor
app.use('/musicaAntigua', express.static('D:/musica/MusicaAntigua'));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
})  

app.get('/music/:name', function(req, res){
    const ruta = process.env.RUTA_ARCHIVOS;    
    var cancion = path.join(ruta, 'musicaAntigua', req.params.name);
    ms.pipe(req, res, cancion);
})

app.get('/canciones', async function(req, res){

  //const carpeta = process.env.RUTA_ARCHIVOS+"musicaAntigua";

  fs.readdir(process.env.RUTA_ARCHIVOS+"musicaAntigua", function (err, archivos) {
    if (err) {
    onError(err);
    res.json("error");
    }
    res.json(archivos);
    });
})  

/*function buscarArchivosMp3(carpeta, callback) {
  const archivosMp3 = []; // Variable para almacenar las rutas de los archivos .mp3 encontrados

  fs.readdir(carpeta, (err, archivos) => {
    if (err) {
      console.error('Error al leer la carpeta:', err);
      return callback(err);
    }

    let pendientes = archivos.length;

    if (!pendientes) {
      return callback(null, archivosMp3);
    }

    archivos.forEach((archivo) => {
      const rutaArchivo = path.join(carpeta, archivo);

      fs.stat(rutaArchivo, (err, estadisticas) => {
        if (err) {
          console.error('Error al obtener estadísticas del archivo:', err);
          return callback(err);
        }

        if (estadisticas.isDirectory()) {
          buscarArchivosMp3(rutaArchivo, (err, resultados) => {
            if (err) {
              console.error('Error al buscar archivos en subdirectorio:', err);
              return callback(err);
            }

            archivosMp3.push(...resultados);
            pendientes--;

            if (!pendientes) {
              return callback(null, archivosMp3);
            }
          });
        } else if (path.extname(archivo) === '.mp3') {
          archivosMp3.push(rutaArchivo);
          pendientes--;

          if (!pendientes) {
            return callback(null, archivosMp3);
          }
        } else {
          pendientes--;

          if (!pendientes) {
            return callback(null, archivosMp3);
          }
        }
      });
    });
  });
}

*/



// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});