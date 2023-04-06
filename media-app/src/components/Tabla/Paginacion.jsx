import { useEffect } from "react";

export const Paginacion = ({paginaActual,totalpaginas,_handlePaginaActual}) =>{

    let registros = [];

    useEffect(()=>{
        if(totalpaginas == 0 ){
            return;
        }

    },[totalpaginas])

    const Paginas =()=>{
        const titulos = Array(totalpaginas).fill(null);
        
        return titulos.map((data,key)=>
            <li key={key} style={{cursor:"pointer"}} className={paginaActual==(key+1)?"page-item active":"page-item"} onClick={()=>_handlePaginaActual(key+1)} ><a className="page-link">{key+1}</a></li>
        )
    }

    return(
        <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
            <li className="page-item disabled" style={{cursor:"pointer"}} >
                <a className="page-link" tabIndex="-1">
                    <i className="fa fa-angle-left"></i>
                    <span className="sr-only">Previous</span>
                </a>
            </li>
            
                <Paginas/>

            <li className="page-item" style={{cursor:"pointer"}}  >
                <a className="page-link" >
                    <i className="fa fa-angle-right"></i>
                    <span className="sr-only">Next</span>
                </a>
            </li>
        </ul>
    </nav>
    );
}