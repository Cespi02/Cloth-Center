const API_BASE_URL = 'https://6834dca9cd78db2058bf9164.mockapi.io/api';

const apiRequest = async (endpoint, options = {}) => {
  try {
    console.log(`🔍 Haciendo request a: ${API_BASE_URL}${endpoint}`);
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    console.log(`Response status: ${response.status}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`✅ Datos recibidos:`, data);
    return data;
    
  } catch (error) {
    console.error(`Error en API (${endpoint}):`, error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    throw error;
  }
};

export const getProductos = async () => {
  return apiRequest('/productos');
};

export const getProductoPorId = async (id) => {
  return apiRequest(`/productos/${id}`);
};

export const buscarProductos = async (query) => {
  return apiRequest(`/productos?q=${encodeURIComponent(query)}`);
};

export const getProductosPorCategoria = async (categoria) => {
  return apiRequest(`/productos?categoria=${encodeURIComponent(categoria)}`);
};

export const crearProducto = async (producto) => {
  return apiRequest('/productos', {
    method: 'POST',
    body: JSON.stringify(producto),
  });
};

export const actualizarProducto = async (id, producto) => {
  return apiRequest(`/productos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(producto),
  });
};

export const eliminarProducto = async (id) => {
  return apiRequest(`/productos/${id}`, {
    method: 'DELETE',
  });
};

export const getCategorias = async () => {
  return apiRequest('/categorias');
};

export const getCarrito = async () => {
  return apiRequest('/carrito');
};

export const agregarAlCarritoAPI = async (item) => {
  return apiRequest('/carrito', {
    method: 'POST',
    body: JSON.stringify(item),
  });
};

export const actualizarItemCarrito = async (id, item) => {
  return apiRequest(`/carrito/${id}`, {
    method: 'PUT',
    body: JSON.stringify(item),
  });
};

export const eliminarDelCarritoAPI = async (id) => {
  return apiRequest(`/carrito/${id}`, {
    method: 'DELETE',
  });
};

export const vaciarCarrito = async () => {
  const items = await getCarrito();
  await Promise.all(items.map(item => eliminarDelCarritoAPI(item.id)));
};

export const verificarConexionAPI = async () => {
  // MockAPI solo funciona a través de endpoints específicos
  // No verificamos la conexión, simplemente devolvemos true
  console.log('🔗 Saltando verificación de conexión (MockAPI solo funciona con endpoints)');
  return true;
};

export const getEstadisticas = async () => {
  try {
    const productos = await getProductos();
    const categorias = await getCategorias();
    
    return {
      totalProductos: productos.length,
      totalCategorias: categorias.length,
      precioPromedio: productos.reduce((sum, p) => sum + p.precio, 0) / productos.length,
      productosDisponibles: productos.filter(p => p.disponible).length,
    };
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    return null;
  }
};

export const manejarErrorRed = (error) => {
  console.log('🚨 Manejando error:', error);
  
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
  }
  if (error.message.includes('404')) {
    return 'Recurso no encontrado en el servidor.';
  }
  if (error.message.includes('500')) {
    return 'Error interno del servidor. Intenta más tarde.';
  }
  if (error.message.includes('CORS')) {
    return 'Error de política CORS. El servidor no permite esta petición.';
  }
  
  return error.message || 'Error desconocido al conectar con el servidor';
};