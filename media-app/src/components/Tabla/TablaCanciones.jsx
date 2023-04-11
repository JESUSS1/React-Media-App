import { useEffect, useState } from "react"
import { URL_API_GET_IMAGE } from "../../utils/consts";
import { Modal } from "../../utils/Modal";
import { Paginacion } from "./Paginacion";
import Form from "../Form/Form";
import { withControllerInputs, _handleVerificarReturnData } from "../Form/withControllerInputs"
import { Inputs } from "../Form/Inputs";
import { apiUpdateSong } from "../../utils/api";

import { alertType, Alert } from "../../utils/Alert";
let initialState = [];
const modalTitle = "Datos de Canción";

export default function TablaCanciones({ data, updateListSongs }) {

    const [paginaActual, setPaginaActual] = useState(0);
    const [totalpaginas, setTotalPaginas] = useState(0);
    const [cantRegistrosMostrar, setCantRegistroMostrar] = useState(8);

    const [showModal, setShowModal] = useState(false);
    const [selectSong, setSelectSong] = useState(null);

    const [showAlert, setShowAlert] = useState(false);
    const [dataAlert, setDataAlert] = useState(null);

    const _handleSetDataAlert = (newData) => {
        setDataAlert(newData);
        _handleSetShowAlert();
    }
    const _handleSetShowAlert = () => {
        setShowAlert(!showAlert);
    };

    useEffect(() => {
        if (data.length == 0) {
            return;
        }
        calcularPaginas(false);
    }, [data])

    useEffect(() => {
        verificarCancion();

    }, [selectSong])

    const verificarCancion = async () => {
        if (selectSong != null || selectSong != undefined) {
            await updateInitialState(selectSong)
            setShowModal(true);
        }
    }
    const updateInitialState = async (state) => {
        initialState = [
            { input: { name: "title", type: "text", required: true }, value: state.title ? state.title : "", "aria_label": "Titulo", containSize: "1" },
            { input: { name: "artist", type: "text", required: true }, value: state.artist ? state.artist : "", "aria_label": "Autor", containSize: "1" },
            // { input: { name: "gern", type: "text" }, value: "", "aria_label": "Genero", containSize: "0.5 p2" },
            { input: { name: "year", type: "text" }, value: state.year ? state.year : "", "aria_label": "Año", containSize: "0.5 p1" },
            { input: { name: "album", type: "text" }, value: state.album ? state.album : "", "aria_label": "Album", containSize: "0.5 p2" },
        ];
    }



    useEffect(() => {
        if (showModal == false) {
            setSelectSong(null);
        }
    }, [showModal])


    const calcularPaginas = (actualizarPaginas = false,cantidad=null) => {
       // console.log(data.length / (cantidad?cantidad:cantRegistrosMostrar));
        setTotalPaginas(Math.ceil(data.length / (cantidad?cantidad:cantRegistrosMostrar)));//redondea un numero decimal al siguiente superior entero.
        if (paginaActual == 0 || actualizarPaginas == true) {
            setPaginaActual(1);
        }
    }


    const _handlePaginaActual = (newPage) => {
        setPaginaActual(newPage);
    }
    const _handleModal = (id) => {
        //console.log("dasda");
        if (!id) {
            setShowModal(false);
            if (showAlert) {
                _handleSetShowAlert();
            }
        } else {
            setSelectSong(id ? data.find(x => x._id === id) : null);
        }

    }

    const _handleSend = async () => {
        //console.log("dasda");
        const dataResult = _handleVerificarReturnData(initialState);

        if (dataResult) {
            /*const filteredData = Object.keys(dataResult)
                .filter((key) => dataResult[key] != "")
                .reduce((obj, key) => {
                    obj[key] = dataResult[key];
                    return obj;
                }, {});
            */
            const finalObject = { _id: selectSong._id, data: dataResult }

            let newData = {
                alertType: alertType.success,
                mensaje: "Guardado"
            }

            const postResult = await apiUpdateSong(finalObject);
            if (postResult === 200) {
                await updateInitialState(dataResult);
                _handleSetDataAlert(newData);
                updateListSongs();
            } else {
                newData.alertType = alertType.danger;
                newData.mensaje = "Error al Actualizar";
                _handleSetDataAlert(newData);
            }
        }
    }

    const _handleSetCantRegistroMostrar = (e) => {
        const cantidad = e.currentTarget.value;
        if(cantidad!=""){
            setCantRegistroMostrar(cantidad);
            calcularPaginas(true,parseInt(cantidad));
        }
    }

    const FormWithControllerInputs = withControllerInputs(Inputs, initialState);

    return (
        <div>

            <Modal showModal={showModal} _handleModal={_handleModal} modalTitle={modalTitle} >

                {showAlert ? <Alert data={dataAlert} eventAlert={_handleSetShowAlert} /> : null}

                <Form>

                    {showModal == true ? <FormWithControllerInputs /> : null}

                    <div className="row">
                        <div className="col-md-12">
                            <button className="btn bg-gradient-dark w-100" onClick={_handleSend} >Guardar</button>
                        </div>
                    </div>
                </Form>
            </Modal>

            <div className="container py-2 content-select" >
                <div className="col-5">
                    <select defaultValue={""} onChange={_handleSetCantRegistroMostrar} className="form-select selectPages" aria-label="Cantidad por Pagina">
                        <option value="" disabled>Mostrar Resultados por Pagina</option>
                        <option value="8">8</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </div>
            </div>

            <div className="card" style={{ boxShadow: "7px 9px 9px 0px #5A5252" }} >
                <div className="table-responsive">
                    <table className="table align-items-center mb-0">
                        <thead>
                            <tr>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">#</th>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Titulo y Autor</th>
                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Genero</th>
                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Album</th>
                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Año</th>
                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    <div className="align-middle text-center text-sm" style={{ cursor: "pointer" }} >
                                        <i onClick={updateListSongs} className="fa-solid fa-rotate-right"></i>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                data && data.slice((0 + (paginaActual - 1) * cantRegistrosMostrar), (0 + (paginaActual) * cantRegistrosMostrar)).map((item, key) =>
                                    <tr key={key}>
                                        <td>
                                            <div className="d-flex px-2 py-1">
                                                <div>
                                                    <img src={`${item.imageAlbun != "" ? URL_API_GET_IMAGE + item.imageAlbun : "../../albumDefault.jpg"}`} className="avatar avatar-sm me-3" />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className="text-xs font-weight-bold mb-0">{item.title}</p>
                                            <p className="text-xs text-secondary mb-0">{item.artist}</p>
                                        </td>
                                        <td className="align-middle text-center">
                                            <p className="text-xs text-secondary mb-0">{item.genre}</p>
                                        </td>
                                        <td className="align-middle">
                                            <p className="text-xs text-secondary mb-0">{item.album}</p>
                                        </td>
                                        <td className="align-middle">
                                            <p className="text-xs text-secondary mb-0">{item.year}</p>
                                        </td>
                                        <td className="align-middle text-center text-sm" style={{ cursor: "pointer" }}>
                                            <i className="fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => _handleModal(item._id)}  ></i>
                                        </td>

                                    </tr>)
                            }

                        </tbody>
                    </table>
                </div>


                <Paginacion paginaActual={paginaActual} totalpaginas={totalpaginas} _handlePaginaActual={_handlePaginaActual} />

            </div>


        </div>
    )
}