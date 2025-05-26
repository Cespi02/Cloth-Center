import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            
            <div className="text-center mb-4">
              <Link to="/" className="text-decoration-none">
                <i className="bi bi-bag-heart display-4 text-primary"></i>
                <h2 className="text-dark mt-2">Tienda de Ropa</h2>
              </Link>
              <p className="text-muted">Inicia sesión para continuar</p>
            </div>

            <div className="card shadow">
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      <i className="bi bi-envelope me-2"></i>
                      Email
                    </label>
                    <input
                      type="email"
                      className={`form-control ${error ? 'is-invalid' : ''}`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="admin@tienda.com"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      <i className="bi bi-lock me-2"></i>
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className={`form-control ${error ? 'is-invalid' : ''}`}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="admin123"
                      required
                      disabled={loading}
                    />
                  </div>

                  {error && (
                    <div className="alert alert-danger py-2 mb-3">
                      <i className="bi bi-exclamation-circle me-2"></i>
                      {error}
                    </div>
                  )}

                  <div className="d-grid mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Iniciando sesión...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-box-arrow-in-right me-2"></i>
                          Iniciar Sesión
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="text-center mt-3">
              <Link to="/" className="text-decoration-none text-muted">
                <i className="bi bi-arrow-left me-1"></i>
                Volver a la tienda
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;