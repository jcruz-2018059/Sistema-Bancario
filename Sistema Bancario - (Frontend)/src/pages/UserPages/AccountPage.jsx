import React from 'react'
import { Link } from "react-router-dom";

export const AccountPage = () => {
  return (
    <>  
        <>
        <h3 style={{color: '#00043a', textAlign: 'center'}}>Cuenta de Usuario</h3>
        <br/>

            <div className="card text-left" style={{ maxWidth: '30rem', maxHeight: '35rem', borderColor: '#00043a', borderWidth: 4, borderRadius: 20 }}>
                <div className="card-body">
                    <h4 style={{color: '#000000', fontSize: 25}}>Pedro Josue</h4>
                    <h4 style={{color: '#000000', fontSize: 25}}>Administrador</h4>
                    <br />
                <p className="mb-1" style={{color: '#00043a'}}>
                    <strong>Nombre:</strong>
                </p>
                <p className="mb-1" style={{color: '#F3940C'}}>
                    <strong>Apellido:</strong>
                </p>
                <p className="mb-1" style={{color: '#00043a'}}>
                    <strong>Username:</strong>
                </p>
                <p className="mb-1" style={{color: '#F3940C'}}>
                    <strong>AccountNumber:</strong>
                </p>
                <p className="mb-1" style={{color: '#00043a'}}>
                    <strong>DPI:</strong>
                </p>
                <p className="mb-1" style={{color: '#F3940C'}}>
                    <strong>Dirección:</strong>
                </p>
                <p className="mb-1" style={{color: '#00043a'}}>
                    <strong>Telefono:</strong>
                </p>
                <p className="mb-1" style={{color: '#F3940C'}}>
                    <strong>email:</strong>
                </p>
                <p className="mb-1" style={{color: '#00043a'}}>
                    <strong>contraseña:</strong>
                </p>
                <br />
                <div className="row">
                        <div className="form-group col-md-6">
                            <Link to=''>
                            <button className="btn text-light" type="submit" style={{backgroundColor: '#00043a', borderRadius: 100}}>EditarCuenta</button>
                            </Link>
                        </div>
                        <div className="form-group col-md-6">
                            <Link to=''>
                            <button className="btn text-light" type="submit" style={{backgroundColor: '#F3940C', borderRadius: 100}}>Ver Historial</button>
                            </Link>
                        </div>
                </div>
                        <br />
                        <h3 className="mb-1" style={{color: '#00043a'}}>Saldo: &#160; &#160; &#160; &#160; &#160; Q2000</h3>
                </div>
            </div>
        </>
    </>
  )
}
