import {useRef } from "react";
import {switchContainerInput} from "./withControllerInputs";

export const Inputs = ({ formProps }) => {

    const { inputsValues, initialState, onChange } = formProps;

    const CreateInputs = useRef(({values,onChange}) => {
        return initialState.map((data, key) => {
            //console.log("createInputs",values)
            const asigSize = switchContainerInput(data.containSize)
            return (
                <div key={key} className={asigSize}>
                    <div className={`input-group input-group-dynamic ${asigSize == "col-md-6" ? "mb-4" : ""} ${values[data.input.name] ? "is-focused" : ""}`}   >
                        <input {...data.input} className="form-control" value={values[data.input.name]} onChange={onChange} />
                        <label className="form-label">{data.aria_label} </label>
                    </div>
                </div>
            )
        })
    });

    return (
        <CreateInputs.current values={inputsValues} onChange={onChange}  />
    )
}
