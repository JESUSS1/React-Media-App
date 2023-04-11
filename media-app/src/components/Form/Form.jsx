import { useRef } from "react"

export default function Form ({children}){

    const formRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
      }; 

    return(
        <form ref={formRef} onSubmit={handleSubmit} role="form" id="contact-form" autoComplete="off">
        <div className="card-body">
           <div className="row">
            {children}
           </div>
        </div>
    </form>
    )
}