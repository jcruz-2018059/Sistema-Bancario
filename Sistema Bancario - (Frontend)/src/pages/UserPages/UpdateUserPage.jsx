import React from 'react'
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';

export const UpdateUserPage = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role')
    const { id } = useParams();
    const [user, setUsers] = useState({})
    const config = {
        headers: {
            Authorization: `${token}`
        }
    }

    const getUsers = async () => {
        try {
            const { data } = await axios(`http://localhost:3200/user/getById/${id}`, config);
            if (data)
                setUsers(data.users);
            console.log(data);
        } catch (err) {
            console.log(err);
            throw new Error('Error getting Users');
        }
    }

    const updateUser = async () => {
        try {
            let user = {
                name: document.getElementById('name').value,
                surname: document.getElementById('surname').value,
                username: document.getElementById('username').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                address: document.getElementById('address').value,
                workName: document.getElementById('workName').value,
            }
            if (role === 'CLIENT') {
                const { data } = await axios.put('http://localhost:3200/user/update', user, config)
                Swal.fire({
                    title: data.message || '¡Usuario actualizado!',
                    icon: 'success',
                    timer: 4000
                })
            } else if (role === 'ADMIN') {
                const { data } = await axios.put(`http://localhost:3200/user/update/${id}`, user, config)
                Swal.fire({
                    title: data.message || '¡Usuario actualizado!',
                    icon: 'success',
                    timer: 4000
                })
            }
        } catch (err) {
            console.error(err)
            Swal.fire({
                title: err.response.data.message || 'Error updating user',
                icon: 'error',
                timer: 4000
            })
        }
    }
    useEffect(() => getUsers, []);
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop: 50 }}>

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-6 col-lg-7 col-md-9">
                            <div className="card border border-white">
                                <div className="text-center mb-3 pt-5">
                                    <div className="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 mb-3"><i className="bi bi-envelope"></i></div>
                                    <h1 className="fw-bolder">Editar Usuario</h1>
                                </div>
                                <div className="card-body p-4 p-md-5" style={{ marginTop: -50 }}>
                                    <div className="card-body">
                                        <form id="contactForm">
                                            <div className="form-group">
                                                <label htmlFor="inputUsername">Nombre</label>
                                                <input defaultValue={user.name} type="text" id='name' className="form-control" placeholder="Username" style={{ borderColor: '#00043a', borderWidth: 4 }} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="inputUsername">Apellido</label>
                                                <input defaultValue={user.surname} type="text" id='surname' className="form-control" placeholder="Username" style={{ borderColor: '#00043a', borderWidth: 4 }} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="inputUsername">Username</label>
                                                <input defaultValue={user.username} type="text" id='username' className="form-control" placeholder="Username" style={{ borderColor: '#00043a', borderWidth: 4 }} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="inputTelefono">Teléfono</label>
                                                <input defaultValue={user.phone} type="text" id='phone' className="form-control" placeholder="Telefono" style={{ borderColor: '#00043a', borderWidth: 4 }} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="inputCorreo">Correo</label>
                                                <input defaultValue={user.email} type="text" id='email' className="form-control" placeholder="Correo" style={{ borderColor: '#00043a', borderWidth: 4 }} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="inputUsername">Dirección</label>
                                                <input defaultValue={user.address} type="text" id='address' className="form-control" placeholder="Username" style={{ borderColor: '#00043a', borderWidth: 4 }} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="inputUsername">Apellido</label>
                                                <input defaultValue={user.workName} type="text" id='workName' className="form-control" placeholder="Username" style={{ borderColor: '#00043a', borderWidth: 4 }} />
                                            </div>
                                            <br />
                                            <div className="d-flex text-center align-items-center justify-content-center">
                                                <div className="form-group">
                                                    <Link to='/start/users'>
                                                        <button onClick={() => updateUser()} className="btn btn-primary text-light rounded-0 m-3" type="submit" style={{ borderRadius: 100 }}>Actualizar Usuario</button>
                                                    </Link>
                                                </div>
                                                <div className="form-group">
                                                    <Link to="/start/users">
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
