import { useState, useEffect } from "react";

let valoresFinales = {};
let valoresIniciales = [];

export const withControllerInputs = (Component, initialState) => {
    const getState = initialState.reduce((acc, item) => { acc[item.input.name] = item.value; return acc; }, {});
    valoresFinales = initialState;
    const wrapperComponent = () => {
        const [inputsValues, setInputsValues] = useState(getState);

        useEffect(() => {
            valoresFinales = inputsValues;
        }, [inputsValues])


        const onChange = (e) => {
            const { name, value } = e.target;
            //console.log("change ",value)
            setInputsValues({
                ...inputsValues,
                [name]: value
            })
        }

        const formProps = {
            inputsValues,
            initialState,
            onChange,
        }
        return <Component formProps={formProps} />
    }
    return wrapperComponent;
}

export const _handleSend = (e) => {
    e.preventDefault();
    //console.log("send")
    //si el input tiene un required y ese campo esta vacio o es nulo entonces agregamos a una lista de inputs por revisar
    const requeridos = valoresIniciales.filter(data => data.required === true && (valoresFinales[data.name] == "" || valoresFinales[data.name] == null));

    if (requeridos.length > 0) {
        const mensaje = requeridos.map((data) => data.aria_label)
        if (mensaje.length > 0) {
            alert("Hubo Problemas al procesar los campos : \n" + mensaje + "\nRevise nuevamente.");
        } else {
            console.log(valoresFinales);
        }
    } else {
        console.log(valoresFinales);
    }
}

export const switchContainerInput = (value) => {

    switch (value) {
        case "1": return "mb-4";
        case "0.5 p1": return "col-md-6";
        case "0.5 p2": return "col-md-6 ps-2";
        default: return "mb-4";
    }
}
