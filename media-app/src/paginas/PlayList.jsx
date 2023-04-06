import { Modal } from "../utils/Modal"
import { useState } from "react";
export function PlayList() {
    const [showModal, setShowModal] = useState(false);
    const _handleOpenModal = (id) => {
        setShowModal(!showModal);
    }


    return (
        <div>
            <a className="page-link" >
                    <i className="fa fa-angle-right"></i>
                    <span className="sr-only">Next</span>
                </a>
            <button type="button" className="btn btn-default btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => _handleOpenModal(item._id)} >Editar</button>
            <Modal showModal={showModal} >
                <section>
                    <div className="container py-4">
                        <div className="row">
                            <div className="col-lg-7 mx-auto d-flex justify-content-center flex-column">
                                <h3 className="text-center">Contact us</h3>
                                <form role="form" id="contact-form" method="post" autoComplete="off">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="input-group input-group-dynamic mb-4">
                                                    <label className="form-label">First Name</label>
                                                    <input className="form-control" aria-label="First Name..." type="text" />
                                                </div>
                                            </div>
                                            <div className="col-md-6 ps-2">
                                                <div className="input-group input-group-dynamic">
                                                    <label className="form-label">Last Name</label>
                                                    <input type="text" className="form-control" placeholder="" aria-label="Last Name..." />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <div className="input-group input-group-dynamic">
                                                <label className="form-label">Email Address</label>
                                                <input type="email" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="input-group mb-4 input-group-static">
                                            <label>Your message</label>
                                            <textarea name="message" className="form-control" id="message" rows="4"></textarea>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-check form-switch mb-4 d-flex align-items-center">
                                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" defaultChecked />
                                                    <label className="form-check-label ms-3 mb-0" htmlFor="flexSwitchCheckDefault">I agree to the <a className="text-dark"><u>Terms and Conditions</u></a>.</label>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <button type="submit" className="btn bg-gradient-dark w-100">Send Message</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </Modal>
        </div>
    )
}