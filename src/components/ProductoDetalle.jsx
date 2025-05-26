import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductoPorId } from '../services/api';

const ProductoDetalle = ({ agregarAlCarrito, productos = [] }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    cargarProducto();
  }, [id]);

  const cargarProducto = async () => {
    try {
      setLoading(true);
      setError(null);

      const productoData = await getProductoPorId(id);
      setProducto(productoData);
      
    } catch (error) {
      console.error('Error cargando producto desde API:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAgregarCarrito = () => {
    if (producto && agregarAlCarrito) {
      for (let i = 0; i < cantidad; i++) {
        agregarAlCarrito(producto);
      }

      const notification = document.createElement('div');
      notification.className = 'position-fixed top-0 end-0 m-3 alert alert-success alert-dismissible fade show';
      notification.style.zIndex = '9999';
      notification.innerHTML = `
        <span class="material-icons me-2" style="font-size: 16px; vertical-align: middle;">check_circle</span>
        ${cantidad} ${producto.nombre}${cantidad > 1 ? 's' : ''} agregado${cantidad > 1 ? 's' : ''} al carrito
        <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
      `;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 3000);
    }
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p>Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <span className="material-icons display-1 text-warning mb-4">warning</span>
          <h2>Producto no encontrado</h2>
          <p className="text-muted mb-4">
            {error || 'El producto que buscas no existe o ha sido removido.'}
          </p>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            <span className="material-icons me-2" style={{ fontSize: '16px', verticalAlign: 'middle' }}>arrow_back</span>
            Volver al catálogo
          </button>
        </div>
      </div>
    );
  }

  const disponible = (producto.stock || 0) > 0;
  const stockMaximo = Math.min(producto.stock || 0, 10);

  return (
    <div className="container py-5">
      <nav className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <button 
              onClick={() => navigate('/')} 
              className="btn btn-link p-0 text-decoration-none"
            >
              <span className="material-icons me-1" style={{ fontSize: '16px', verticalAlign: 'middle' }}>home</span>
              Inicio
            </button>
          </li>
          <li className="breadcrumb-item">
            <span className="text-muted">{producto.categoria}</span>
          </li>
          <li className="breadcrumb-item active">{producto.nombre}</li>
        </ol>
      </nav>

      <button 
        onClick={() => navigate('/')} 
        className="btn btn-outline-secondary mb-4"
      >
        <span className="material-icons me-2" style={{ fontSize: '16px', verticalAlign: 'middle' }}>arrow_back</span>
        Volver a productos
      </button>

      <div className="row g-5">
        <div className="col-md-6">
          <div className="sticky-top" style={{ top: '100px' }}>
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="img-fluid rounded shadow-lg w-100"
              style={{ maxHeight: '600px', objectFit: 'cover' }}
            />
            
            <div className="mt-3 text-center">
              <span className={`badge fs-6 px-3 py-2 ${disponible ? 'bg-success' : 'bg-danger'}`}>
                <span className={`material-icons me-1`} style={{ fontSize: '16px', verticalAlign: 'middle' }}>
                  {disponible ? 'check_circle' : 'cancel'}
                </span>
                {disponible ? `En Stock (${producto.stock})` : 'Agotado'}
              </span>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <span className="badge bg-primary fs-6 me-2">{producto.categoria}</span>
            <span className="badge bg-secondary fs-6">Talla {producto.talla}</span>
          </div>

          <h1 className="display-5 fw-bold mb-3">{producto.nombre}</h1>
          

          <div className="mb-4">
            <span className="display-4 text-primary fw-bold">${producto.precio}</span>
          </div>

          <div className="mb-4">
            <h5>Descripción</h5>
            <p className="text-muted lead">{producto.descripcion}</p>
          </div>

          {producto.colores && producto.colores.length > 0 && (
            <div className="mb-4">
              <h6>Colores disponibles:</h6>
              <div className="d-flex gap-2 flex-wrap">
                {producto.colores.map((color, index) => (
                  <span key={index} className="badge bg-outline-secondary px-3 py-2">
                    {color}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mb-4">
            <h6>Cantidad:</h6>
            <div className="d-flex align-items-center gap-3">
              <div className="input-group" style={{ width: '140px' }}>
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  disabled={cantidad <= 1 || !disponible}
                >
                  <span className="material-icons" style={{ fontSize: '16px' }}>remove</span>
                </button>
                <input 
                  type="number" 
                  className="form-control text-center"
                  value={cantidad}
                  onChange={(e) => setCantidad(Math.max(1, Math.min(stockMaximo, parseInt(e.target.value) || 1)))}
                  min="1"
                  max={stockMaximo}
                  disabled={!disponible}
                />
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => setCantidad(Math.min(stockMaximo, cantidad + 1))}
                  disabled={cantidad >= stockMaximo || !disponible}
                >
                  <span className="material-icons" style={{ fontSize: '16px' }}>add</span>
                </button>
              </div>
              <span className="text-muted">
                Total: <strong className="text-primary">${(producto.precio * cantidad).toFixed(2)}</strong>
              </span>
            </div>
            {disponible && producto.stock <= 5 && (
              <small className="text-warning">
                <span className="material-icons me-1" style={{ fontSize: '14px', verticalAlign: 'middle' }}>warning</span>
                ¡Solo quedan {producto.stock} unidades!
              </small>
            )}
          </div>

          <div className="d-grid gap-3 mb-4">
            <button
              onClick={handleAgregarCarrito}
              className="btn btn-primary btn-lg py-3"
              disabled={!disponible}
            >
              <span className="material-icons me-2" style={{ fontSize: '16px', verticalAlign: 'middle' }}>
                {disponible ? 'add_shopping_cart' : 'block'}
              </span>
              {disponible 
                ? `Agregar ${cantidad} ${cantidad === 1 ? 'unidad' : 'unidades'} al Carrito`
                : 'Producto Agotado'
              }
            </button>
            
            <div className="row g-2">
              <div className="col-6">
                <button className="btn btn-outline-danger w-100">
                  <span className="material-icons me-2" style={{ fontSize: '16px', verticalAlign: 'middle' }}>favorite</span>
                  Favoritos
                </button>
              </div>
              <div className="col-6">
                <button className="btn btn-outline-secondary w-100">
                  <span className="material-icons me-2" style={{ fontSize: '16px', verticalAlign: 'middle' }}>share</span>
                  Compartir
                </button>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-sm-6">
              <h6>
                <span className="material-icons me-2" style={{ fontSize: '16px', verticalAlign: 'middle' }}>texture</span>
                Material
              </h6>
              <p className="text-muted">{producto.material}</p>
            </div>
            <div className="col-sm-6">
              <h6>
                <span className="material-icons me-2" style={{ fontSize: '16px', verticalAlign: 'middle' }}>water_drop</span>
                Cuidados
              </h6>
              <p className="text-muted">{producto.cuidados}</p>
            </div>
          </div>

          <div className="card border-success">
            <div className="card-body">
              <h6 className="card-title text-success">
                <span className="material-icons me-2" style={{ fontSize: '16px', verticalAlign: 'middle' }}>local_shipping</span>
                Información de envío
              </h6>
              <ul className="list-unstyled mb-0">
                <li className="mb-2">
                  <span className="material-icons text-success me-2" style={{ fontSize: '16px', verticalAlign: 'middle' }}>check_circle</span>
                  Envío gratis en pedidos superiores a $50
                </li>
                <li className="mb-2">
                  <span className="material-icons text-info me-2" style={{ fontSize: '16px', verticalAlign: 'middle' }}>schedule</span>
                  Entrega en 2-3 días hábiles
                </li>
                <li className="mb-2">
                  <span className="material-icons text-warning me-2" style={{ fontSize: '16px', verticalAlign: 'middle' }}>autorenew</span>
                  Devoluciones gratuitas dentro de 30 días
                </li>
                <li>
                  <span className="material-icons text-primary me-2" style={{ fontSize: '16px', verticalAlign: 'middle' }}>security</span>
                  Compra 100% segura
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;