import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';

export const AddFavoritesPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `${token}`
    }
  }

  const addFavorites = async () => {
    try {
      let favorite = {
        alias: document.getElementById('alias').value,
        accountNumber: document.getElementById('accountNumber').value,
        dpi: document.getElementById('dpi').value
      }
      const { data } = await axios.post('http://localhost:3200/favorite/addFavorite', favorite, config);
      Swal.fire({
        title: data.message || 'Favorito Agregado',
        icon: 'success',
        timer: 4000
      })
      navigate('../')
    } catch (err) {
      console.log(err)
      Swal.fire({
        title: err.response.data.message||err.response.data.error|| err.response.data.validate || err.response.data.errors[0].msg|| `Error añadiendo Favorito :(`,
        icon: 'error',
        timer: 4000
      })
    }
  }
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-7 col-md-9">
              <div className="card border border-white">
                <div className="text-center mb-3 pt-5">
                  <div className="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 mb-3"><i className="bi bi-envelope"></i></div>
                  <h1 className="fw-bolder">Agregar Favoritos</h1>
                </div>
                <div className="card-body p-4 p-md-5">
                  <div className="card-body">
                    <form id="contactForm">

                      <div className="form-group">
                        <label htmlFor="inputUsername">Nombre</label>
                        <input  type="text" id='alias' className="form-control" placeholder="Nombre" style={{ borderColor: '#00043a', borderWidth: 4 }} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputTelefono">Numero de Cuenta</label>
                        <input  type="text" id='accountNumber' className="form-control" placeholder="No. Cuenta" style={{ borderColor: '#00043a', borderWidth: 4 }} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputCorreo">DPI</label>
                        <input  type="text" id='dpi' className="form-control" placeholder="DPI" style={{ borderColor: '#00043a', borderWidth: 4 }} />
                      </div>
                      <br />
                      <div className="d-flex text-center align-items-center justify-content-center">
                        <div className="form-group">
                          <Link>
                            <button onClick={(e) => { addFavorites(), e.preventDefault() }} className="btn text-light rounded-0 m-3" type="submit" style={{ backgroundColor: '#F3940C', borderRadius: 100 }}>Agregar Favorito</button>
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
