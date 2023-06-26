import React from 'react'
import { Link } from 'react-router-dom'

export const ViewUserPage = () => {
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
                    <button className='btn text-light' style={{backgroundColor: '#F3940C'}}>Agregar Usuario</button>
                    </Link>
                    <Link to='moves'>
                    <button className='btn text-light' style={{backgroundColor: '#00043a'}}>Movimientos</button>
                    </Link>
                    <Link to='account'>
                    <button className='btn text-light' style={{backgroundColor: '#000000'}}>Cuenta</button>
                    </Link>
                </div>
                <table className="table">
                    <thead className="text-light" style={{backgroundColor: '#00043a'}}>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">DPI</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Email</th>
                            <th scope="col">Balance</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                        <tbody>
                            <tr className="text-dark">
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>45854-9</td>
                            <td>151515</td>
                            <td>motto@gmail.com</td>
                            <td>Q800</td>
                                <td>
                                <Link to='update'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen-fill" viewBox="0 0 16 16">
                                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
                                    </svg>
                                </Link>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                    </svg>
                                </td>
                            </tr>
                        </tbody>
                </table>
            </div>
        </>
    )
}
