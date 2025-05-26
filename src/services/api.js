const API_BASE_URL = 'https://6834dca9cd78db2058bf9164.mockapi.io/api'; // JSON Server


const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error en API (${endpoint}):`, error);
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
  try {
    const response = await fetch(API_BASE_URL);
    return response.ok;
  } catch (error) {
    return false;
  }
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
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return 'No se pudo conectar con el servidor. Verifica tu conexión.';
  }
  if (error.message.includes('404')) {
    return 'Recurso no encontrado.';
  }
  if (error.message.includes('500')) {
    return 'Error interno del servidor.';
  }
  return error.message || 'Error desconocido';
};