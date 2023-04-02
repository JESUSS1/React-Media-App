import { useEffect,useRef, useState } from "react";
import { apiGetCancion,REACT_APP_URL_SERVER,REACT_APP_URL_API } from "../utils/api";

export default function ReproductorAudio({cancion}){
    const rAudio = useRef(null);
    const [rCandion,setRcancion] = useState(null);

    useEffect(()=>{
        if(cancion!=null){
            //console.log(cancion);
            _handleChangeAudio(cancion.idfile);
        }
    },[cancion])

    const _handleChangeAudio = async (idFileSong) =>{
        //let result = await apiGetCancion(cancion);
        let url = `${REACT_APP_URL_API}/song/${idFileSong}`
        //let url = 'http://192.168.3.3:3000/music/'+cancion;
        setRcancion(url)
        console.log(rAudio.current);
        //rAudio.current.setAttribute('src', result);
        //rAudio.current.play();
        
      }

    return (
        <div className="divReproductor">
            <div className="contenedorTcancion"><label className='tCancion'>{cancion!=null?cancion.title:""} </label></div>
            <label className='tArtist'>{cancion!=null?cancion?.artist:""} </label>
            <div className="contenedorImgAlbumSong">
                <img className="imgAlbumSong" src={cancion!=null && cancion.imageAlbun!=""?`${REACT_APP_URL_SERVER}/imageServer/${cancion.imageAlbun}`:"albumDefault.jpg"} />
            </div>
            <audio ref={rAudio} src={rCandion} autoPlay name="audio" className="player" controls />
        </div>
            
    );
}