import React from 'react'
import { Link } from "react-router-dom";

export const UpdateUserPage = () => {
  return (
    <>
            <div className='title'>
                <h1 className='text-center pt-5 pb-5' style={{color: '#F3940C'}}>Editar Usuario</h1>
            </div>
                <form>
                        <div className="form-group">
                            <label htmlFor="inputUsername">Username</label>
                            <input type="text" className="form-control" placeholder="Username" style={{borderColor: '#00043a', borderWidth: 4, borderRadius: 100 }}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputTelefono">Telefono</label>
                            <input type="number" className="form-control" placeholder="Telefono" style={{borderColor: '#00043a', borderWidth: 4, borderRadius: 100 }}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputCorreo">Correo</label>
                            <input type="text" className="form-control" placeholder="Correo" style={{borderColor: '#00043a', borderWidth: 4, borderRadius: 100 }}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputMontoA">Monto de Apertura</label>
                            <input type="text" className="form-control" placeholder="Monto de Apertura" style={{borderColor: '#00043a', borderWidth: 4, borderRadius: 100 }}/>
                        </div>
                    <br/>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <Link to=''>
                            <button className="btn text-light" type="submit" style={{backgroundColor: '#F3940C', borderRadius: 100}}>Editar</button>
                            </Link>
                        </div>
                        <div className="form-group col-md-3">
                            <Link to=''>
                            <button className="btn text-light" type="submit" style={{backgroundColor: '#00043a', borderRadius: 100}}>Cancelar</button>
                            </Link>
                        </div>
                    </div>
                </form>
            </>
  )
}
