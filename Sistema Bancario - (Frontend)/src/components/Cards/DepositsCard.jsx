import React from 'react'
import { Link } from 'react-router-dom'

export const DepositsCard = ({id, name, cuenta, amount, description, date}) => {
  return (
    <>
    <div className="card m-3 row g-0 rounded-0" style={{ maxWidth: '18rem', maxHeight: '24rem' }}>
      <div className="card-header bg-primary text-white rounded-0">
        <h5 className="card-title mb-0">Depósito</h5>
      </div>
      <div className="card-body">
      <p className="mb-1">
          <strong>Destinatario:</strong> {name}
        </p>
        <p className="mb-1">
          <strong>No cuenta:</strong> {cuenta}
        </p>
        <p className="mb-1">
          <strong>Monto:</strong> Q{description}.00
        </p>
        <p className="mb-1">
          <strong>Descripción:</strong> {description}
        </p>

        <Link className="btn btn-primary m-2 rounded-0">Editar</Link>
        <Link className="btn btn-danger m-2 rounded-0">Eliminar</Link>

      </div>
    </div>
  </>
  )
}
