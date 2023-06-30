import React from 'react'
import './Login.css'
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../Index";

export const LoginPage = () => {
    const navigate = useNavigate();
    const { setLoggedIn, loggedIn, setDataUser } = useContext(AuthContext);
    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        console.log(form);
    };

    const login = async (e) => {
        try {
            e.preventDefault();
            const { data } = await axios.post("http://localhost:3200/user/login", form);
            if (data.token) {
                console.log(data.token)
                setLoggedIn(true);
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.userLogged.role);
                localStorage.setItem('name', data.userLogged.name);
                localStorage.setItem('id', data.userLogged.id);
                setDataUser({
                    name: data.userLogged.name,
                    username: data.userLogged.username,
                    role: data.userLogged.role,
                });
                Swal.fire({
                    title: data.message || '¡Bienvenido!',
                    icon: 'success',
                    timer: 4000
                })
                navigate('/start')
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                title: err.response.data.message || 'Error login',
                icon: 'error',
                timer: 4000
            })

            throw new Error("Error login failed");
        }
    };
    return (

        <>
            <style>
                @import
                url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');
            </style>
            <div className="container " style={{ paddingTop: "150px", maxWidth: "900px", paddingBottom: "50px" }}>
                <div className="row justify-content-center shadow m-3">
                    <div className="col-md-6 p-md-5">
                        <div className="text-center">
                            <h4 className="mt-1 mb-5 pb-1 pt-5" id='iniciar'>Iniciar Sesión</h4>
                        </div>

                        <form>
                            <p>Agregue sus datos</p>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form2Example11">Usuario</label>
                                <input onChange={handleChange} type="email" id="name" className="form-control" placeholder="Usuario" name='username'/>
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form2Example22">Contraseña</label>
                                <input onChange={handleChange} placeholder="Contraseña" type="password" id="form2Example22" className="form-control" name='password' />
                            </div>

                            <div className="text-center pt-1 mb-5 row">
                                <button onClick={(e)=> login(e)} className="btn btn-primary col rounded-0" type="button">Iniciar sesión</button>
                            </div>

                            <div className="d-flex align-items-center justify-content-center pb-4">
                                <p className="mb-0 me-2">¿No tienes una cuenta?</p>
                                <Link to=''>
                                    <button type="button" className="btn btn-outline-primary rounded-0">Registrarse</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <img src="\src\assets\login.jpg" alt="Imagen de inicio de sesión" className="img-fluid" />
                    </div>
                </div>
            </div>
        </>

    )
}
