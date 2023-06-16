import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';

export const UpdateProductsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `${token}`
    }
  }
  const [service, setServices] = useState({})

  const getService = async () => {
    try {
        const { data } = await axios(`http://localhost:3200/service/getService/${id}`, config);
        if (data) 
          setServices(data);
          console.log(data);
    } catch (err) {
      console.log(err);
      throw new Error('Error getting events');
    }
  }

  const updateProduct = async () => {
    try {
      let product = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        amount: document.getElementById('amount').value
      }
      const { data } = await axios.put(`http://localhost:3200/service/updateService/${id}`, product, config);
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

  useEffect(() => getService, []);
  return (
    <>

      <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
        <div className="container p-5" style={{ width: '50%', height: '50%', backgroundColor: '#fff' }}>
          <div className="title">
            <h1 className="text-center" style={{ color: '#00043a' }}>Editar Producto</h1>
          </div>
          <form>
            <div className="form-group">
              <label htmlFor="inputTelefono">Nombre</label>
              <input defaultValue={service.name} type="text" style={{ borderColor: '#00043a', borderWidth: 4 }} className="border-primary form-control" id="name" placeholder="Nombre Producto" />
            </div>
            <div className="form-group">
              <label htmlFor="inputTelefono">Descripción</label>
              <input defaultValue={service.description} type="text" style={{ borderColor: '#00043a', borderWidth: 4 }} className="border-primary form-control" id="description" placeholder="Descripción" />
            </div>
            <div className="form-group">
              <label htmlFor="inputCorreo">Precio</label>
              <input defaultValue={service.amount} type="number" style={{ borderColor: '#00043a', borderWidth: 4 }} className="border-primary form-control" id="amount" placeholder="Precio" />
            </div>
            <div className="d-flex text-center align-items-center justify-content-center">
              <div className="form-group">
                <Link >
                  <button onClick={(e) => { updateProduct(), e.preventDefault() }} className="btn btn-success rounded-0 m-3" type="submit">Editar</button>
                </Link>
              </div>
              <div className="form-group">
                <Link to="/start/products">
                  <button className="btn btn-danger rounded-0 m-3" type="submit">Cancelar</button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
