import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductoCard = ({ producto, agregarAlCarrito }) => {
  const navigate = useNavigate();

  const irAlProducto = () => {
    navigate(`/producto/${producto.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); 
    agregarAlCarrito(producto);
  };

  return (
    <div className="card h-100 shadow-sm border-0 mx-2 mx-md-0 card-hover">

      <div 
        className="position-relative overflow-hidden" 
        style={{ cursor: 'pointer' }}
        onClick={irAlProducto} 
      >
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="card-img-top"
          style={{
            height: '280px',
            objectFit: 'cover',
            transition: 'transform 0.3s'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.parentElement.parentElement.style.transform = 'translateY(-5px)';
            e.target.parentElement.parentElement.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.parentElement.parentElement.style.transform = 'translateY(0)';
            e.target.parentElement.parentElement.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
          }}
        />

        <div 
          className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ 
            background: 'rgba(0,0,0,0)', 
            transition: 'background 0.3s',
            opacity: 0
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(0,0,0,0.3)';
            e.target.style.opacity = 1;
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'rgba(0,0,0,0)';
            e.target.style.opacity = 0;
          }}
        >
          <div className="text-center text-white">
            <i className="bi bi-eye fs-3 mb-2"></i>
            <div className="fw-bold">Ver detalles</div>
          </div>
        </div>

        <div className="position-absolute top-0 start-0 m-2">
          <span className="badge bg-primary">{producto.categoria}</span>
        </div>

        {producto.disponible && (
          <div className="position-absolute top-0 end-0 m-2">
            <span className="badge bg-success">Disponible</span>
          </div>
        )}
      </div>
      
      <div className="card-body d-flex flex-column p-3">
        <h5 
          className="card-title text-dark fw-bold mb-2" 
          style={{ cursor: 'pointer' }}
          onClick={irAlProducto}
        >
          {producto.nombre}
        </h5>
        
        <div className="mb-2">
          <div className="d-flex align-items-center text-muted mb-1">
            <i className="bi bi-tag me-1"></i>
            <small>Talla: {producto.talla}</small>
          </div>
          <div className="d-flex align-items-center text-muted">
            <i className="bi bi-palette me-1"></i>
            <small>{producto.colores?.length || 0} colores disponibles</small>
          </div>
        </div>

        <p className="card-text text-muted mb-3 flex-grow-1" style={{ fontSize: '0.9rem' }}>
          {producto.descripcion?.substring(0, 80)}...
        </p>

        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="h4 text-primary fw-bold mb-0">
              ${producto.precio}
            </span>
            <small className="text-muted">
              <i className="bi bi-truck me-1"></i>
              Envío gratis
            </small>
          </div>
          
          <div className="d-grid gap-2">
            <button
              onClick={handleAddToCart}
              className="btn btn-primary btn-hover"
            >
              <i className="bi bi-cart-plus me-2"></i>
              Agregar al Carrito
            </button>
            <button
              onClick={irAlProducto}
              className="btn btn-outline-primary btn-sm"
            >
              <i className="bi bi-info-circle me-1"></i>
              Ver detalles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductoCard;