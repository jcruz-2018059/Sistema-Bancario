import React from 'react'
import { Link } from 'react-router-dom'

export const ProductsCard = ({ id, name, description, amount, onClick }) => {
  const role = localStorage.getItem('role')
  return (
    <>
      <div className="card m-3 row g-0 rounded-0" style={{ maxWidth: '18rem', maxHeight: '40rem' }}>
      <img src="\src\assets\productos.png" className="img-fluid" alt="..."/>
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
          {
            role != 'CLIENT' ? (
              <Link to={`update/${id}`} className="btn btn-primary m-2 rounded-0">Editar</Link>
            ) : <></>
          }
          {
            role != 'CLIENT' ? (
          <Link onClick={onClick} className="btn btn-danger m-2 rounded-0">Eliminar</Link>
          ) : <></>
          }
          {
            role == 'CLIENT' ? (
          <Link  className="btn text-light m-2 rounded-0" style={{backgroundColor: '#F3940C'}}>Comprar</Link>
          ) : <></>
          }

        </div>
      </div>
    </>
  )
}
