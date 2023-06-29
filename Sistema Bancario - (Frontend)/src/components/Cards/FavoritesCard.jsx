import React from 'react'
import { Link } from 'react-router-dom'

export const FavoritesCard = ({ id, name, surname, alias, accountNumber, dpi}) => {
    const role = localStorage.getItem('role')
    return (
        <>
            <div className="card m-3 row g-0 rounded-0" style={{ maxWidth: '18rem', maxHeight: '24rem' }}>
                <div className="card-header bg-primary text-white rounded-0">
                    <h5 className="card-title mb-0">{alias}</h5>
                </div>
                <div className="card-body">
                    <p className="mb-1">
                        <strong>Nombre</strong> {name} {surname}
                    </p>
                    <p className="mb-1">
                        <strong>No. Cuenta</strong> {accountNumber}
                    </p>
                    <p className="mb-1">
                        <strong>DPI</strong> {dpi}
                    </p>

                    <Link to={`update/${id}`} className="btn btn-primary m-2 rounded-0">Editar</Link>

                    <Link className="btn btn-danger m-2 rounded-0">Eliminar</Link>

                    <Link className="btn text-light m-2 rounded-0" style={{ backgroundColor: '#F3940C' }}>Transferir</Link>


                </div>
            </div>
        </>
    )
}
