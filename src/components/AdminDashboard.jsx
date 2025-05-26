// components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getProductos } from '../services/api';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProductos: 0,
    productosDisponibles: 0,
    categorias: 0,
    precioPromedio: 0
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const productosData = await getProductos();
      setProductos(productosData);
      
      // Calcular estadísticas
      const categorias = [...new Set(productosData.map(p => p.categoria))];
      const disponibles = productosData.filter(p => p.disponible);
      const promedio = productosData.reduce((sum, p) => sum + p.precio, 0) / productosData.length;
      
      setStats({
        totalProductos: productosData.length,
        productosDisponibles: disponibles.length,
        categorias: categorias.length,
        precioPromedio: promedio
      });
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p>Cargando panel de administración...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      
      {/* Header */}
      <div className="row mb-4">
        <div className="col-md-6">
          <h1 className="h2 mb-0">
            <i className="bi bi-speedometer2 me-2 text-primary"></i>
            Panel de Administración
          </h1>
          <p className="text-muted">Gestión de la tienda de ropa</p>
        </div>
        <div className="col-md-6 text-md-end">
          <div className="d-flex align-items-center justify-content-md-end gap-3">
            <button 
              onClick={handleLogout}
              className="btn btn-outline-danger btn-sm"
            >
              <i className="bi bi-box-arrow-right me-1"></i>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card border-primary">
            <div className="card-body text-center">
              <i className="bi bi-box-seam display-4 text-primary mb-2"></i>
              <h3 className="text-primary">{stats.totalProductos}</h3>
              <p className="text-muted mb-0">Total Productos</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="card border-success">
            <div className="card-body text-center">
              <i className="bi bi-check-circle display-4 text-success mb-2"></i>
              <h3 className="text-success">{stats.productosDisponibles}</h3>
              <p className="text-muted mb-0">Disponibles</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="card border-info">
            <div className="card-body text-center">
              <i className="bi bi-tags display-4 text-info mb-2"></i>
              <h3 className="text-info">{stats.categorias}</h3>
              <p className="text-muted mb-0">Categorías</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="card border-warning">
            <div className="card-body text-center">
              <i className="bi bi-currency-dollar display-4 text-warning mb-2"></i>
              <h3 className="text-warning">${stats.precioPromedio.toFixed(2)}</h3>
              <p className="text-muted mb-0">Precio Promedio</p>
            </div>
          </div>
        </div>
      </div>


      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <i className="bi bi-list-ul me-2"></i>
                Productos Recientes
              </h5>
              <button className="btn btn-outline-primary btn-sm">
                <i className="bi bi-arrow-clockwise me-1"></i>
                Actualizar
              </button>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Producto</th>
                      <th>Categoría</th>
                      <th>Precio</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.slice(0, 5).map(producto => (
                      <tr key={producto.id}>
                        <td>#{producto.id}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <img 
                              src={producto.imagen} 
                              alt={producto.nombre}
                              className="rounded me-2"
                              width="40"
                              height="40"
                              style={{ objectFit: 'cover' }}
                            />
                            <div>
                              <div className="fw-bold">{producto.nombre}</div>
                              <small className="text-muted">Talla: {producto.talla}</small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="badge bg-secondary">{producto.categoria}</span>
                        </td>
                        <td className="fw-bold text-success">${producto.precio}</td>
                        <td>
                          <span className={`badge ${producto.disponible ? 'bg-success' : 'bg-danger'}`}>
                            {producto.disponible ? 'Disponible' : 'Agotado'}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm" role="group">
                            <button className="btn btn-outline-primary" title="Editar">
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button className="btn btn-outline-danger" title="Eliminar">
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;