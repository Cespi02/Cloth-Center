import React from 'react';

const Carrito = ({ productos, visible, cerrarCarrito, eliminarDelCarrito }) => {
  const total = productos.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

  if (!visible) return null;

  return (
    <>
      <div 
        className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" 
        style={{ zIndex: 1040 }}
        onClick={cerrarCarrito}
      ></div>

      <div 
        className="position-fixed top-0 start-0 w-100 h-100 bg-white"
        style={{ 
          zIndex: 1050, 
          overflowY: 'auto'
        }}
      >
        <div className="bg-primary text-white p-3 sticky-top">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="mb-0">
                <i className="bi bi-cart3 me-2"></i>
                Carrito de Compras
              </h4>
              <button
                onClick={cerrarCarrito}
                className="btn btn-outline-light btn-sm"
                style={{ lineHeight: 1 }}
              >Atras
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="container-fluid p-4">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-4">
              {productos.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-cart-x display-4 text-muted mb-3"></i>
                  <h5 className="text-muted">Tu carrito está vacío</h5>
                  <p className="text-muted">Agrega algunos productos para comenzar</p>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    {productos.map((item, index) => (
                      <div 
                        key={`${item.id}-${item.talla}-${index}`} 
                        className="card mb-3 border-0 shadow-sm"
                      >
                        <div className="card-body p-3">
                          <div className="row g-3">
                            <div className="col-4 col-md-3">
                              <img
                                src={item.imagen}
                                alt={item.nombre}
                                className="img-fluid rounded"
                                style={{ height: '100px', objectFit: 'cover', width: '100%' }}
                              />
                            </div>
                            <div className="col-8 col-md-9">
                              <div className="d-flex justify-content-between align-items-start mb-2">
                                <h5 className="mb-1 fw-bold">{item.nombre}</h5>
                                <button
                                  onClick={() => eliminarDelCarrito(item.id, item.talla)}
                                  className="btn btn-outline-danger btn-sm"
                                  style={{ lineHeight: 1, padding: '0.25rem 0.5rem' }}
                                >
                                  <i className="bi bi-trash3"></i>
                                </button>
                              </div>
                              <div className="text-muted mb-2">
                                <div><strong>Talla:</strong> {item.talla}</div>
                                <div><strong>Cantidad:</strong> {item.cantidad}</div>
                              </div>
                              <div className="h5 text-primary fw-bold mb-0">
                                ${(item.precio * item.cantidad).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="card border-0 bg-light">
                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4 className="mb-0">Total:</h4>
                        <h3 className="mb-0 text-primary fw-bold">
                          ${total.toFixed(2)}
                        </h3>
                      </div>
                      
                      <div className="d-grid gap-3">
                        <button className="btn btn-success btn-lg py-3">
                          <i className="bi bi-credit-card me-2"></i>
                          Proceder al Pago
                        </button>
                        <button 
                          className="btn btn-outline-secondary btn-lg py-2"
                          onClick={cerrarCarrito}
                        >
                          <i className="bi bi-arrow-left me-2"></i>
                          Continuar Comprando
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carrito;