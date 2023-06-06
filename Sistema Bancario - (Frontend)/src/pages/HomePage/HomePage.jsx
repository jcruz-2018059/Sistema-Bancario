import React from "react";
import { Link } from "react-router-dom";
import "../HomePage/HomePage.css";

export const HomePage = () => {
  return (
    <>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');
      </style>
      <header
        className="masthead"
        style={{ paddingTop: "6.5rem", backgroundColor: "#00043a" }}
      >
        <div className="container px-5">
          <div className="row gx-5 align-items-center">
            <div className="col-lg-6">
              <div className="mb-5 mb-lg-0 text-center text-lg-start">
                <h1 className="display-1 lh-1 mb-3" id="hero-title">
                  La Mejor Banca Virtual
                </h1>
                <p className="lead fw-normal mb-5" id="hero-text">
                Más que un banco, somos una comunidad financiera que te respalda en cada paso
                </p>
                <div className="d-flex flex-column flex-lg-row align-items-center">
                  <Link
                    to='/login'
                    type="button"
                    className="btn btn-primary btn-lg px-4 me-md-2 rounded-0"
                  >
                    Iniciar Sesión
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="masthead-device-mockup">
                <div className="device-wrapper">
                  <div
                    className="device"
                    data-device="iPhoneX"
                    data-orientation="portrait"
                    data-color="black"
                  >
                    <div className="">
                      <img
                        className="img-fluid"
                        src="\src\assets\HeroImage.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 py-5  text-center" style={{ backgroundColor: '#F4F4F4' }}>
        <h1 className="display-5 fw-bold mb-3" style={{color:"#00043a" }}>Organiza tu finanzas</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead">Creando oportunidades financieras para un futuro próspero. En Sistema Bancario, estamos aquí para impulsar tus sueños</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to='/Login'>
            <button type="button" className="btn btn-primary btn-lg px-4 gap-3">Empieza ya</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container px-4 py-5" id="featured-3">
        <h2 className="pb-2 border-bottom">Nuestros beneficios</h2>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="feature col">
            <img className="img-fluid pb-3" src="\src\assets\Check1.png" width={"90px"}/>
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">

            </div>
            <h3 className="fs-2">Ahorra </h3>
            <p>Con la plataforma, puedes comparar buscar precios de diferentes hoteles en tiempo real y realizar reservas con solo unos clics.</p>
          </div>
          <div className="feature col">
          <img className="img-fluid pb-3" src="\src\assets\Check2.png" width={"90px"}/>
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
            </div>
            <h3 className="fs-2">Facilidad de uso</h3>
            <p>La aplicación es intuitiva y facil de usar, podras realizar tus reservaciones con rapidez y confianza. Reservar un hotel nunca fue tan fácil.</p>
          </div>
          <div className="feature col">
          <img className="img-fluid pb-3" src="\src\assets\Check3.png" width={"90px"}/>
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
            </div>
            <h3 className="fs-2">Disfruta</h3>
            <p>Vive las mejores experiencias y disfruta cada momento en el mejor lugar, busca tu hotel preferido y haz tu reservación ahora.</p>
          </div>
        </div>
      </div>

      <footer className="text-center  text-white" style={{backgroundColor: "#0d0c1d"}}>
        <div class="container py-5">
          <div class="row">
            <div class="">
              <h4>Sistema Bancario</h4>
              <p>Tu confianza es nuestro compromiso. En Sistema Bancario, nos esforzamos por brindar servicios financieros seguros y confiables</p>
            </div>
          </div>
          
        </div>
        <div className="container-fluid">
        <div className="row pt-3" style={{backgroundColor: "#000610 "}}>

            <div className="col-md-6"></div>
            <p>© Sistema bancario 2023. All Rights Reserved.</p>
        </div>
        </div>
      </footer>
    </>
  );
};
