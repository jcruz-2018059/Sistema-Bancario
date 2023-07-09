import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const AccountPage = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const [user, setUser] = useState({});
  const [convertedBalance, setConvertedBalance] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  const currencies = ['AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BTC', 'BTN', 'BWP', 'BYN', 'BZD', 'CAD', 'CDF', 'CHF', 'CLP', 'CNY', 'COP', 'CRC', 'CUC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GGP', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'IMP', 'INR', 'IQD', 'IRR', 'ISK', 'JEP', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRO', 'MXN', 'USD'];
  const config = {
    headers: {
      Authorization: `${token}`
    }
  };
  let rol;
  if (role === 'ADMIN') {
    rol = 'Administrador';
  } else {
    rol = 'Cliente';
  }

  const getUser = async () => {
    try {
      const { data } = await axios.get('http://localhost:3200/user/getByLogin', config);
      if (data) {
        setUser(data.users);
      }
    } catch (err) {
      console.log(err);
      throw new Error('Error getting User');
    }
  };

  const convertCurrency = async () => {
    try {
      const response = await axios.get(`http://data.fixer.io/api/latest?access_key=f57682e58f3ed698f85a0c12580fbd3f&base=EUR&symbols=${selectedCurrency}`);
      console.log(response);

      const exchangeRate = 1 / response.data.rates[selectedCurrency];
      console.log(exchangeRate);
      const convertedAmount = (user.balance / (exchangeRate * 8.54)).toFixed(2);

      setConvertedBalance(convertedAmount);
    } catch (error) {
      console.log(error);
      // Manejar el error al obtener el tipo de cambio
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop: 80 }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-7 col-md-9">
              <div className="card">
                <div className="card-header bg-primary text-white rounded-0">
                  <h5 className="card-title mb-0">Mi cuenta</h5>
                </div>
                <div className="card-body p-4 p-md-5">
                  <div className="card-body">
                    <h4 className="fw-bolder">{user.name} {user.surname}</h4>
                    <h4 style={{ color: '#F3940C', fontSize: 25 }}>{rol}</h4>
                    <br />
                    <p className="mb-1" style={{ color: '#00043a' }}>
                      <strong>Nombre: </strong>
                      {user.name}
                    </p>
                    <p className="mb-1" style={{ color: '#00043a' }}>
                      <strong>Apellido: </strong>
                      {user.surname}
                    </p>
                    <p className="mb-1" style={{ color: '#00043a' }}>
                      <strong>Username: </strong>
                      {user.username}
                    </p>
                    <p className="mb-1" style={{ color: '#00043a' }}>
                      <strong>No. de cuenta: </strong>
                      {user.accountNumber}
                    </p>
                    <p className="mb-1" style={{ color: '#00043a' }}>
                      <strong>DPI: </strong>
                      {user.DPI}
                    </p>
                    <p className="mb-1" style={{ color: '#00043a' }}>
                      <strong>Dirección: </strong>
                      {user.address}
                    </p>
                    <p className="mb-1" style={{ color: '#00043a' }}>
                      <strong>Teléfono: </strong>
                      {user.phone}
                    </p>
                    <p className="mb-1" style={{ color: '#00043a' }}>
                      <strong>Correo: </strong>
                      {user.email}
                    </p>
                    <p className="mb-1" style={{ color: '#00043a' }}>
                      <strong>Nombre del trabajo: </strong>
                      {user.workName}
                    </p>
                    <br />
                    <h3 className="mb-3" style={{ color: '#00043a' }}>Saldo:  Q{user.balance}.00</h3>
                    {convertedBalance && (
                      <p className="mb-1 " style={{ color: '#00043a' }}>
                        Saldo convertido: {selectedCurrency} {convertedBalance}
                      </p>
                    )}
                    <div className="form-group d-flex">
                      <select className="form-select" value={selectedCurrency} onChange={handleCurrencyChange}>
                        {currencies.map((currency) => (
                          <option key={currency} value={currency}>
                            {currency}
                          </option>
                        ))}
                      </select>
                      <button className="btn btn-success" type="submit" onClick={convertCurrency} style={{marginLeft: '20px'}}>Convertir</button>
                    </div>
                    <br />
                    <br />
                    <div className="row">
                      <div className="form-group col-md-6 d-flex justify-content-start">
                        <Link to={`../account/update/${user._id}`}>
                          <button className="btn text-light" type="submit" style={{ backgroundColor: '#00043a', borderRadius: 0 }}>Editar Cuenta</button>
                        </Link>
                      </div>
                      <div className="form-group col-md-6 d-flex justify-content-end">
                        <Link to="../movements/history">
                          <button className="btn text-light" type="submit" style={{ backgroundColor: '#F3940C', borderRadius: 0 }}>Ver Historial</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};