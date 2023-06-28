import React from 'react'
import { FavoritesCard } from '../../components/Cards/FavoritesCard'
import { Link } from 'react-router-dom'

export const ViewFavoritesPage = () => {
    return (
        <>
            <div className='container'>
                <div className="container-fluid text-white text-center" style={{ marginTop: '10%', marginBottom: '20px', backgroundImage: 'linear-gradient(0.25turn, #007bff, #00043a)' }}>
                    <div className="container py-4">
                        <h1 className="mb-1">Ver Favoritos</h1>
                        <p>Gestionar Favoritos</p>
                    </div>
                </div>
            

            <div className='mb-5 d-flex justify-content-between'>
                <Link to='add' className='ms-auto'>
                    <button className='btn btn-primary rounded-0'>Agregar Favoritos</button>
                </Link>
            </div>

            <div className='row g-0 justify-content-center'>
                <FavoritesCard></FavoritesCard>
            </div>
            </div>
        </>
    )
}
