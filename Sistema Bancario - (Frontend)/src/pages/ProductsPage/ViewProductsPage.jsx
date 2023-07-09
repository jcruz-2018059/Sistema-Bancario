import { ProductsCard } from '../../components/Cards/ProductsCard'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';

export const ViewProductsPage = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role')
  const [service, setServices] = useState([{}])
  const config = {
    headers: {
      Authorization: `${token}`
    }
  }

  const getServices = async () => {
    try {
      const { data } = await axios('http://localhost:3200/service/getServices', config);
      if (data)
        setServices(data);
      console.log(data);
    } catch (err) {
      console.log(err);
      throw new Error('Error getting events');
    }
  }
  
  const deleteProduct = async (id) => {
    try {
      Swal.fire({
        title: '¿Estás seguro de eliminar este Producto?',
        icon: 'warning',
        showConfirmButton: false,
        showDenyButton: true,
        showCancelButton: true,
        denyButtonText: `Sí, eliminar`,
      }).then(async (result) => {
        if (result.isDenied) {
          const { data } = await axios.delete(`http://localhost:3200/service/deleteService/${id}`, config);
          console.log(data);
          Swal.fire({
            title: data.message || 'Evento eliminado.',
            icon: 'info',
            timer: 4000
          })
          getServices()
        }
      })
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: err.response.data.message || `Error eliminando evento :(`,
        icon: 'error',
        timer: 4000
      })
    }
  }

  useEffect(() => getServices, []);
  return (
    <>
    <div className='vh-100'>
    <div className='container'>
        <div className="container-fluid text-white text-center" style={{ marginTop: '8%', marginBottom: '20px', backgroundImage: 'linear-gradient(0.25turn, #007bff, #00043a)' }}>
          <div className="container py-4">
            <h1 className="mb-1">Productos</h1>
            <p>Gestionar productos</p>
          </div>
        </div>

        {
          role == 'ADMIN' ? (
            <div className='mb-1 d-flex justify-content-between'>
              <Link to='add' className='ms-auto'>
                <button className='btn btn-primary rounded-0'>Agregar Productos</button>
              </Link>
            </div>
          ) : <></>
        }
        <div className='row g-0 justify-content-center'>
          {
            service.length === 0 ? (
              <>
              <div className='container justify-content-center align-items-center' style={{borderColor: 'red', height: 300, display: 'flex'}}>
                <p className='fw-bold'  style={{color: '#a6a6a6'}} >No hay productos disponibles por el momento.</p>
              </div>
              </>
            ) : 
            service.map(({ _id, name, description, amount }, i) => {
              return (
                <ProductsCard
                  key={i}
                  id={_id}
                  name={name}
                  description={description}
                  amount={amount}
                  onClick={() => deleteProduct(_id)}
                >
                </ProductsCard>

              )
            })
          }
        </div>
      </div>
    </div>
    </>
  )
}
