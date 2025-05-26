import React, { useState, createContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import ListaProductos from './components/ListaProductos';
import Carrito from './components/Carrito';
import ProductoDetalle from './components/ProductoDetalle';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import SpinnerDeCarga from './components/SpinnerDeCarga.jsx';
import MensajeDeError from './components/MensajeDeError.jsx';
import { getProductos, verificarConexionAPI, manejarErrorRed } from './services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

export const CarritoContext = createContext();

function App() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const [carritoVisible, setCarritoVisible] = useState(false);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    console.log('App iniciada - Cargando productos...');
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      console.log('Iniciando carga de productos...');
      setLoading(true);
      setError(null);
      
      const productosData = await getProductos();
      console.log('Productos cargados exitosamente:', productosData);
      setProductos(productosData);
      
    } catch (error) {
      console.error('Error cargando productos:', error);
      setError(manejarErrorRed(error));
    } finally {
      setLoading(false);
      console.log('Carga de productos finalizada');
    }
  };

  const reintentarCarga = () => {
    console.log('Reintentando carga de productos...');
    cargarProductos();
  };

  const agregarAlCarrito = (producto) => {
    console.log('Agregando al carrito:', producto);
    setCarrito(prev => {
      const productoExistente = prev.find(item => 
        item.id === producto.id && item.talla === producto.talla
      );
      
      if (productoExistente) {
        return prev.map(item => 
          item.id === producto.id && item.talla === producto.talla
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
    
    mostrarNotificacion(`${producto.nombre} agregado al carrito`);
  };

  const eliminarDelCarrito = (id, talla) => {
    console.log('Eliminando del carrito:', { id, talla });
    setCarrito(prev => prev.filter(item => !(item.id === id && item.talla === talla)));
  };

  const toggleCarrito = () => {
    console.log('Toggle carrito, visible:', !carritoVisible);
    setCarritoVisible(!carritoVisible);
  };

  const cantidadTotalCarrito = carrito.reduce((total, item) => total + item.cantidad, 0);

  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    producto.categoria.toLowerCase().includes(busqueda.toLowerCase())
  );

  const mostrarNotificacion = (mensaje) => {
    console.log('Mostrando notificación:', mensaje);
    const notification = document.createElement('div');
    notification.className = 'position-fixed top-0 end-0 m-3 alert alert-success alert-dismissible fade show';
    notification.style.zIndex = '9999';
    notification.innerHTML = `
      <span class="material-icons me-2" style="font-size: 16px; vertical-align: middle;">check_circle</span>
      ${mensaje}
      <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  };

  const carritoContextValue = {
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    carritoVisible,
    toggleCarrito,
    cantidadTotalCarrito
  };

  console.log('Estado actual:', {
    productosLength: productos.length,
    loading,
    error,
    carritoItems: carrito.length
  });

  return (
    <AuthProvider>
      <CarritoContext.Provider value={carritoContextValue}>
        <div className="App min-vh-100 d-flex flex-column">
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          
          <Header 
            cantidadCarrito={cantidadTotalCarrito} 
            toggleCarrito={toggleCarrito}
            busqueda={busqueda}
            setBusqueda={setBusqueda}
          />
          
          <main className="flex-grow-1">
            <Routes>
              <Route 
                path="/" 
                element={
                  loading ? (
                    <SpinnerDeCarga mensaje="Cargando productos..." />
                  ) : error && productos.length === 0 ? (
                    <MensajeDeError 
                      mensaje={error} 
                      onRetry={reintentarCarga}
                    />
                  ) : (
                    <ListaProductos 
                      productos={productosFiltrados} 
                      agregarAlCarrito={agregarAlCarrito}
                    />
                  )
                } 
              />
              
              <Route 
                path="/producto/:id" 
                element={
                  <ProductoDetalle 
                    productos={productos}
                    agregarAlCarrito={agregarAlCarrito}
                    loading={loading}
                  />
                } 
              />
              
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/login" element={<Login />} />
              
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requireRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          
          <Footer />
          
          <Carrito 
            productos={carrito}
            visible={carritoVisible}
            cerrarCarrito={() => setCarritoVisible(false)}
            eliminarDelCarrito={eliminarDelCarrito}
          />
        </div>
      </CarritoContext.Provider>
    </AuthProvider>
  );
}

export default App;