import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';
import { Users } from '../../collections/Users';

export const ViewUserPage = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role')
    const [user, setUsers] = useState([{}])
    const config = {
        headers: {
            Authorization: `${token}`
        }
    }

    const getUsers = async () => {
        try {
            const { data } = await axios('http://localhost:3200/user/get', config);
            if (data)
                setUsers(data.users);
            console.log(data);
        } catch (err) {
            console.log(err);
            throw new Error('Error getting Users');
        }
    }

    const deleteUser = async (id) => {
        try {
          Swal.fire({
            title: '¿Estás seguro de eliminar este Usuario?',
            icon: 'warning',
            showConfirmButton: false,
            showDenyButton: true,
            showCancelButton: true,
            denyButtonText: `Sí, eliminar`,
          }).then(async (result) => {
            if (result.isDenied) {
              const { data } = await axios.delete(`http://localhost:3200/user/delete/${id}`, config);
              console.log(data);
              Swal.fire({
                title: data.message || 'Usuario.',
                icon: 'info',
                timer: 4000
              })
              getUsers()
            }
          })
        } catch (err) {
          console.error(err);
          Swal.fire({
            title: err.response.data.message || `Error eliminando Usuario :(`,
            icon: 'error',
            timer: 4000
          })
        }
      }

    useEffect(() => getUsers, []);
    return (
        <>
            <div className='container'>
                <div className="container-fluid text-white text-center" style={{ marginTop: '10%', marginBottom: '20px', backgroundImage: 'linear-gradient(0.25turn, #007bff, #00043a)' }}>
                    <div className="container py-4">
                        <h1 className="mb-1">Ver Usuarios</h1>
                        <p>Gestionar Usuarios</p>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className='mb-5 d-flex justify-content-between'>
                    <Link to='add'>
                        <button className='btn text-light' style={{ backgroundColor: '#F3940C' }}>Agregar Cliente</button>
                    </Link>
                    <Link to='addAdmin'>
                        <button className='btn text-light' style={{ backgroundColor: '#F3940C' }}>Agregar Administrador</button>
                    </Link>
                </div>
                <table className="table">
                    <thead className="text-light" style={{ backgroundColor: '#00043a' }}>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">DPI</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Email</th>
                            <th scope="col">Balance</th>
                            <th scope="col">Role</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            user.map(({ _id, name, surname, DPI, phone, email, balance, role }, index) => {
                                return (
                                    <tr className="text-dark" key={index}>
                                        <Users
                                            id={_id}
                                            name={name}
                                            surname={surname}
                                            DPI={DPI}
                                            phone={phone}
                                            email={email}
                                            balance={balance}
                                            role={role}

                                        ></Users>

                                        <td>
                                            {
                                                role != 'ADMIN' ? (
                                                    <Link to='../movements'>
                                                        <button className='btn text-light rounded-0' style={{ backgroundColor: '#00043a', marginRight: '30px' }}>Ver Historial</button>
                                                    </Link>
                                                ) : <></>
                                            }
                                            {
                                                role !=  'ADMIN' ? (
                                                    <Link onClick={() => deleteUser(_id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                        </svg>

                                                    </Link>
                                                ) : <></>
                                            }
                                            {
                                                role !=  'ADMIN' ? (
                                                    <Link to={`update/${_id}`}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen-fill" viewBox="0 0 16 16">
                                                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
                                                        </svg>
                                                    </Link>
                                                ) : <></>
                                            }
                                        </td>

                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
