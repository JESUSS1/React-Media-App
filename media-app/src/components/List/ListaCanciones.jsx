import { useEffect } from "react";
import { apiGetListaCanciones } from "../../utils/api";
import { ItemsCanciones } from "./ItemCanciones";
export default function ListaCanciones ({eventos}){

    const {_handleSetListaCanciones,_handleSetCancion,listaCanciones} = eventos;

    useEffect( ()=>{
        cargarCanciones();
    },[])

    const cargarCanciones = async()=> {
        let result = await apiGetListaCanciones();
        _handleSetListaCanciones(result);
    }
    
    return(
        <div>
            <ItemsCanciones>
                <h4 className='titulo'>Mi Lista de Reproduccion </h4>
                {listaCanciones.map((item,key) =><li className="itemCancion" key={key} onClick={()=>_handleSetCancion(item)} > {item.title} </li>)}            
            </ItemsCanciones>
        </div>
    );
} 