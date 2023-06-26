import React from "react";

export const CardMoves = ()=>{
    return(
        <>
        <h3 style={{color: '#00043a', textAlign: 'left'}}>Cliente</h3>
        <br/>
        <h2 style={{color: '#F3940C', textAlign: 'left'}}>Eduardo Pedro</h2>

      <div className="row">
        <div className="col-sm-6">
            <div className="card" style={{ maxWidth: '18rem', maxHeight: '24rem', borderColor: '#00043a', borderWidth: 4, borderRadius: 20 }}>
                <div className="card-body">
                <p className="mb-1" style={{color: '#00043a'}}>
                    <strong>Cuenta Origen:</strong>
                </p>
                <p className="mb-1" style={{color: '#F3940C'}}>
                    <strong>Cuenta Destino:</strong>
                </p>
                <p className="mb-1" style={{color: '#00043a'}}>
                    <strong>Tipo:</strong>
                </p>
                <p className="mb-1" style={{color: '#F3940C'}}>
                    <strong>Monto:</strong>
                </p>
                <p className="mb-1" style={{color: '#00043a'}}>
                    <strong>Fecha:</strong>
                </p>
                </div>
            </div>
        </div>

        <div className="col-sm-6">
            <div className="card" style={{ maxWidth: '18rem', maxHeight: '24rem', borderColor: '#00043a', borderWidth: 4, borderRadius: 20 }}>
                <div className="card-body">
                <p className="mb-1" style={{color: '#00043a'}}>
                    <strong>Cuenta Origen:</strong>
                </p>
                <p className="mb-1" style={{color: '#F3940C'}}>
                    <strong>Cuenta Destino:</strong>
                </p>
                <p className="mb-1" style={{color: '#00043a'}}>
                    <strong>Tipo:</strong>
                </p>
                <p className="mb-1" style={{color: '#F3940C'}}>
                    <strong>Monto:</strong>
                </p>
                <p className="mb-1" style={{color: '#00043a'}}>
                    <strong>Fecha:</strong>
                </p>
                </div>
            </div>
        </div>
    </div>
        </>
    )
}