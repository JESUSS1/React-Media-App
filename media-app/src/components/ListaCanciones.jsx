import { useEffect } from "react";
import { apiGetListaCanciones } from "../utils/api";
import { ItemsCanciones } from "./ItemCanciones";
export default function ListaCanciones ({eventos}){

    const {_handleSetListaCanciones,_handleSetCancion,listaCanciones} = eventos;

    useEffect( ()=>{
        cargarCanciones();
    },[])

    const cargarCanciones = async()=> {
        let result = await apiGetListaCanciones();
        _handleSetListaCanciones(result);
        //console.log(result);
    }
    
    return(
        <div>
            <ItemsCanciones listaCanciones={listaCanciones} _handleSetCancion={_handleSetCancion} />
        </div>
    );
} 