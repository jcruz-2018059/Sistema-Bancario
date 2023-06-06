import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Nabvar } from '../components/Navbar'

export const MenuPage = () => {
  const role = localStorage.getItem('role')
  return (
    <>
      <div className=' vh-100'>
        <div className='d-flex'>
          <div className=" d-flex flex-column flex-shrink-0 p-3  " style={{ width: "280px", height: '100vh', backgroundColor: '#00032F' }}>
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
              <svg className="bi pe-none me-2" width="40" height="32"><use xlinkHref="#bootstrap" /></svg>
              <span className="fs-4">Menu</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
              <li className="nav-item">
                <Link  className="nav-link text-white" aria-current="page">
                  <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home" /></svg>
                  Inicio
                </Link>
              </li>
              {
                role == 'ADMIN' ? (
                  <li className="nav-item">
                    <Link to='users' className="nav-link text-white" aria-current="page">
                      <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home" /></svg>
                      Usuarios
                    </Link>
                  </li>
                ) : <></>
              }
              {
                role == 'ADMIN' ? (
                  <li>
                    <Link to='products' className="nav-link text-white">
                      <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#table" /></svg>
                      Productos
                    </Link>
                  </li>
                ) : <></>
              }
              {
                role == 'ADMIN' ? (
                  <li>
                    <Link to='deposits' className="nav-link text-white">
                      <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#table" /></svg>
                      Depósitos
                    </Link>
                  </li>
                ) : <></>
              }
              {
                role == 'ADMIN' ? (
                  <li>
                    <Link to='account' className="nav-link text-white">
                      <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#people-circle" /></svg>
                      Mi cuenta
                    </Link>
                  </li>
                ) : <></>
              }
            </ul>
            <hr />
          </div>

          <div className='w-100' >
            <Nabvar></Nabvar>
            <Outlet></Outlet>
          </div>


        </div>
      </div>
    </>
  )
}
