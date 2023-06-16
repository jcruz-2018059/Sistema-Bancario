import React from "react";
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';

export const AddDepositsPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `${token}`
    }
  }

  const [users, setDeposit] = useState([{}])

  const getDeposit = async () => {
    try {
      const { data } = await axios('http://localhost:2651/deposit/getAdmins', config)
      setDeposit(data.deposit)
      console.log(data.deposit)
    } catch (err) {
      console.log(err)
    }
  }

  const AddDeposit = async () => {
    try {
      let deposit = {
        destination: document.getElementById('destination').value,
        DPI: document.getElementById('DPI').value,
        amount: document.getElementById('amount').value,
        description: document.getElementById('description').value,
        date_hour: document.getElementById('date_hour').value,
      }
      const { data } = await axios.post('http://localhost:2651/deposit/add', deposit, config)
      Swal.fire({
        title: data.message || 'Deposito Agregado',
        icon: 'success',
        timer: 4000
      })
      navigate('/start/deposits')
    } catch (err) {
      console.log(err)
      Swal.fire({
        title: err.response.data.message || 'Error Adding Deposit',
        icon: 'error',
        timer: 4000
      })
    }
  }

  //useEffect(() => getDeposit, [])

  return (
    <>

      <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh'}}>
        <div className="container p-5" style={{ width: '50%', height: '50%',  backgroundColor: '#fff'  }}>
          <div className="title">
            <h1 className="text-center" style={{ color: '#00043a' }}>Hacer Depósito</h1>
          </div>
          <form>
            <div className="form-group">
              <label htmlFor="inputTelefono">Cuenta Destino</label>
              <input type="text" style={{ borderColor: '#00043a', borderWidth: 4, borderRadius: 100 }} className="border-primary form-control" id="destination" placeholder="destination" />
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="inputDireccion">DPI</label>
                <input type="text" style={{ borderColor: '#00043a', borderWidth: 4, borderRadius: 100 }} className="border-primary form-control" id="DPI" placeholder="DPI" />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputCiudad">Monto</label>
                <input type="text" style={{ borderColor: '#00043a', borderWidth: 4, borderRadius: 100 }} className="border-primary form-control" id="amount" placeholder="amount" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputTelefono">Descripción</label>
              <input type="text" style={{ borderColor: '#00043a', borderWidth: 4, borderRadius: 100 }} className="border-primary form-control" id="description" placeholder="description" />
            </div>
            <div className="form-group">
              <label htmlFor="inputCorreo">Fecha y hora</label>
              <input type="email" style={{ borderColor: '#00043a', borderWidth: 4, borderRadius: 100 }} className="border-primary form-control" id="date_hour" placeholder="date_hour" />
            </div>
            <div className="row text-center">
              <div className="form-group">
                <Link to="/start/deposits">
                  <button onClick={() => AddDeposit()} className="btn btn-primary" type="submit">Agregar Depósito</button>
                </Link>
              </div>
              <div className="form-group">
                <Link to="/start/deposits">
                  <button className="btn btn-warning" type="submit">Cancelar</button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
