import React from 'react'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';

export const AddUserPage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `${token}`
        }
    }

    const addUser = async () => {
        try {
            let user = {
                name: document.getElementById('name').value,
                surname: document.getElementById('surname').value,
                username: document.getElementById('username').value,
                DPI: document.getElementById('DPI').value,
                address: document.getElementById('address').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                password: document.getElementById('password').value,
                workName: document.getElementById('workName').value,
                monthlyIncome: document.getElementById('monthlyIncome').value,
                balance: document.getElementById('balance').value,
                role: 'CLIENT'
            }
            const { data } = await axios.post('http://localhost:3200/user/add', user, config);
            Swal.fire({
                title: data.message || 'Evento Agregado',
                icon: 'success',
                timer: 4000
            })
            navigate('../')
        } catch (err) {
            console.log(err)
            Swal.fire({
                title: err.response.data.validate|| `Error añadiendo evento :(`,
                icon: 'error',
                timer: 4000
            })
        }
    }
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="container px-5 ">

                    <div className="bg-light rounded-4 py-5 px-4 px-md-5">
                        <div className="text-center mb-3">
                            <div className="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 mb-3"><i className="bi bi-envelope"></i></div>
                            <h1 className="fw-bolder">Agregar Usuario</h1>
                            <p className="lead fw-normal text-muted mb-0">Añadir Clientes</p>
                        </div>
                        <div className="row gx-5 justify-content-center">
                            <div className="col-lg-8 col-xl-6">

                                <form id="contactForm">

                                    <div className="form-group">
                                        <label htmlFor="inputName">Name</label>
                                        <input type="text" className="form-control" placeholder="Name" id="name" style={{ borderColor: '#00043a', borderWidth: 4 }} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputSurname">Surname</label>
                                        <input type="text" className="form-control" placeholder="Surname" id="surname" style={{ borderColor: '#00043a', borderWidth: 4 }} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputUsername">Username</label>
                                        <input type="text" className="form-control" placeholder="Username" id="username" style={{ borderColor: '#00043a', borderWidth: 4 }} />
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputDPI">DPI</label>
                                            <input type="number" className="form-control" placeholder="DPI" id="DPI" style={{ borderColor: '#00043a', borderWidth: 4 }} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputDirección">Dirección</label>
                                            <input type="text" className="form-control" placeholder="Dirección" id="address" style={{ borderColor: '#00043a', borderWidth: 4 }} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputTelefono">Telefono</label>
                                            <input type="number" className="form-control" placeholder="Telefono" id="phone" style={{ borderColor: '#00043a', borderWidth: 4 }} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputCorreo">Correo</label>
                                            <input type="email" className="form-control" placeholder="Correo" id="email" style={{ borderColor: '#00043a', borderWidth: 4 }} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputIngresosM">Ingresos Mensuales</label>
                                            <input type="text" className="form-control" placeholder="Ingresos Mensuales" id="monthlyIncome" style={{ borderColor: '#00043a', borderWidth: 4 }} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputIngresosA">Ingresos de Apertura</label>
                                            <input type="text" className="form-control" placeholder="Ingresos de Apertura" id="balance" style={{ borderColor: '#00043a', borderWidth: 4 }} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputPassword">Nombre del Lugar de Empleo</label>
                                        <input type="text" className="form-control" placeholder="Lugar de Empleo" id="workName" style={{ borderColor: '#00043a', borderWidth: 4 }} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputPassword">Contraseña</label>
                                        <input type="password" className="form-control" placeholder="Contraseña" id="password" style={{ borderColor: '#00043a', borderWidth: 4 }} />
                                    </div>
                                    <div className="d-flex text-center align-items-center justify-content-center">
                                        <div className="form-group">
                                            <Link >
                                                <button onClick={(e) => { addUser(), e.preventDefault() }} className="btn text-light rounded-0 m-3" style={{backgroundColor: '#F3940C', borderRadius: 100}} type="submit">Agregar Usuario</button>
                                            </Link>
                                        </div>
                                        <div className="form-group">
                                            <Link to="/start/users">
                                                <button className="btn text-light rounded-0 m-3" style={{backgroundColor: '#00043a', borderRadius: 100}} type="submit">Cancelar</button>
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
