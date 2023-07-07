import React from 'react'
import { FavoritesCard } from '../../components/Cards/FavoritesCard'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';

export const ViewFavoritesPage = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role')
    const [favorite, setFavorites] = useState([{}])
    const config = {
        headers: {
            Authorization: `${token}`
        }
    }

    const getFavorites = async () => {
        try {
            const { data } = await axios('http://localhost:3200/favorite/getFavorites', config);
            if (data)
                setFavorites(data);
            console.log(data);
        } catch (err) {
            console.log(err);
            throw new Error('Error getting events');
        }
    }

    const deleteFavorite = async (id) => {
        try {
          Swal.fire({
            title: '¿Estás seguro de eliminar este Favorito?',
            icon: 'warning',
            showConfirmButton: false,
            showDenyButton: true,
            showCancelButton: true,
            denyButtonText: `Sí, eliminar`,
          }).then(async (result) => {
            if (result.isDenied) {
              const { data } = await axios.delete(`http://localhost:3200/favorite/deleteFavorite/${id}`, config);
              console.log(data);
              Swal.fire({
                title: data.message || 'Favorito eliminado.',
                icon: 'info',
                timer: 4000
              })
              getFavorites()
            }
          })
        } catch (err) {
          console.error(err);
          Swal.fire({
            title: err.response.data.message || `Error eliminando Favorito :(`,
            icon: 'error',
            timer: 4000
          })
        }
      }
      
    useEffect(() => getFavorites, []);
    return (
        <>
        <div className='vh-100'>
        <div className='container'>
                <div className="container-fluid text-white text-center" style={{ marginTop: '8%', marginBottom: '20px', backgroundImage: 'linear-gradient(0.25turn, #007bff, #00043a)' }}>
                    <div className="container py-4">
                        <h1 className="mb-1">Ver Favoritos</h1>
                        <p>Gestionar Favoritos</p>
                    </div>
                </div>


                <div className='mb-1 d-flex justify-content-between'>
                    <Link to='add' className='ms-auto'>
                        <button className='btn btn-primary rounded-0'>Nuevo Favorito</button>
                    </Link>
                </div>

                <div className='row g-0 justify-content-center'>
                    {
                        favorite.length === 0 ? (
                            <>
                            <div className='container justify-content-center align-items-center' style={{borderColor: 'red', height: 300, display: 'flex'}}>
                              <p className='fw-bold'  style={{color: '#a6a6a6'}} >Aún no tienes usuarios favoritos.</p>
                            </div>
                            </>
                          ) : 
                        favorite.map(({ _id, client: {name: clientName} = {}, client: {surname: clientSurname} = {}, alias, accountNumber, dpi }, i) => {
                            return (
                                <FavoritesCard
                                    key={i}
                                    id={_id}
                                    name={clientName}
                                    surname={clientSurname}
                                    alias={alias}
                                    accountNumber={accountNumber}
                                    dpi={dpi}
                                    onClick={() => deleteFavorite(_id)}
                                    >
                                </FavoritesCard>
                            )
                        })
                    }
                </div>
            </div>
        </div>
        </>
    )
}
