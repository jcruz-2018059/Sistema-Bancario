import React from 'react'
import { Link } from 'react-router-dom'

export const ProductsCard = ({ id, name, description, amount, onClick }) => {
  return (
    <>
      <div className="card m-3 row g-0 rounded-0" style={{ maxWidth: '18rem', maxHeight: '24rem' }}>
        <div className="card-header bg-primary text-white rounded-0">
          <h5 className="card-title mb-0">{name}</h5>
        </div>
        <div className="card-body">
          <p className="mb-1">
            <strong>Descripción:</strong> {description}
          </p>
          <p className="mb-1">
            <strong>Precio:</strong> Q{amount}.00
          </p>

          <Link to={`update/${id}`} className="btn btn-primary m-2 rounded-0">Editar</Link>
          <Link onClick={onClick} className="btn btn-danger m-2 rounded-0">Eliminar</Link>

        </div>
      </div>
    </>
  )
}
