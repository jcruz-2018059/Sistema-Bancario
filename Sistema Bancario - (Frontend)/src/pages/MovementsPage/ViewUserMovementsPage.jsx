import { MovementsCard } from '../../components/Cards/MovementsCard'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

export const ViewUserMovementsPage = () => {
    const token = localStorage.getItem('token');
    const { id } = useParams();
    const [movements, setMovements] = useState([{}])
    const [userName, setUserName] = useState('');
    const config = {
        headers: {
        Authorization: `${token}`
        }
    }
    const getMovements = async () => {
        try {
            const { data } = await axios(`http://localhost:3200/movement/get/${id}`, config);
            if (data){
                setMovements(data.movements);
                setUserName(data.userName.name + ' ' + data.userName.surname);
            }
        } catch (err) {
            console.log(err);
            throw new Error('Error getting movements');
        }
    }
    useEffect(()=> {getMovements()}, []);
    const getOriginName = () => {
        if (movements.length > 0) {
          return userName || '';
        }
        return '';
      };
    return (
        <>
            <div className='container'>
                <div className="container-fluid text-white text-center" style={{ marginTop: '10%', marginBottom: '20px', backgroundImage: 'linear-gradient(0.25turn, #007bff, #00043a)' }}>
                    <div className="container py-4">
                        <h1 className="mb-1">Ver Movimientos</h1>
                        <p>Últimos 5 movimientos de {getOriginName()} </p>
                    </div>
                </div>

                <div className='mb-5 d-flex justify-content-between'>
                    <Link to='../transfer' className='ms-auto'>
                        <button className='btn btn-primary rounded-0'>Hacer Transferencia</button>
                    </Link>
                </div>

                <div className='row g-0 justify-content-center'>
                    {
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
                    
                </div>
            </div>

        </>
    )
}