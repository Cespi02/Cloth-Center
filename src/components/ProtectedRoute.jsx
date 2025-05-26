import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requireRole = null }) => {
  const { isAuthenticated, hasRole, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Verificando...</span>
          </div>
          <p>Verificando permisos...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  if (requireRole && !hasRole(requireRole)) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card border-warning">
              <div className="card-body text-center p-5">
                <i className="bi bi-shield-exclamation text-warning display-1 mb-4"></i>
                <h3 className="text-warning mb-3">Acceso Denegado</h3>
                <p className="text-muted mb-4">
                  No tienes permisos suficientes para acceder a esta sección.
                </p>
                <p className="text-muted">
                  <small>Rol requerido: <strong>{requireRole}</strong></small>
                </p>
                <button 
                  onClick={() => window.history.back()}
                  className="btn btn-outline-primary"
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Volver
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;