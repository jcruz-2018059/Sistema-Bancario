import React from 'react'
import { Link } from 'react-router-dom'

export const DepositsCard = ({ id, name, surname, cuenta, amount, description, date, expirationDate, onClick }) => {
  const currentTime = new Date().getTime();
  const depositTime = new Date(date).getTime();
  const elapsedTimeInSeconds = (currentTime - depositTime) / 1000; // Convertir a segundos

  const shouldShowRevertButton = elapsedTimeInSeconds < 60 && description !== 'DEPOSIT REVERSED';

  return (
    <>
      <div className="card m-3 row g-0 rounded-0" style={{ maxWidth: '18rem', maxHeight: '24rem' }}>
        <div className="card-header bg-primary text-white rounded-0">
          <h5 className="card-title mb-0">Depósito</h5>
        </div>
        <div className="card-body">
          <p className="mb-1">
            <strong>Destinatario:</strong> {name} {surname}
          </p>
          <p className="mb-1">
            <strong>No cuenta:</strong> {cuenta}
          </p>
          <p className="mb-1">
            <strong>Monto:</strong> Q{amount}.00
          </p>
          <p className="mb-1">
            <strong>Descripción:</strong> {description}
          </p>
          <p className="mb-1">
            <strong>Fecha:</strong> {new Date(date).toLocaleDateString()}
          </p>

          {shouldShowRevertButton && (
            <Link onClick={onClick} className="btn btn-warning m-2 rounded-0">
              Revertir
            </Link>
          )}
        </div>
      </div>
    </>
  );
};