export const MovementsCard = ({type, userOrigin, userDestination, amount, description, date, service}) => {
    return (
        <>
            <div className="card m-3 row g-0 rounded-0" style={{ maxWidth: '18rem', maxHeight: '24rem' }}>
                <div className="card-header bg-primary text-white rounded-0">
                {
                        type == 'TRANSFER' ? (
                            <h5 className="card-title mb-0">Transferencia</h5>
                        ) : type == 'CREDIT' ? (
                            <h5 className="card-title mb-0">Crédito</h5>
                        ) : <h5 className="card-title mb-0">Compra</h5>
                    }
                    
                </div>
                <div className="card-body">
                    <p className="mb-1">
                        <strong>Usuario Origen:</strong> {userOrigin}
                    </p>
                    {
                        type == 'PUCHARSE' ? (
                            <></>
                        ) : <p className="mb-1">
                                <strong>Usuario Destino:</strong> {userDestination}
                            </p>
                    }
                    <p className="mb-1">
                        <strong>Monto:</strong> Q{amount}.00
                    </p>
                    {
                        type == 'PUCHARSE' ? (
                            <p className="mb-1">
                                <strong>Servicio:</strong> {service}
                            </p>
                        ) : <p className="mb-1">
                                <strong>Descripción:</strong> {description}
                            </p>
                    }
                    <p className="mb-1">
                        <strong>Fecha:</strong> {new Date(date).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </>
    )
}
