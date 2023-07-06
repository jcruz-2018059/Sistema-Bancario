import React from 'react'
import { DepositsCard } from '../../components/Cards/DepositsCard'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';

export const ViewDepositsPage = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role')
  const [deposit, setDeposits] = useState([{}])
  const config = {
    headers: {
      Authorization: `${token}`
    }
  }
  const getDeposit = async () => {
    try {
      const { data } = await axios('http://localhost:3200/deposit/allDeposits', config);
      if (data)
        setDeposits(data);
      console.log(data);
    } catch (err) {
      console.log(err);
      throw new Error('Error getting events');
    }
  }

  const reverse = async (id) => {
    try {
      let params ={
        ID: id
      }
      const { data } = await axios.post('http://localhost:3200/deposit/reverse', params, config);
      if (data)
      Swal.fire({
        title: data.message || 'Deposito Agregado',
        icon: 'success',
        timer: 4000
      })
      getDeposit()
      navigate('/start/deposits')
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: err.response.data.message||err.response.data.error|| err.response.data.validate || err.response.data.errors[0].msg|| `Error añadiendo Favorito :(`,
        icon: 'error',
        timer: 4000
      })
    }
  }

  useEffect(() => getDeposit, []);
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
                <button className='btn btn-primary rounded-0'>Agregar Depositos</button>
              </Link>
            </div>
          ) : <></>
        }

        <div className='row g-0 justify-content-center'>
        {
                        deposit.map(({ _id, clientDestiny: {name: destinyName} = {}, clientDestiny: {surname: destinySurname} = {}, noAccountDestiny, amount, description, date, exp}, i) => {
                            return (
                                <DepositsCard
                                    key={i}
                                    id={_id}
                                    name={destinyName}
                                    surname={destinySurname}
                                    cuenta={noAccountDestiny}
                                    amount={amount}
                                    description={description}
                                    date={date}
                                    expirationDate={exp}
                                    onClick={() => reverse(_id)}
                                    >
                                </DepositsCard>
                            )
                        })
                    }
        </div>
      </div>
    </>
  )
}
