import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';

export const BuyProductPage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const { id } = useParams();
    const config = {
        headers: {
            Authorization: `${token}`
        }
    }

    const [services, setServices] = useState({})

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

    const buyService = async (service) => {
        try {
            console.log(config)
            const { data } = await axios.post(`http://localhost:3200/movement/buy/${service}`, null, config);
            Swal.fire({
                title: data.message || 'Compra Exitosa',
                icon: 'success',
                timer: 4000
            })
            navigate('/start/movements/history')
        } catch (err) {
            console.log(err)
            Swal.fire({
                title: err.response.data.message || `La compra no se pudo realizar :(`,
                icon: 'error',
                timer: 4000
            })
        }
    }

    useEffect(() => getService, []);
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-6 col-lg-7 col-md-9">
                            <div className="card border border-white">
                                <div className="text-center mb-1 pt-5">
                                    <div className="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 mb-3"><i className="bi bi-envelope"></i></div>
                                    <h1 className="fw-bolder">Confirmar compra</h1>
                                </div>
                                <div className="card-body p-4 p-md-5">
                                    <div className="card-body">
                                        <form id="contactForm">

                                            <div className="form-group">
                                                <label htmlFor="inputUsername">Producto:</label>
                                                <h3> {services.name} </h3>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="inputUsername">Precio:</label>
                                                <h3>Q{services.amount}.00 </h3>
                                            </div>

                                            <div className="d-flex text-center align-items-center justify-content-center">
                                                <div className="form-group">
                                                    <Link>
                                                        <button onClick={(e) => { buyService(id), e.preventDefault() }} className="btn text-light rounded-0 m-3" type="submit" style={{ backgroundColor: '#F3940C', borderRadius: 100 }}>Confirmar Compra</button>
                                                    </Link>
                                                </div>
                                                <div className="form-group">
                                                    <Link to="/start/products">
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
