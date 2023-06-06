import React from 'react'
import { Link } from 'react-router-dom'


export const Nabvar = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top " style={{backgroundColor: "#00043a", paddingBottom: "1rem", paddingTop:"1rem"}}>
            <div className="container px-5">
                <img src="\src\assets\Sistema.png" alt="" style={{width: "120px"}}/>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto me-4 my-3 my-lg-0">
                        <li className="nav-item ">
                            <Link to='/' className="nav-link me-lg-3 active" aria-current="page">Inicio</Link>
                        </li>

                                <li className="nav-item ">
                                    <Link className="nav-link me-lg-3 active">Nosotros</Link>
                                </li>

                                <li className="nav-item">
                                    <Link to='/login' className="nav-link px-4 rounded-0 border border-light">Iniciar Sesión</Link>
                                </li>

                    </ul>
                </div>
            </div>
        </nav>

        
    )
}