import React from 'react'
import { Link } from "react-router-dom";

export const UpdateUserPage = () => {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div class="container px-5 ">

                    <div className="bg-light rounded-4 py-5 px-4 px-md-5">
                        <div className="text-center mb-3">
                            <div className="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 mb-3"><i className="bi bi-envelope"></i></div>
                            <h1 className="fw-bolder">Editar Usuario</h1>
                        </div>
                        <div className="row gx-5 justify-content-center">
                            <div className="col-lg-8 col-xl-6">

                                <form id="contactForm">

                                    <div className="form-group">
                                        <label htmlFor="inputUsername">Username</label>
                                        <input type="text" className="form-control" placeholder="Username" style={{ borderColor: '#00043a', borderWidth: 4 }} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputTelefono">Telefono</label>
                                        <input type="number" className="form-control" placeholder="Telefono" style={{ borderColor: '#00043a', borderWidth: 4 }} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputCorreo">Correo</label>
                                        <input type="text" className="form-control" placeholder="Correo" style={{ borderColor: '#00043a', borderWidth: 4 }} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputMontoA">Monto de Apertura</label>
                                        <input type="text" className="form-control" placeholder="Monto de Apertura" style={{ borderColor: '#00043a', borderWidth: 4 }} />
                                    </div>
                                    <br />
                                    <div className="d-flex text-center align-items-center justify-content-center">
                                        <div className="form-group">
                                            <Link >
                                                <button onClick={(e) => { addProducts(), e.preventDefault() }} className="btn text-light rounded-0 m-3" type="submit" style={{backgroundColor: '#F3940C', borderRadius: 100}}>Agregar Producto</button>
                                            </Link>
                                        </div>
                                        <div className="form-group">
                                            <Link to="/start/account">
                                                <button className="btn text-light rounded-0 m-3" type="submit" style={{backgroundColor: '#00043a', borderRadius: 100}}>Cancelar</button>
                                            </Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
