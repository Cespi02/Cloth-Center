import React from 'react';

const MensajeDeError = ({ mensaje, onRetry }) => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card border-danger">
            <div className="card-body text-center p-5">
              <i className="bi bi-exclamation-triangle-fill text-danger display-1 mb-4"></i>
              
              <h3 className="text-danger mb-3">¡Oops! Algo salió mal</h3>
              
              <p className="text-muted mb-4">
                {mensaje || 'Hubo un problema al cargar los datos. Por favor, intenta nuevamente.'}
              </p>
              
              <div className="d-grid gap-3">
                <button 
                  onClick={onRetry}
                  className="btn btn-primary btn-lg"
                >
                  <i className="bi bi-arrow-clockwise me-2"></i>
                  Reintentar
                </button>
                
                <button 
                  onClick={() => window.location.reload()}
                  className="btn btn-outline-secondary"
                >
                  <i className="bi bi-arrow-counterclockwise me-2"></i>
                  Recargar página
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MensajeDeError;