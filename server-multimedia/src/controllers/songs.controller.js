require('dotenv').config();
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
var mm = require('music-metadata');

const SongsModel = require('../models/songs');

const getSongsData = async () =>{
    const canciones = await SongsModel.find();
    return canciones;
}

const readfiles = async () => {
    return new Promise((resolve, reject) => {
        fs.readdir(process.env.RUTA_ARCHIVOS, async function (err, archivos) {
            if (err) {
                onError(err);
                reject(new Error(err.message));
            }

            if (archivos.length == 0) {
                resolve("lista vacia");
                return;
            }

            let datosMusica = [];

            const SongsPromises = archivos.map(nameSong => {
                return new Promise((resolve, reject) => {

                    const filePath = process.env.RUTA_ARCHIVOS + nameSong;

                    mm.parseFile(filePath).then(async (metadata) => {
                        const idFileExist_Bd = await SongsModel.findOne({ idfile: nameSong })
                        if (!idFileExist_Bd) {

                            const picture = metadata.common.picture;

                            const newSong = new SongsModel({
                                title: metadata.common.title,
                                idfile: nameSong,
                                genre: metadata.common.genre,
                                year: metadata.common.year,
                                album: metadata.common.album,
                                artist: metadata.common.artist,
                                imageMusic: "",
                                imageAlbun: ""
                            });

                            if (newSong.title == null || newSong.title == undefined) {
                                newSong.title = nameSong;
                            }

                            if (picture == null || picture == undefined) {
                                datosMusica.push(newSong);
                                resolve(true);
                            } else {

                                const mimeType = picture[0].format; // Ejemplo: 'image/jpeg'
                                const extension = '.' + mimeType.split('/')[1]; // Ejemplo: '.jpeg'
                                const nameNewImage = uuidv4() + extension;
                                const newAbsolutePathImage = process.env.RUTA_IMAGES + nameNewImage;
                                fs.writeFileSync(newAbsolutePathImage, picture[0].data);

                                newSong.imageAlbun = nameNewImage;
                                datosMusica.push(newSong);
                                resolve(true);
                            }

                        }else{
                            resolve(null);
                        }


                    }).catch(err => {
                        console.error(err.message);
                        reject(err.message)
                    });

                });
            });

            Promise.all(SongsPromises)
                .then(result => {
                    if(datosMusica.length>0){
                        SongsModel.insertMany(datosMusica)
                    }
                    resolve(`Se registraron ${datosMusica.length} cancion(es)`);
                })
                .catch(error => {
                    //reject(new Error("error"));
                    reject("Error al obtener los metadatos de las canciones. " + error.message);
                    //reject(error.message);
                });

        });


    })

}

const getSongPath = async (nameSong) =>{
    return path.join(process.env.RUTA_ARCHIVOS, nameSong);
}

const updateSong = async  (_id,data) => {
    return await SongsModel.updateOne({_id:_id},data).then(() => "OK").catch(err => err.code);
}
const deleteSong = async  (_id) => {
    return await SongsModel.deleteOne({_id:_id}).then(() => "OK").catch(err => err.code);
}

module.exports = { readfiles,getSongsData,getSongPath,updateSong,deleteSong }



/*
 (async () => {
                console.time("Slept for")
                await sleep(3000)
                console.timeEnd("Slept for")
                resolve(datosMusica);
            })()
*/