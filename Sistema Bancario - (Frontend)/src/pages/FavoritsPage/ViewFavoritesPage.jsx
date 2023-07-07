import React from 'react'
import { FavoritesCard } from '../../components/Cards/FavoritesCard'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';

export const ViewFavoritesPage = () => {
    const token = localStorage.getItem('token');
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
                    {
                        favorite.map(({ _id, client: {name: clientName, _id: clientId, surname: clientSurname} = {}, alias, accountNumber, dpi }, i) => {
                            return (
                                <FavoritesCard
                                    key={i}
                                    id={_id}
                                    name={clientName}
                                    surname={clientSurname}
                                    alias={alias}
                                    accountNumber={accountNumber}
                                    dpi={dpi}
                                    clientId ={clientId}
                                    onClick={() => deleteFavorite(_id)}
                                    >
                                </FavoritesCard>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
