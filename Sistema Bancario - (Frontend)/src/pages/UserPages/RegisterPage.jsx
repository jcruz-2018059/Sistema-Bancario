import React from 'react'
import { Link } from "react-router-dom";
import './Register.css'

export const RegisterPage = () => {
    return (
        <>
            <style>
                @import
                url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');
            </style>
            <section className="h-100 gradient-form pt-5">
                <div className="container-fluid py-5 h-100 rounded-0 d-flex justify-content-center align-items-center">
                    <div className="col-xl-3">
                        <div className="card rounded-3 text-black">
                            <div className="card-body p-md-5 mx-md-4">
                                <div className="text-center">
                                    <h4 className="mt-1 mb-5 pb-1 pt-5" id='iniciar'>Registrate</h4>
                                </div>

                                <form>
                                    <p>Agregue sus datos</p>

                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form2Example11">Nombre</label>
                                        <input type="text" id="form2Example11" className="form-control" placeholder="Nombre" />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form2Example22">Apellido</label>
                                        <input placeholder="Apellido" type="text" id="form2Example22" className="form-control" />
                                    </div>

                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form2Example22">Nombre de Usuario</label>
                                                <input placeholder="Usuario" type="text" id="form2Example22" className="form-control" />
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form2Example22">Contraseña</label>
                                                <input placeholder="Contraseña" type="password" id="form2Example22" className="form-control" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form2Example22">Correo Electronico</label>
                                        <input placeholder="Correo" type="email" id="form2Example22" className="form-control" />
                                    </div>

                                    <div className="text-center pt-1 mb-5 row">
                                        <button className="btn btn-danger col rounded-0" type="button">Registrarse</button>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-center pb-4">
                                        <p className="mb-0 me-2">¿Ya tienes una cuenta?</p>
                                        <Link to=''>
                                            <button type="button" className="btn btn-outline-danger rounded-0">Iniciar Sesión</button>
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
