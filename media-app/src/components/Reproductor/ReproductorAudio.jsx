import { useEffect, useRef, useState } from "react";
import { URL_API_GET_SONG, URL_API_GET_IMAGE } from "../../utils/consts";

export default function ReproductorAudio({ cancion }) {
    const rAudio = useRef(null);
    const [urlSong, setUrlSong] = useState(null);
    const [isImage, setIsImage] = useState("albumDefault.jpg");

    useEffect(() => {
        if (cancion != null) {
            _handleChangeAudio(cancion.idfile);
        }
    }, [cancion])

    const _handleChangeAudio = async (idFileSong) => {
        let url = `${URL_API_GET_SONG}${idFileSong}`
        setUrlSong(url)
        if (cancion.imageAlbun != "") {
            setIsImage(`${URL_API_GET_IMAGE}${cancion.imageAlbun}`);
        } else {
            setIsImage("albumDefault.jpg");
        }
    }

    return (
        <div className="divReproductor">
            <div className="contenedorTcancion">
                <label className='tCancion'>{cancion ? cancion.title : ""} </label>
            </div>
            <label className='tArtist'>{cancion ? cancion.artist : ""} </label>
            <div className="contenedorImgAlbumSong">
                <img className="imgAlbumSong" src={isImage} />
            </div>
            <audio ref={rAudio} src={urlSong} autoPlay name="audio" className="player" controls />
        </div>

    );
}