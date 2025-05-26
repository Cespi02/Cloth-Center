// services/api.js

// Configuración de la API
const API_BASE_URL = 'http://localhost:3000'; // JSON Server
// const API_BASE_URL = 'https://tu-api-real.com/api'; // Para API real

// Función helper para hacer peticiones
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

// ===== PRODUCTOS =====

// Obtener todos los productos
export const getProductos = async () => {
  return apiRequest('/productos');
};

// Obtener un producto por ID
export const getProductoPorId = async (id) => {
  return apiRequest(`/productos/${id}`);
};

// Buscar productos (por nombre o categoría)
export const buscarProductos = async (query) => {
  return apiRequest(`/productos?q=${encodeURIComponent(query)}`);
};

// Filtrar productos por categoría
export const getProductosPorCategoria = async (categoria) => {
  return apiRequest(`/productos?categoria=${encodeURIComponent(categoria)}`);
};

// Crear nuevo producto (para admin)
export const crearProducto = async (producto) => {
  return apiRequest('/productos', {
    method: 'POST',
    body: JSON.stringify(producto),
  });
};

// Actualizar producto (para admin)
export const actualizarProducto = async (id, producto) => {
  return apiRequest(`/productos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(producto),
  });
};

// Eliminar producto (para admin)
export const eliminarProducto = async (id) => {
  return apiRequest(`/productos/${id}`, {
    method: 'DELETE',
  });
};

// ===== CATEGORÍAS =====

// Obtener todas las categorías
export const getCategorias = async () => {
  return apiRequest('/categorias');
};

// ===== CARRITO (si quieres persistir en servidor) =====

// Obtener carrito
export const getCarrito = async () => {
  return apiRequest('/carrito');
};

// Agregar item al carrito
export const agregarAlCarritoAPI = async (item) => {
  return apiRequest('/carrito', {
    method: 'POST',
    body: JSON.stringify(item),
  });
};

// Actualizar item del carrito
export const actualizarItemCarrito = async (id, item) => {
  return apiRequest(`/carrito/${id}`, {
    method: 'PUT',
    body: JSON.stringify(item),
  });
};

// Eliminar item del carrito
export const eliminarDelCarritoAPI = async (id) => {
  return apiRequest(`/carrito/${id}`, {
    method: 'DELETE',
  });
};

// Vaciar carrito
export const vaciarCarrito = async () => {
  const items = await getCarrito();
  await Promise.all(items.map(item => eliminarDelCarritoAPI(item.id)));
};

// ===== UTILIDADES =====

// Verificar si la API está disponible
export const verificarConexionAPI = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    return response.ok;
  } catch (error) {
    return false;
  }
};

// Obtener estadísticas (ejemplo de endpoint más complejo)
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

// Función para manejar errores de red
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