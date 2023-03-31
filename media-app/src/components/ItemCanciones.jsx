export const ItemsCanciones = ({listaCanciones,_handleSetCancion}) =>{

    return(
        <ol id="list">
            <h4 className='titulo'>Mi Lista de Reproduccion </h4>
            {listaCanciones.map((item,key) =><li className="itemCancion" key={key} onClick={()=>_handleSetCancion(item)} > {item} </li>)}            
        </ol>
    );
}