import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = ({ cantidadCarrito, toggleCarrito, busqueda, setBusqueda }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        
        <div className="d-flex align-items-center">
          <button 
            className="navbar-brand fw-bold me-0 btn btn-link text-white text-decoration-none border-0 bg-transparent p-0"
            onClick={() => navigate('/')}
            style={{ fontSize: '1.25rem' }}
          >
            <span className="material-icons me-2" style={{ fontSize: '24px', verticalAlign: 'middle' }}>shopping_bag</span>
            Cloth Center
          </button>
        </div>

        {location.pathname === '/' && (
          <div className="mx-auto d-none d-md-block" style={{ width: "100%", maxWidth: "400px" }}>
            <div className="input-group">
              <span className="input-group-text bg-secondary border-secondary">
                <span className="material-icons text-white" style={{ fontSize: '16px' }}>search</span>
              </span>
              <input
                type="text"
                className="form-control bg-secondary border-secondary text-white"
                placeholder="Buscar productos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="d-flex align-items-center gap-2">
          {location.pathname === '/' && (
            <div className="d-md-none me-2">
              <button 
                className="btn btn-outline-light btn-sm"
                type="button" 
                onClick={() => {
                  const searchCollapse = document.getElementById('mobileSearch');
                  if (searchCollapse) {
                    searchCollapse.classList.toggle('show');
                  }
                }}
              >
                <span className="material-icons" style={{ fontSize: '16px' }}>search</span>
              </button>
            </div>
          )}
          
          <button
            className={`btn ${location.pathname === '/contacto' ? 'btn-light' : 'btn-outline-light'} d-none d-sm-inline-block`}
            onClick={() => navigate('/contacto')}
          >
            <span className="material-icons me-1" style={{ fontSize: '16px', verticalAlign: 'middle' }}>mail</span>
            <span className="d-none d-lg-inline">Contacto</span>
          </button>

          <button
            className={`btn ${location.pathname === '/contacto' ? 'btn-light' : 'btn-outline-light'} d-sm-none`}
            onClick={() => navigate('/contacto')}
          >
            <span className="material-icons" style={{ fontSize: '16px' }}>mail</span>
          </button>

          <button
            className="btn btn-primary position-relative"
            onClick={toggleCarrito}
          >
            <span className="material-icons me-2" style={{ fontSize: '16px', verticalAlign: 'middle' }}>shopping_cart</span>
            <span className="d-none d-sm-inline">Carrito</span>
            {cantidadCarrito > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cantidadCarrito}
                <span className="visually-hidden">productos en carrito</span>
              </span>
            )}
          </button>

          {isAuthenticated() ? (
            <div className="dropdown position-relative">
              <button 
                className="btn btn-outline-light dropdown-toggle d-flex align-items-center"
                type="button" 
                onClick={toggleDropdown}
                style={{ border: dropdownOpen ? '1px solid #0d6efd' : '' }}
              >
                <span className="material-icons me-2" style={{ fontSize: '20px', verticalAlign: 'middle' }}>account_circle</span>
                <span className="d-none d-md-inline">{user?.nombre || 'Usuario'}</span>
              </button>
              

              {dropdownOpen && (
                <>

                  <div 
                    className="position-fixed top-0 start-0 w-100 h-100" 
                    style={{ zIndex: 1000 }}
                    onClick={closeDropdown}
                  ></div>
                  
                  <ul 
                    className="dropdown-menu dropdown-menu-end show position-absolute"
                    style={{ 
                      zIndex: 1001,
                      right: 0,
                      top: '100%',
                      minWidth: '200px'
                    }}
                  >
                    <li>
                      <h6 className="dropdown-header">
                        <span className="material-icons me-2" style={{ fontSize: '16px', verticalAlign: 'middle' }}>person</span>
                        {user?.email}
                      </h6>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    
                    {user?.role === 'admin' && (
                      <>
                        <li>
                          <button 
                            className="dropdown-item"
                            onClick={() => {
                              navigate('/admin');
                              closeDropdown();
                            }}
                          >
                            <span className="material-icons me-2" style={{ fontSize: '16px', verticalAlign: 'middle' }}>admin_panel_settings</span>
                            Panel Admin
                          </button>
                        </li>
                        <li><hr className="dropdown-divider" /></li>
                      </>
                    )}
                    
                    <li>
                      <button 
                        className="dropdown-item"
                      >
                        <span className="material-icons me-2" style={{ fontSize: '16px', verticalAlign: 'middle' }}>person</span>
                        Mi Perfil
                      </button>
                    </li>
                    <li>
                      <button 
                        className="dropdown-item"
                        onClick={closeDropdown}
                      >
                        <span className="material-icons me-2" style={{ fontSize: '16px', verticalAlign: 'middle' }}>shopping_bag</span>
                        Mis Pedidos
                      </button>
                    </li>
                    <li>
                      <button 
                        className="dropdown-item"
                        onClick={closeDropdown}
                      >
                        <span className="material-icons me-2" style={{ fontSize: '16px', verticalAlign: 'middle' }}>settings</span>
                        Configuración
                      </button>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button 
                        className="dropdown-item text-danger"
                        onClick={handleLogout}
                      >
                        <span className="material-icons me-2" style={{ fontSize: '16px', verticalAlign: 'middle' }}>logout</span>
                        Cerrar Sesión
                      </button>
                    </li>
                  </ul>
                </>
              )}
            </div>
          ) : (
            <button
              className="btn btn-outline-light"
              onClick={() => navigate('/login')}
            >
              <span className="material-icons me-1" style={{ fontSize: '16px', verticalAlign: 'middle' }}>login</span>
              <span className="d-none d-md-inline">Iniciar Sesión</span>
            </button>
          )}
        </div>
      </div>

      {location.pathname === '/' && (
        <div className="collapse d-md-none" id="mobileSearch">
          <div className="container-fluid pt-2 pb-3">
            <div className="input-group">
              <span className="input-group-text bg-secondary border-secondary">
                <span className="material-icons text-white" style={{ fontSize: '16px' }}>search</span>
              </span>
              <input
                type="text"
                className="form-control bg-secondary border-secondary text-white"
                placeholder="Buscar productos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;