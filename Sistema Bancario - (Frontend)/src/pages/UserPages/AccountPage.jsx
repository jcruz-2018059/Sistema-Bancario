import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';
import { Users } from '../../collections/Users';

export const AccountPage = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role')
    const [user, setUsers] = useState({})
    const config = {
        headers: {
            Authorization: `${token}`
        }
    }

    const getUsers = async () => {
        try {
            const { data } = await axios('http://localhost:3200/user/getByLogin', config);
            if (data)
                setUsers(data.users);
            console.log(data);
        } catch (err) {
            console.log(err);
            throw new Error('Error getting Users');
        }
    }

    useEffect(() => getUsers, []);
    return (
        <>
            <>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-6 col-lg-7 col-md-9">
                                <div className="card">
                                    <div className="card-header bg-primary text-white rounded-0">
                                        <h5 className="card-title mb-0">Mi cuenta</h5>
                                    </div>
                                    <div className="card-body p-4 p-md-5">
                                        <div className="card-body">
                                            <h4 className='fw-bolder'>{user.name} {user.surname}</h4>
                                            <h4 style={{ color: '#F3940C', fontSize: 25 }}>{role}</h4>
                                            <br />
                                            <p className="mb-1" style={{ color: '#00043a' }}>
                                                <strong>Nombre: </strong>
                                                {user.name}
                                            </p>
                                            <p className="mb-1" style={{ color: '#00043a' }}>
                                                <strong>Apellido: </strong>
                                                {user.surname}
                                            </p>
                                            <p className="mb-1" style={{ color: '#00043a' }}>
                                                <strong>Username: </strong>
                                                {user.username}
                                            </p>
                                            <p className="mb-1" style={{ color: '#00043a' }}>
                                                <strong>AccountNumber: </strong>
                                                {user.accountNumber}
                                            </p>
                                            <p className="mb-1" style={{ color: '#00043a' }}>
                                                <strong>DPI: </strong>
                                                {user.DPI}
                                            </p>
                                            <p className="mb-1" style={{ color: '#00043a' }}>
                                                <strong>Dirección: </strong>
                                                {user.address}
                                            </p>
                                            <p className="mb-1" style={{ color: '#00043a' }}>
                                                <strong>Telefono: </strong>
                                                {user.phone}
                                            </p>
                                            <p className="mb-1" style={{ color: '#00043a' }}>
                                                <strong>email: </strong>
                                                {user.email}
                                            </p>
                                            <p className="mb-1" style={{ color: '#00043a' }}>
                                                <strong>Nombre del trabajo: </strong>
                                                {user.workName}
                                            </p>
                                            <br />
                                            <div className="row">
                                                <div className="form-group col-md-6">
                                                    <Link to='../users/update/:id'>
                                                        <button className="btn text-light" type="submit" style={{ backgroundColor: '#00043a', borderRadius: 100 }}>EditarCuenta</button>
                                                    </Link>
                                                </div>
                                                {
                                                role != 'ADMIN' ? (
                                                <div className="form-group col-md-6">
                                                    <Link to='../movements'>
                                                        <button className="btn text-light" type="submit" style={{ backgroundColor: '#F3940C', borderRadius: 100 }}>Ver Historial</button>
                                                    </Link>
                                                </div>
                                                ) : <></>
                                            }
                                            </div>
                                            <br />
                                            <h3 className="mb-1" style={{ color: '#00043a' }}>Saldo:  Q{user.balance}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>
    )
}
