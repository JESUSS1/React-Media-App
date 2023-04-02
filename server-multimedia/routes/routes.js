let express = require('express');
const path = require('path');
const ms = require('mediaserver');
const {readfiles,getSongsData,getSongPath} = require('../src/controllers/songs.controller');

const SongsRouter = express.Router();

SongsRouter.get('/canciones', async function(req, res){
    //res.set('Access-Control-Allow-Origin', '*');
    getSongsData().
    then(result=>res.status(200).json(result)).
    catch(err=>res.status(500).json(err))

});

SongsRouter.get('/readfiles', function(req, res){
    //res.set('Access-Control-Allow-Origin', '*');
    readfiles().
    then(result=>res.status(200).json(result)).
    catch(err=>res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud. ' + err }));
});

SongsRouter.get('/song/:name', function (req, res) {
    getSongPath(req.params.name).
    then(result=> ms.pipe(req, res, result) ).
    catch(err=>res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud. ' + err }));
    //ms.pipe(req, res, result)
  })


module.exports = SongsRouter;