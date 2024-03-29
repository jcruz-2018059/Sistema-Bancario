import { MovementsCard } from '../../components/Cards/MovementsCard'
import { DepositsCard } from '../../components/Cards/DepositsCard'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

export const ViewHistoryPage = () => {
    const token = localStorage.getItem('token');
    const [movements, setMovements] = useState([{}]);
    const [deposits, setDeposits] = useState([{}]);
    const config = {
        headers: {
        Authorization: `${token}`
        }
    }
    const getMovements = async () => {
        try {
            const { data } = await axios(`http://localhost:3200/movement/get`, config);
            if (data){
                setMovements(data.movements);
            }
        } catch (err) {
            console.log(err);
            throw new Error('Error getting movements');
        }
    }
    const getDeposits = async () => {
        try {
            const { data } = await axios(`http://localhost:3200/deposit/get`, config);
            if (data){
                setDeposits(data.deposits);
            }
        } catch (err) {
            console.log(err);
            throw new Error('Error getting deposits');
        }
    }
    useEffect(()=> {getMovements()}, []);
    useEffect(()=> {getDeposits()}, []);
    return (
        <>
        <div className='vh-100'>
        <div className='container'>
                <div className="container-fluid text-white text-center" style={{ marginTop: '8%', marginBottom: '20px', backgroundImage: 'linear-gradient(0.25turn, #007bff, #00043a)' }}>
                    <div className="container py-4">
                        <h1 className="mb-1">Historial de la cuenta</h1>
                        <p>Historial de movimientos y depósitos</p>
                    </div>
                </div>

                <div className='mb-1 d-flex justify-content-between'>
                    <Link to='../transfer' className='ms-auto'>
                        <button className='btn btn-primary rounded-0'>Hacer Transferencia</button>
                    </Link>
                </div>

                <div className='row g-0 justify-content-center'>
                <div className="container justify-content-center align-items-center" style={{display: 'flex'}}>
                        <h2 className="fw-bold">Movimientos</h2>
                 </div>
                {
                    movements.length === 0 ? (
                        <>
                        <div className='container justify-content-center align-items-center' style={{borderColor: 'red', height: 300, display: 'flex'}}>
                          <p className='fw-bold'  style={{color: '#a6a6a6'}} >Aún no tienes movimientos.</p>
                        </div>
                        </>
                      ) : 
                        movements.map(({type, userOrigin, userDestination, amount, description, date, service}, index) =>{
                            const originName = userOrigin ? userOrigin.name + ' ' + userOrigin.surname : '';
                            const destinationName = userDestination ? userDestination.name + ' ' + userDestination.surname  : '';
                            const serviceName = service ? service.name : '';
                            const desc = description ? description : '';
                            return(
                                <MovementsCard key={index}
                                    type={type}
                                    userOrigin={originName}
                                    userDestination={destinationName}
                                    amount={amount}
                                    description={desc}
                                    service={serviceName}
                                    date={date}
                                ></MovementsCard>
                            )
                        })
                    }
                    <hr style={{marginTop: 20}}></hr>
                    <div className="container justify-content-center align-items-center" style={{display: 'flex'}}>
                        <h2 className="fw-bold">Depósitos</h2>
                    </div>
                    {
                    deposits.length === 0 ? (
                        <>
                        <div className='container justify-content-center align-items-center' style={{borderColor: 'red', height: 300, display: 'flex'}}>
                          <p className='fw-bold'  style={{color: '#a6a6a6'}} >Aún no tienes depósitos.</p>
                        </div>
                        </>
                      ) : 
                        deposits.map(({ _id, amount, description, date, exp}, i) => {
                            return (
                                <DepositsCard
                                    key={i}
                                    id={_id}
                                    amount={amount}
                                    description={description}
                                    date={date}
                                    expirationDate={exp}
                                    >
                                </DepositsCard>
                            )
                        })
                    }
                </div>
            </div>
        </div>
        </>
    )
}