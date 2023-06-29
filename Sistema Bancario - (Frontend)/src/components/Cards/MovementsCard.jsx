export const MovementsCard = ({type, userOrigin, userDestination, amount, description, date}) => {
    return (
        <>
            <div className="card m-3 row g-0 rounded-0" style={{ maxWidth: '18rem', maxHeight: '24rem' }}>
                <div className="card-header bg-primary text-white rounded-0">
                    <h5 className="card-title mb-0">Movimiento</h5>
                </div>
                <div className="card-body">
                    {
                        type == 'TRANSFER' ? (
                            <p className="mb-1">
                                <strong>Tipo:</strong> TRANSFERENCIA
                            </p>
                        ) : type == 'CREDIT' ? (
                            <p className="mb-1">
                                <strong>Tipo:</strong> CRÉDITO
                            </p>
                        ) : <p className="mb-1">
                                <strong>Tipo:</strong> COMPRA
                            </p>
                    }
                    
                    <p className="mb-1">
                        <strong>Usuario Origen:</strong> {userOrigin}
                    </p>
                    <p className="mb-1">
                        <strong>Usuario Destino:</strong> {userDestination}
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
                </div>
            </div>
        </>
    )
}
