require('dotenv').config();
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
var mm = require('music-metadata');

const SongsModel = require('../models/songs');

function getFiles(dir, files_) {
    files_ = files_ || [];
    const files = fs.readdirSync(dir);
    for (const i in files) {
        const name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}

const getSongsData = async () => {
    const canciones = await SongsModel.find();
    return canciones;
}

const readfiles = async () => {
    return new Promise((resolve, reject) => {
        const archivos = getFiles(process.env.RUTA_ARCHIVOS).filter(data => data.endsWith(".mp3"));
        const archivosUnicos = [...new Set(archivos.map(ruta => ruta.replace(/^.*[\\\/]/, '')))].map(nombreArchivo => archivos.find(ruta => ruta.endsWith(nombreArchivo)));

        //console.log("archivos",archivosUnicos.length)
        if (archivos.length == 0) {
            resolve("lista vacia");
            return;
        }
        let datosMusica = [];
        //console.log("nameSong",archivos)
        const SongsPromises = archivosUnicos.map(filePath => {

            return new Promise((resolve, reject) => {
                //console.log("err","dasdasd");
                const nameSong = filePath.match(/.+\/(.+)/)[1];
                const subcarpeta = process.env.RUTA_ARCHIVOS;

                mm.parseFile(filePath).then(async (metadata) => {
                    const idFileExist_Bd = await SongsModel.findOne({ idfile: nameSong })
                    if (!idFileExist_Bd) {
                        const rutaSong = archivosUnicos.filter(r => r.match(/.+\/(.+)/)[1] == nameSong)[0];
                       
                        const indice = rutaSong.indexOf(subcarpeta);
                        const restoSeparador = rutaSong.substring(indice + subcarpeta.length + 1);
                        const ultimoSeparador = Math.max(restoSeparador.lastIndexOf('/'), restoSeparador.lastIndexOf('\\')); // obtenemos la posición del último separador
                        const rutaSinArchivo = restoSeparador.substring(0, ultimoSeparador); // obtenemos la subcadena desde el inicio hasta el último separador
                        //console.log(rutaSinArchivo);
                        const picture = metadata.common.picture;
                        const newSong = new SongsModel({
                            title: metadata.common.title,
                            idfile: nameSong,
                            genre: metadata.common.genre,
                            year: metadata.common.year,
                            album: metadata.common.album,
                            artist: metadata.common.artist,
                            imageMusic: "",
                            imageAlbun: "",
                            ruta:rutaSinArchivo
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
                    } else {
                        resolve(null);
                    }


                }).catch(err => {
                    console.error(err.message);
                    reject(err.message)
                });

            });
        })


        Promise.all(SongsPromises)
            .then(result => {
                if (datosMusica.length > 0) {
                    SongsModel.insertMany(datosMusica)
                }
                resolve(`Se registraron ${datosMusica.length} cancion(es)`);
                //resolve(datosMusica2);
            })
            .catch(error => {
                //reject(new Error("error"));
                reject("Error al obtener los metadatos de las canciones. " + error.message);
                //reject(error.message);
            });

    })

}

const getSongPath = async (idSong) => {
    const songs = await SongsModel.findOne({ _id: idSong })
    //console.log(path.join(process.env.RUTA_ARCHIVOS, songs.ruta+ "/" + songs.idfile));
    return path.join(process.env.RUTA_ARCHIVOS, songs.ruta + "/" + songs.idfile);
}

const updateSong = async (_id, data) => {
    return await SongsModel.updateOne({ _id: _id }, data).then(() => "OK").catch(err => err.code);
}
const deleteSong = async (_id) => {
    return await SongsModel.deleteOne({ _id: _id }).then(() => "OK").catch(err => err.code);
}

const deleteImagesTrash = async () => {
/*
    return new Promise(async (resolve, reject) => {
        //Obtenemos los path de los archivos de la carpeta de imagenes y retornamos solo los nombres de los archivos;
        const ArchivosPC = await getFiles(process.env.RUTA_ARCHIVOS).filter(data => data.endsWith(".mp3"));
        const archivosUnicos = [...new Set(
            ArchivosPC.map(ruta => ruta.replace(/^.*[\\\/]/, ''))
        )].map(nombreArchivo => ArchivosPC.find(ruta => ruta.endsWith(nombreArchivo)));

        const nameArchivosPC = await ArchivosPC.map(filePath => {
            return filePath.match(/.+\/(.+)/)[1];
        })

        const getListaSongsImage = await SongsModel.find();
        const newListaUnicaImageDB = [...new Set(getListaSongsImage.map(ruta => ({ _id: ruta._id, idfile: ruta.idfile })))];

        const nombresNoRepetidos = ArchivosPC.filter(nombre => !newListaUnicaImageDB.some(item => item.name == nombre.match(/.+\/(.+)/)[1]));

        const resultados = [];
        const subcarpeta = process.env.RUTA_ARCHIVOS;

        const imagesDeletePromise = newListaUnicaImageDB.map(ruta => {
            return new Promise((resolve, reject) => {

                //Obtenemos la ruta de la cancion buscada
                const rutaSong = archivosUnicos.filter(r => r.match(/.+\/(.+)/)[1] == ruta.idfile)[0];
                if (rutaSong == null) {
                    console.log(ruta.idfile);
                }

                //console.log(rutaSong);
                const indice = rutaSong.indexOf(subcarpeta);
                const resultado0 = rutaSong.substring(indice + subcarpeta.length + 1);

                const ultimoSeparador = Math.max(resultado0.lastIndexOf('/'), resultado0.lastIndexOf('\\')); // obtenemos la posición del último separador
                const rutaSinArchivo = resultado0.substring(0, ultimoSeparador); // obtenemos la subcadena desde el inicio hasta el último separador

                resultados.push({ _id: ruta._id, ruta: rutaSinArchivo });

                //resultados.push(rutaSong);
                resolve(true);
            })
        });

        Promise.all(imagesDeletePromise)
            .then(result => {
                //resolve(`Se eliminaron ${nombresNoRepetidos.length} imagen(es)`);     
                resultados.map(async (x) => {
                    await SongsModel.updateOne({ _id: x._id }, { ruta: x.ruta }).then(() => "OK").catch(err => err.code);
                })
                resolve(resultados);
            })
            .catch(error => {
                reject("Error al eliminar imageness. " + error.message);
            });



    });
*/


    return new Promise(async (resolve, reject) => {
        //Obtenemos los path de los archivos de la carpeta de imagenes y retornamos solo los nombres de los archivos;
        const nameArchivosPC = await getFiles(process.env.RUTA_IMAGES).map(filePath=>{
            return filePath.match(/.+\/(.+)/)[1];         
        })
        const getListaSongsImage = await SongsModel.find({}, { _id: 0, imageAlbun: 1 });
        const newListaUnicaImageDB = [...new Set(getListaSongsImage.map(ruta => ruta.imageAlbun ))];

        const nombresNoRepetidos = nameArchivosPC.filter(nombre => !newListaUnicaImageDB.includes(nombre));

        const imagesDeletePromise = nombresNoRepetidos.map(nombre =>{
            return new Promise((resolve, reject) => {
                fs.unlink(`${process.env.RUTA_IMAGES}${nombre}`, (err) => {
                    if (err){resolve(err.message);}
                    else{resolve(true);}
                 });
            })
        });

        Promise.all(imagesDeletePromise)
        .then(result => {
            resolve(`Se eliminaron ${nombresNoRepetidos.length} imagen(es)`);       
        })
        .catch(error => {
            reject("Error al eliminar imageness. " + error.message);
        }); 
    });
    
}


module.exports = { readfiles, getSongsData, getSongPath, updateSong, deleteSong, deleteImagesTrash }



/*
 (async () => {
                console.time("Slept for")
                await sleep(3000)
                console.timeEnd("Slept for")
                resolve(datosMusica);
            })()
*/