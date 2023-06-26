import React from 'react'
import { DepositsCard } from '../../components/Cards/DepositsCard'
import { Link } from 'react-router-dom'

export const ViewDepositsPage = () => {
  const role = localStorage.getItem('role')
  return (
    <>
      <div className='container'>
        <div className="container-fluid text-white text-center" style={{ marginTop: '10%', marginBottom: '20px', backgroundImage: 'linear-gradient(0.25turn, #007bff, #00043a)' }}>
          <div className="container py-4">
            <h1 className="mb-1">Ver depósitos</h1>
            <p>Gestionar depositos</p>
          </div>
        </div>


        {
          role == 'ADMIN' ? (
            <div className='mb-5 d-flex justify-content-between'>
              <Link to='add' className='ms-auto'>
                <button className='btn btn-primary rounded-0'>Agregar Productos</button>
              </Link>
            </div>
          ) : <></>
        }

        <div className='row g-0 justify-content-center'>
          <DepositsCard></DepositsCard>
        </div>
      </div>
    </>
  )
}
