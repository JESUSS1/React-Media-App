import { useRef } from "react"

export default function Form ({children}){

    const formRef = useRef(null);
    return(
        <form ref={formRef} role="form" id="contact-form" autoComplete="off">
        <div className="card-body">
    
           <div className="row">
            {children}
           </div>
        </div>
    </form>
    )
}