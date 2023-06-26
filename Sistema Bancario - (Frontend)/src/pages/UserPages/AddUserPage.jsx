import React from 'react'
import { Link } from "react-router-dom";

export const AddUserPage = () => {
  return (
    <>
            <div className='title'>
                <h1 className='text-center pt-5 pb-5' style={{color: '#00043a'}}>Agregar Usuario</h1>
            </div>
                <form>
                        <div className="form-group">
                            <label htmlFor="inputName">Name</label>
                            <input type="text" className="form-control" placeholder="Name" style={{borderColor: '#00043a', borderWidth: 4, borderRadius: 100 }}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputSurname">Surname</label>
                            <input type="text" className="form-control" placeholder="Surname" style={{borderColor: '#00043a', borderWidth: 4, borderRadius: 100 }}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputUsername">Username</label>
                            <input type="text" className="form-control" placeholder="Username" style={{borderColor: '#00043a', borderWidth: 4, borderRadius: 100 }}/>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputDPI">DPI</label>
                                <input type="number" className="form-control" placeholder="DPI" style={{borderColor: '#00043a', borderWidth: 4, borderRadius: 100 }}/>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputDirección">Dirección</label>
                                <input type="text" className="form-control" placeholder="Dirección" style={{borderColor: '#00043a', borderWidth: 4, borderRadius: 100 }}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputTelefono">Telefono</label>
                                <input type="number" className="form-control" placeholder="Telefono" style={{borderColor: '#00043a', borderWidth: 4, borderRadius: 100 }}/>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputCorreo">Correo</label>
                                <input type="email" className="form-control" placeholder="Correo" style={{borderColor: '#00043a', borderWidth: 4, borderRadius: 100 }}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputIngresosM">Ingresos Mensuales</label>
                                <input type="text" className="form-control" placeholder="Ingresos Mensuales" style={{borderColor: '#00043a', borderWidth: 4, borderRadius: 100 }}/>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputIngresosA">Ingresos de Apertura</label>
                                <input type="text" className="form-control" placeholder="Ingresos de Apertura" style={{borderColor: '#00043a', borderWidth: 4, borderRadius: 100 }}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword">Contraseña</label>
                            <input type="password" className="form-control" placeholder="Contraseña" style={{borderColor: '#00043a', borderWidth: 4, borderRadius: 100 }}/>
                        </div>
                    <br/>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <Link to=''>
                            <button className="btn text-light" type="submit" style={{backgroundColor: '#00043a', borderRadius: 100}}>Agregar</button>
                            </Link>
                        </div>
                        <div className="form-group col-md-3">
                            <Link to=''>
                            <button className="btn text-light" type="submit" style={{backgroundColor: '#F3940C', borderRadius: 100}}>Cancelar</button>
                            </Link>
                        </div>
                    </div>
                </form>
      </>
  )
}
