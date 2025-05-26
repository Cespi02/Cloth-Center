import React from 'react';
import ProductoCard from './ProductoCard';

const ListaProductos = ({ productos, agregarAlCarrito }) => {
  return (
    <div className="container-fluid py-4" style={{backgroundColor: '#f8f9fa'}}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-dark">Nuestra Colección</h2>
          <p className="lead text-muted">Descubre nuestra selección de ropa de calidad</p>
        </div>
        
        {productos.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-search display-1 text-muted mb-4"></i>
            <h4 className="text-muted">No se encontraron productos</h4>
            <p className="text-muted">Intenta con una búsqueda diferente o explora nuestras categorías</p>
          </div>
        ) : (
          <>
            <div className="row mb-4">
              <div className="col">
                <p className="text-muted">
                  <i className="bi bi-grid me-2"></i>
                  Mostrando {productos.length} producto{productos.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            <div className="row g-4">
              {productos.map(producto => (
                <div key={producto.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                  <ProductoCard
                    producto={producto}
                    agregarAlCarrito={agregarAlCarrito}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ListaProductos;