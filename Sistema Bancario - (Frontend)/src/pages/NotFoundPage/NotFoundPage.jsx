import React from 'react'
import { Link } from 'react-router-dom'


export const NotFoundPage = () => {
  
    return (
      <>
        <div className="m-0 vh-100 row align-items-center justify-content-center" >
            <div className="text-center my-auto">
                <h1 className="display-1 fw-bold">404 😥</h1>
                <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
                <p className="lead">
                    The page you’re looking for doesn’t exist.
                  </p>
                <Link to='/' className="btn btn-primary">Regresar</Link>
            </div>
        </div>
      </>
    )
  }