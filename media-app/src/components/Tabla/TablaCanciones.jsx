import { useEffect, useState } from "react"
import { Paginacion } from "./Paginacion";
import { URL_API_GET_IMAGE } from "../../utils/consts";
import { Modal } from "../../utils/Modal";
import Form from "../Form/Form";

import { withControllerInputs, _handleSend } from "../Form/withControllerInputs"
import { Inputs } from "../Form/Inputs";

let initialState = [];
const modalTitle = "Datos de Canción";

export default function TablaCanciones({ data }) {

    const [paginaActual, setPaginaActual] = useState(0);
    const [totalpaginas, setTotalPaginas] = useState(0);
    const [cantRegistrosMostrar, setCantRegistroMostrar] = useState(9);
    const [showModal, setShowModal] = useState(false);
    const [selectSong, setSelectSong] = useState(null);

    useEffect(() => {
        if (data.length == 0) {
            return;
        }
        calcularPaginas();

    }, [data])

    useEffect(() => {
        if (selectSong == null || selectSong == undefined) {
            return;
            
        }else{
            
           initialState = [
            { input: { name: "title", type: "text", required: true }, value: selectSong.title?selectSong.title:"", "aria_label": "Titulo", containSize: "1" },
            { input: { name: "artist", type: "text", required: true }, value: selectSong.artist?selectSong.artist:"", "aria_label": "Autor", containSize: "1" },
           // { input: { name: "gern", type: "text" }, value: "", "aria_label": "Genero", containSize: "0.5 p2" },
            { input: { name: "year", type: "text" }, value: selectSong.year?selectSong.year:"", "aria_label": "Año", containSize: "0.5 p1" },
            { input: { name: "album", type: "text" }, value: selectSong.album?selectSong.album:"", "aria_label": "Album", containSize: "0.5 p2" },
        ];
            console.log("selectSong",selectSong);
            setShowModal(true);
        }
        

    }, [selectSong])


    const calcularPaginas = () => {
        setTotalPaginas(Math.ceil(data.length / cantRegistrosMostrar));
        setPaginaActual(1);
    }

    const _handlePaginaActual = (newPage) => {
        setPaginaActual(newPage);
    }
    const _handleModal = (id) => {
        setSelectSong(id?data.find(x => x._id === id):null);
        if(!id){
            console.log("id",id);
            setShowModal(false);
        }
    }

const FormWithControllerInputs = withControllerInputs(Inputs, initialState);

    return (
        <div>
            <Modal showModal={showModal} _handleModal ={_handleModal} modalTitle={modalTitle} >
                <Form >
                    {showModal==true?<FormWithControllerInputs/>:null}
                
                    <div className="row">
                        <div className="col-md-12">
                            <button className="btn bg-gradient-dark w-100" onClick={_handleSend} >Guardar</button>
                        </div>
                    </div>
                </Form>
            </Modal>

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
                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"></th>
                                <th className="text-secondary opacity-7"></th>
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
                                            <p className="text-xs text-secondary mb-0">{item.al}</p>
                                        </td>
                                        <td className="align-middle">
                                            <p className="text-xs text-secondary mb-0">{item.year}</p>
                                        </td>
                                        <td className="align-middle text-center text-sm">
                                            <button type="button" className="btn btn-default btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => _handleModal(item._id)} >Editar</button>
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