import React from 'react'
import { Link } from 'react-router-dom'

export const AddMovementsPage = () => {
  return (
    <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-6 col-lg-7 col-md-9">
                            <div className="card border border-white">
                                <div className="text-center mb-3 pt-5">
                                    <div className="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 mb-3"><i className="bi bi-envelope"></i></div>
                                    <h1 className="fw-bolder">Hacer Transferencia</h1>
                                </div>
                                <div className="card-body p-4 p-md-5">
                                    <div className="card-body">
                                        <form id="contactForm">

                                            <div className="form-group">
                                                <label htmlFor="inputUsername">Monto</label>
                                                <input type="number" id='amount' className="form-control" placeholder="Monto" style={{ borderColor: '#00043a', borderWidth: 4 }} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="inputTelefono">Cuenta del Tercero</label>
                                                <input type="number" id='userDestination' className="form-control" placeholder="No. Cuenta" style={{ borderColor: '#00043a', borderWidth: 4 }} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="inputCorreo">DPI Destinatario</label>
                                                <input type="number" id='userDestinationDPI' className="form-control" placeholder="DPI" style={{ borderColor: '#00043a', borderWidth: 4 }} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="inputCorreo">Descripción</label>
                                                <input type="text" id='description' className="form-control" placeholder="Description" style={{ borderColor: '#00043a', borderWidth: 4 }} />
                                            </div>
                                            <br />
                                            <div className="d-flex text-center align-items-center justify-content-center">
                                                <div className="form-group">
                                                    <Link to='/start/movements'>
                                                        <button  className="btn text-light rounded-0 m-3" type="submit" style={{ backgroundColor: '#F3940C', borderRadius: 100 }}>Transferir</button>
                                                    </Link>
                                                </div>
                                                <div className="form-group">
                                                    <Link to="/start/movements">
                                                        <button className="btn text-light rounded-0 m-3" type="submit" style={{ backgroundColor: '#00043a', borderRadius: 100 }}>Cancelar</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
  )
}
