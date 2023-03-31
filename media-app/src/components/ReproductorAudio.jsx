import { useEffect,useRef } from "react";
import { apiGetCancion } from "../utils/api";

export default function ReproductorAudio({cancion}){
    const rAudio = useRef(null);

    useEffect(()=>{
        if(cancion!=null){
            console.log(cancion);
            _handleChangeAudio(cancion);
        }
    },[cancion])

    const _handleChangeAudio = async (cancion) =>{
        let result = await apiGetCancion(cancion);
        rAudio.current.pause();
        rAudio.current.setAttribute('src', result);
        rAudio.current.play();
        
      }

    return (
            <audio ref={rAudio} name="audio" className="audio" controls />    
    );
}