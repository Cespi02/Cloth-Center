import React from 'react';

const SpinnerDeCarga = ({ mensaje = "Cargando productos..." }) => {
  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
      <div className="text-center">
        <div className="spinner-border text-primary mb-4" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        
        <h4 className="text-primary mb-3">
          <i className="bi bi-bag-heart me-2"></i>
          Cloth Center
        </h4>
        
        <p className="text-muted mb-4">{mensaje}</p>
        
        <div className="d-flex justify-content-center gap-2">
          <div className="spinner-grow spinner-grow-sm text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <div className="spinner-grow spinner-grow-sm text-secondary" role="status" style={{ animationDelay: '0.1s' }}>
            <span className="visually-hidden">Cargando...</span>
          </div>
          <div className="spinner-grow spinner-grow-sm text-success" role="status" style={{ animationDelay: '0.2s' }}>
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinnerDeCarga;