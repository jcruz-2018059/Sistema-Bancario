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
        noAccountDestiny: document.getElementById('destination').value,
        DPI: document.getElementById('DPI').value,
        amount: document.getElementById('amount').value,
        description: document.getElementById('description').value,
      }
      const { data } = await axios.post('http://localhost:3200/deposit/add', deposit, config)
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
        <div className="container p-5" style={{ width: '50%',  backgroundColor: '#fff'  }}>
          <div className="title">
            <h1 className="text-center" style={{ color: '#00043a' }}>Hacer Depósito</h1>
          </div>
          <form>
            <div className="form-group">
              <label htmlFor="inputTelefono">Cuenta Destino</label>
              <input type="number" style={{ borderColor: '#00043a', borderWidth: 4}} className="form-control" id="destination" placeholder="No. de cuenta del destinatario" />
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="inputDireccion">DPI</label>
                <input type="number" style={{ borderColor: '#00043a', borderWidth: 4}} className="form-control" id="DPI" placeholder="DPI" />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputCiudad">Monto</label>
                <input type="number" style={{ borderColor: '#00043a', borderWidth: 4}} className="form-control" id="amount" placeholder="Monto" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputTelefono">Descripción</label>
              <input type="text" style={{ borderColor: '#00043a', borderWidth: 4}} className="form-control" id="description" placeholder="Descripción" />
            </div>
            <div className="row text-center" style={{marginTop: 20}}>
              <div className="form-group">
                <Link to="/start/deposits" style={{marginRight: 20}}>
                  <button onClick={() => AddDeposit()} className="btn text-light rounded-0 m-3" style={{backgroundColor: '#F3940C', borderRadius: 100}} type="submit">Agregar Depósito</button>
                </Link>
                <Link to="/start/deposits">
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
