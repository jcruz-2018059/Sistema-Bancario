import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';


export const AddProductsPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `${token}`
    }
  }

  const addProducts = async () => {
    try {
      let product = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        amount: document.getElementById('amount').value
      }
      const { data } = await axios.post('http://localhost:3200/service/addService', product, config);
      Swal.fire({
        title: data.message || 'Evento Agregado',
        icon: 'success',
        timer: 4000
      })
      navigate('../')
    } catch (err) {
      console.log(err)
      Swal.fire({
        title: err.response.data.message || `Error añadiendo evento :(`,
        icon: 'error',
        timer: 4000
      })
    }
  }
  return (
    <>

      <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
        <div className="container p-5" style={{ width: '50%', backgroundColor: '#fff' }}>
          <div className="title">
            <h1 className="text-center" style={{ color: '#00043a' }}>Ingresar Producto</h1>
          </div>
          <form>
            <div className="form-group">
              <label htmlFor="inputTelefono">Nombre</label>
              <input type="text" style={{ borderColor: '#00043a', borderWidth: 4 }} className="form-control" id="name" placeholder="Nombre Producto" />
            </div>
            <div className="form-group">
              <label htmlFor="inputTelefono">Descripción</label>
              <input type="text" style={{ borderColor: '#00043a', borderWidth: 4 }} className="form-control" id="description" placeholder="Descripción" />
            </div>
            <div className="form-group">
              <label htmlFor="inputCorreo">Precio</label>
              <input type="number" style={{ borderColor: '#00043a', borderWidth: 4 }} className="form-control" id="amount" placeholder="Precio" />
            </div>
            <div className="d-flex text-center align-items-center justify-content-center">
              <div className="form-group">
                <Link >
                  <button onClick={(e) => { addProducts(), e.preventDefault() }} className="btn text-light rounded-0 m-3" style={{backgroundColor: '#F3940C', borderRadius: 100}} type="submit">Agregar Producto</button>
                </Link>
              </div>
              <div className="form-group">
                <Link to="/start/products">
                  <button className="btn text-light rounded-0 m-3" style={{backgroundColor: '#00043a', borderRadius: 100}} type="submit">Cancelar</button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
