import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [suscrito, setSuscrito] = useState(false);

  const handleSuscripcion = (e) => {
    e.preventDefault();
    if (email) {
      setSuscrito(true);
      setEmail('');
      setTimeout(() => setSuscrito(false), 3000);
    }
  };

  return (
    <footer className="bg-dark text-light py-5 mt-auto">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <div className="mb-4">
              <h5 className="fw-bold mb-3">
                <i className="bi bi-bag-heart me-2 text-primary"></i>
              Cloth Center
              </h5>
              <p className="text-light opacity-75 mb-3">
                Tu destino para la moda más actual. Ofrecemos calidad, estilo y comodidad 
                en cada prenda.
              </p>
              
              <div className="d-flex gap-3 mb-3">
                <a 
                  href="#" 
                  className="text-light opacity-75 fs-4 hover-effect"
                  style={{ transition: 'all 0.3s' }}
                  onMouseOver={(e) => {
                    e.target.style.opacity = '1';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.opacity = '0.75';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <i className="bi bi-facebook"></i>
                </a>
                <a 
                  href="#" 
                  className="text-light opacity-75 fs-4"
                  style={{ transition: 'all 0.3s' }}
                  onMouseOver={(e) => {
                    e.target.style.opacity = '1';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.opacity = '0.75';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <i className="bi bi-instagram"></i>
                </a>
                <a 
                  href="#" 
                  className="text-light opacity-75 fs-4"
                  style={{ transition: 'all 0.3s' }}
                  onMouseOver={(e) => {
                    e.target.style.opacity = '1';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.opacity = '0.75';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <i className="bi bi-twitter"></i>
                </a>
                <a 
                  href="#" 
                  className="text-light opacity-75 fs-4"
                  style={{ transition: 'all 0.3s' }}
                  onMouseOver={(e) => {
                    e.target.style.opacity = '1';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.opacity = '0.75';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <i className="bi bi-youtube"></i>
                </a>
              </div>

              <div className="d-flex align-items-center gap-3">
                <div className="badge bg-success px-3 py-2">
                  <i className="bi bi-award me-1"></i>
                  Calidad Premium
                </div>
                <div className="badge bg-primary px-3 py-2">
                  <i className="bi bi-truck me-1"></i>
                  Envío Seguro
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold mb-3 text-primary">Categorías</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <button 
                  onClick={() => navigate('/')}
                  className="btn btn-link text-light opacity-75 text-decoration-none p-0"
                  style={{ border: 'none' }}
                >
                  <i className="bi bi-chevron-right me-1"></i>
                  Camisetas
                </button>
              </li>
              <li className="mb-2">
                <button 
                  onClick={() => navigate('/')}
                  className="btn btn-link text-light opacity-75 text-decoration-none p-0"
                >
                  <i className="bi bi-chevron-right me-1"></i>
                  Pantalones
                </button>
              </li>
              <li className="mb-2">
                <button 
                  onClick={() => navigate('/')}
                  className="btn btn-link text-light opacity-75 text-decoration-none p-0"
                >
                  <i className="bi bi-chevron-right me-1"></i>
                  Vestidos
                </button>
              </li>
              <li className="mb-2">
                <button 
                  onClick={() => navigate('/')}
                  className="btn btn-link text-light opacity-75 text-decoration-none p-0"
                >
                  <i className="bi bi-chevron-right me-1"></i>
                  Chaquetas
                </button>
              </li>
              <li className="mb-2">
                <button 
                  onClick={() => navigate('/')}
                  className="btn btn-link text-light opacity-75 text-decoration-none p-0"
                >
                  <i className="bi bi-chevron-right me-1"></i>
                  Deportivo
                </button>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3 text-primary">Atención al Cliente</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <button 
                  onClick={() => navigate('/contacto')}
                  className="btn btn-link text-light opacity-75 text-decoration-none p-0"
                >
                  <i className="bi bi-chevron-right me-1"></i>
                  Centro de ayuda
                </button>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light opacity-75 text-decoration-none">
                  <i className="bi bi-chevron-right me-1"></i>
                  Seguimiento de pedido
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light opacity-75 text-decoration-none">
                  <i className="bi bi-chevron-right me-1"></i>
                  Devoluciones y cambios
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light opacity-75 text-decoration-none">
                  <i className="bi bi-chevron-right me-1"></i>
                  Guía de tallas
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light opacity-75 text-decoration-none">
                  <i className="bi bi-chevron-right me-1"></i>
                  Términos y condiciones
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light opacity-75 text-decoration-none">
                  <i className="bi bi-chevron-right me-1"></i>
                  Política de privacidad
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">

          </div>
        </div>

        <hr className="my-4 opacity-25" />

        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-0 text-light opacity-75">
              © 2024 Tienda de Ropa. Todos los derechos reservados.
            </p>
            <small className="text-light opacity-50">
              Diseñado con <i className="bi bi-heart-fill text-danger"></i> para nuestros clientes
            </small>
          </div>
          
          <div className="col-md-6 text-md-end">
            <div className="d-flex justify-content-md-end align-items-center gap-3 mt-3 mt-md-0">
              <span className="text-light opacity-75 me-2">
                <small>Métodos de pago:</small>
              </span>
              <div className="d-flex gap-2">
                <i className="bi bi-credit-card text-light opacity-75 fs-4" title="Tarjetas de crédito"></i>
                <i className="bi bi-paypal text-light opacity-75 fs-4" title="PayPal"></i>
                <span className="text-light opacity-75 fs-6 px-2 border rounded" title="Apple Pay">
                  <i className="bi bi-apple"></i>
                </span>
                <span className="text-light opacity-75 fs-6 px-2 border rounded" title="Google Pay">
                  <i className="bi bi-google"></i>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-12 text-center">
            <div className="d-flex justify-content-center align-items-center gap-4 flex-wrap">
              <div className="badge bg-outline-light text-light px-3 py-2">
                <i className="bi bi-shield-lock me-1"></i>
                SSL Seguro
              </div>
              <div className="badge bg-outline-light text-light px-3 py-2">
                <i className="bi bi-check-circle me-1"></i>
                Verificado
              </div>
              <div className="badge bg-outline-light text-light px-3 py-2">
                <i className="bi bi-award me-1"></i>
                Calidad Garantizada
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;