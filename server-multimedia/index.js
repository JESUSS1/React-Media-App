require('./src/database/mongoConexion');
const express = require('express');
const cors = require("cors");
const userRouter = require('./routes/routes')
const app = express();

app.use(express.json());
app.use(cors());

// carpetas estaticas de nuestro ordenador que usamos como carpetas del servidor para accder a su contenido//
//app.use('/musicaAntigua', express.static('D:/musica/MusicaAntigua'));
app.use('/imageServer', express.static('D:/Archivos/imageServer'));
app.use("/api/songs", userRouter);

/*app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
})
*/

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});