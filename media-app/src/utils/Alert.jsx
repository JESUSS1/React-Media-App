export const alertType = {
    success:"success",
    warning:"warning",
    info:"info",
    danger:"danger",
    primary:"primary",
    secundary:"secundary"
}

const returnClass ={
    success:"fa-solid fa-thumbs-up",
    warning: "fa-solid fa-triangle-exclamation",
    info:"fa-solid fa-circle-info",
    danger: "fa-solid fa-hexagon-exclamation",
    primary:"fa-solid fa-exclamation",
    secundary:"fa-solid fa-exclamation"
}

const capitalizarPrimeraLetra=(str)=> {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


export const Alert = ({data,eventAlert}) => {
    return (
        <div className={`alert alert-${data.alertType} text-white font-weight-bold alert-dismissible fade show`} role="alert">
            <span className="alert-icon"><i className={returnClass[data.alertType]}></i></span>
            <span className="alert-text"><strong> {capitalizarPrimeraLetra(data.alertType)}!</strong> {data.mensaje} </span>
            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={eventAlert}  aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}