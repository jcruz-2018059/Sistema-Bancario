import React from 'react'
import { Link } from 'react-router-dom';

export const WelcomePage = () => {
  const name = localStorage.getItem('name');
  const role = localStorage.getItem('role')
  return (
    <>
      <div className="container vh-100">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="px-4 pt-5 my-5 text-center">
              <img src="src\assets\LogoBanco.png" className="img-fluid" style={{ maxHeight: '200px' }} alt="Bienvenido" />
              <h3 className=" fw-bold ">¡Bienvenido, {name} 😀!</h3>
              <div className="col-lg-10 mx-auto">
                <p className="lead mb-4">¡Gracias por elegir nuestro sistema bancario para tus transacciones. Esperamos que tengas una experiencia increíble.</p>
                {
                  role === 'ADMIN' ? (
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                      <Link to={'deposits/add'} type="button" className="btn btn-primary btn-lg px-4 me-sm-3" style={{borderRadius: 0}}>Hacer Depósito</Link>
                    </div>
                  ) : <></>
                }
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

