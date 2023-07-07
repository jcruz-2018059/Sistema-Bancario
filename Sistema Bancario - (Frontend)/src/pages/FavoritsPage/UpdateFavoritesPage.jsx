import React from 'react'
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';

export const UpdateFavoritesPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `${token}`
    }
  }
  const [favorite, setFavorites] = useState({})

  const getFavorites = async () => {
    try {
        const { data } = await axios(`http://localhost:3200/favorite/getFavorite/${id}`, config);
        if (data)
            setFavorites(data.favorite);
        console.log(data);
    } catch (err) {
        console.log(err);
        throw new Error('Error getting events');
    }
}

const updateFavorites = async () => {
  try {
    let favorite = {
      alias: document.getElementById('alias').value,
      accountNumber: document.getElementById('accountNumber').value,
      dpi: document.getElementById('dpi').value
    }
    const { data } = await axios.put(`http://localhost:3200/favorite/updateFavorite/${id}`, favorite, config);
    Swal.fire({
      title: data.message || 'Favorito editado',
      icon: 'success',
      timer: 4000
    })
    navigate('../')
  } catch (err) {
    console.log(err)
    Swal.fire({
      title: err.response.data.message || `Error editando favorito :(`,
      icon: 'error',
      timer: 4000
    })
  }
}
useEffect(() => getFavorites, []);
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop: 40}}>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-7 col-md-9">
              <div className="card border border-white">
                <div className="text-center mb-3 pt-5">
                  <div className="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 mb-3"><i className="bi bi-envelope"></i></div>
                  <h1 className="fw-bolder">Editar Favorito</h1>
                </div>
                <div className="card-body p-4 p-md-5" style={{marginTop: -60}}>
                  <div className="card-body">
                    <form id="contactForm">

                      <div className="form-group">
                        <label htmlFor="inputUsername">Alias</label>
                        <input defaultValue={favorite.alias} type="text" id='alias' className="form-control" placeholder="Nombre" style={{ borderColor: '#00043a', borderWidth: 4 }} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputTelefono">Numero de Cuenta</label>
                        <input defaultValue={favorite.accountNumber} type="text" id='accountNumber' className="form-control" placeholder="No. Cuenta" style={{ borderColor: '#00043a', borderWidth: 4 }} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputCorreo">DPI</label>
                        <input defaultValue={favorite.dpi} type="text" id='dpi' className="form-control" placeholder="DPI" style={{ borderColor: '#00043a', borderWidth: 4 }} />
                      </div>
                      <br />
                      <div className="d-flex text-center align-items-center justify-content-center">
                        <div className="form-group">
                          <Link>
                            <button onClick={(e) => { updateFavorites(), e.preventDefault() }} className="btn text-light rounded-0 m-3" type="submit" style={{ backgroundColor: '#F3940C', borderRadius: 100 }}>Editar Favorito</button>
                          </Link>
                        </div>
                        <div className="form-group">
                          <Link to="/start/favorites">
                            <button className="btn text-light rounded-0 m-3" type="submit" style={{ backgroundColor: '#00043a', borderRadius: 100 }}>Cancelar</button>
                          </Link>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
