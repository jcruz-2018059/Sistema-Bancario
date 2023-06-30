import { MovementsCard } from '../../components/Cards/MovementsCard'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

export const ViewHistoryPage = () => {
    const token = localStorage.getItem('token');
    const [movements, setMovements] = useState([{}])
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
    useEffect(()=> {getMovements()}, []);
    return (
        <>
            <div className='container'>
                <div className="container-fluid text-white text-center" style={{ marginTop: '10%', marginBottom: '20px', backgroundImage: 'linear-gradient(0.25turn, #007bff, #00043a)' }}>
                    <div className="container py-4">
                        <h1 className="mb-1">Historial de la cuenta</h1>
                        <p>Historial de movimientos</p>
                    </div>
                </div>

                <div className='mb-5 d-flex justify-content-between'>
                    <Link to='add' className='ms-auto'>
                        <button className='btn btn-primary rounded-0'>Hacer Transferencia</button>
                    </Link>
                </div>

                <div className='row g-0 justify-content-center'>
                {
                        movements.map(({type, userOrigin, userDestination, amount, description, date, service}, index) =>{
                            const originName = userOrigin ? userOrigin.name + ' ' + userOrigin.surname : '';
                            const destinationName = userDestination ? userDestination.name + ' ' + userDestination.surname  : '';
                            const serviceName = service ? service.name : '';
                            return(
                                <MovementsCard key={index}
                                    type={type}
                                    userOrigin={originName}
                                    userDestination={destinationName}
                                    amount={amount}
                                    description={description}
                                    service={serviceName}
                                    date={date}
                                ></MovementsCard>
                            )
                        })
                    }
                </div>
            </div>

        </>
    )
}