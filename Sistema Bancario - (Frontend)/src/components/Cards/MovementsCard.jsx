import React from 'react'
import { Link } from 'react-router-dom'

export const MovementsCard = ({ id, type, userOrigin, userDestination, amount, description, date}) => {
    const role = localStorage.getItem('role')
    return (
        <>
            <div className="card m-3 row g-0 rounded-0" style={{ maxWidth: '18rem', maxHeight: '24rem' }}>
                <div className="card-header bg-primary text-white rounded-0">
                    <h5 className="card-title mb-0">Movimiento</h5>
                </div>
                <div className="card-body">
                    <p className="mb-1">
                        <strong>Tipo</strong> {type}
                    </p>
                    <p className="mb-1">
                        <strong>Usuario Origen</strong> {userOrigin}
                    </p>
                    <p className="mb-1">
                        <strong>Usuario Destino</strong> {userDestination}
                    </p>
                    <p className="mb-1">
                        <strong>Monto</strong> Q{amount}.00
                    </p>
                    <p className="mb-1">
                        <strong>Descripción</strong> {description}
                    </p>
                    <p className="mb-1">
                        <strong>Fecha</strong> {date}
                    </p>
                </div>
            </div>
        </>
    )
}
