import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Contacto = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });
  const [enviando, setEnviando] = useState(false);
  const [faqExpandido, setFaqExpandido] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    
    setTimeout(() => {
      alert('¡Mensaje enviado correctamente! Te responderemos dentro de 24 horas.');
      setFormData({ 
        nombre: '', 
        email: '', 
        telefono: '', 
        asunto: '', 
        mensaje: '' 
      });
      setEnviando(false);
    }, 2000);
  };

  const toggleFaq = (index) => {
    setFaqExpandido(faqExpandido === index ? null : index);
  };

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
          <li className="breadcrumb-item active">Contacto</li>
        </ol>
      </nav>

      <button 
        onClick={() => navigate('/')} 
        className="btn btn-outline-secondary mb-4"
      >
        <span className="material-icons me-2" style={{ fontSize: '16px', verticalAlign: 'middle' }}>arrow_back</span>
        Volver al inicio
      </button>

      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3">Contáctanos</h1>
        <p className="lead text-muted">
          ¿Tienes alguna pregunta, sugerencia o necesitas ayuda? 
          Estamos aquí para ayudarte.
        </p>
      </div>

      <div className="row g-5">
        <div className="col-lg-6">
          <div className="mb-5">
            <h3 className="mb-4">
              <span className="material-icons me-2 text-primary" style={{ fontSize: '24px', verticalAlign: 'middle' }}>info</span>
              Información de contacto
            </h3>
            
            <div className="row g-4">
              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <div className="bg-primary text-white rounded-circle p-3 me-3">
                    <span className="material-icons" style={{ fontSize: '20px' }}>location_on</span>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Dirección</h6>
                    <p className="text-muted mb-0">
                      Av. 123<br />
                      Calle 123<br />
                      Ciudad 123
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <div className="bg-success text-white rounded-circle p-3 me-3">
                    <span className="material-icons" style={{ fontSize: '20px' }}>phone</span>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Teléfono</h6>
                    <p className="text-muted mb-0">
                      +1 (555) 123-4567<br />
                      +1 (555) 765-4321
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <div className="bg-info text-white rounded-circle p-3 me-3">
                    <span className="material-icons" style={{ fontSize: '20px' }}>mail</span>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Email</h6>
                    <p className="text-muted mb-0">
                      info@clothcenter.com<br />
                      ventas@clothcenter.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <div className="bg-warning text-white rounded-circle p-3 me-3">
                    <span className="material-icons" style={{ fontSize: '20px' }}>schedule</span>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Horarios</h6>
                    <p className="text-muted mb-0">
                      Lun - Vie: 9:00 AM - 8:00 PM<br />
                      Sáb - Dom: 10:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h5 className="mb-3">
              <span className="material-icons me-2 text-primary" style={{ fontSize: '20px', verticalAlign: 'middle' }}>help</span>
              Preguntas frecuentes
            </h5>
            
            <div className="accordion-manual">
              <div className="card mb-2">
                <div className="card-header p-0">
                  <button 
                    className="btn btn-link w-100 text-start text-decoration-none p-3"
                    onClick={() => toggleFaq(1)}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <span>¿Cuáles son los métodos de pago aceptados?</span>
                      <span className="material-icons" style={{ 
                        fontSize: '20px', 
                        transform: faqExpandido === 1 ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s'
                      }}>
                        expand_more
                      </span>
                    </div>
                  </button>
                </div>
                {faqExpandido === 1 && (
                  <div className="card-body">
                    <p className="mb-0">Aceptamos tarjetas de crédito, débito, PayPal y transferencias bancarias.</p>
                  </div>
                )}
              </div>

              <div className="card mb-2">
                <div className="card-header p-0">
                  <button 
                    className="btn btn-link w-100 text-start text-decoration-none p-3"
                    onClick={() => toggleFaq(2)}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <span>¿Cuánto tiempo tarda la entrega?</span>
                      <span className="material-icons" style={{ 
                        fontSize: '20px', 
                        transform: faqExpandido === 2 ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s'
                      }}>
                        expand_more
                      </span>
                    </div>
                  </button>
                </div>
                {faqExpandido === 2 && (
                  <div className="card-body">
                    <p className="mb-0">El tiempo de entrega es de 2-3 días hábiles para envíos nacionales.</p>
                  </div>
                )}
              </div>

              {/* FAQ 3 */}
              <div className="card mb-2">
                <div className="card-header p-0">
                  <button 
                    className="btn btn-link w-100 text-start text-decoration-none p-3"
                    onClick={() => toggleFaq(3)}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <span>¿Puedo devolver un producto?</span>
                      <span className="material-icons" style={{ 
                        fontSize: '20px', 
                        transform: faqExpandido === 3 ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s'
                      }}>
                        expand_more
                      </span>
                    </div>
                  </button>
                </div>
                {faqExpandido === 3 && (
                  <div className="card-body">
                    <p className="mb-0">Sí, aceptamos devoluciones dentro de 30 días de la compra, siempre que el producto esté en condiciones originales.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <h5 className="mb-3">
              <span className="material-icons me-2 text-primary" style={{ fontSize: '20px', verticalAlign: 'middle' }}>share</span>
              Síguenos en redes sociales
            </h5>
            <div className="d-flex gap-3">
              <a href="#" className="btn btn-outline-primary" title="Facebook">
                <span className="material-icons" style={{ fontSize: '20px' }}>facebook</span>
              </a>
              <a href="#" className="btn btn-outline-danger" title="Instagram">
                <span className="material-icons" style={{ fontSize: '20px' }}>camera_alt</span>
              </a>
              <a href="#" className="btn btn-outline-info" title="Twitter">
                <span className="material-icons" style={{ fontSize: '20px' }}>alternate_email</span>
              </a>
              <a href="#" className="btn btn-outline-danger" title="YouTube">
                <span className="material-icons" style={{ fontSize: '20px' }}>play_circle</span>
              </a>
              <a href="#" className="btn btn-outline-success" title="WhatsApp">
                <span className="material-icons" style={{ fontSize: '20px' }}>chat</span>
              </a>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card shadow-lg border-0">
            <div className="card-body p-4">
              <h3 className="card-title mb-4">
                <span className="material-icons me-2 text-primary" style={{ fontSize: '24px', verticalAlign: 'middle' }}>mail</span>
                Enviar mensaje
              </h3>
              
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="nombre" className="form-label fw-bold">
                      <span className="material-icons me-1" style={{ fontSize: '16px', verticalAlign: 'middle' }}>person</span>
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label fw-bold">
                      <span className="material-icons me-1" style={{ fontSize: '16px', verticalAlign: 'middle' }}>mail</span>
                      Email *
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                  
                  <div className="col-12">
                    <label htmlFor="telefono" className="form-label fw-bold">
                      <span className="material-icons me-1" style={{ fontSize: '16px', verticalAlign: 'middle' }}>phone</span>
                      Teléfono (opcional)
                    </label>
                    <input
                      type="tel"
                      className="form-control form-control-lg"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div className="col-12">
                    <label htmlFor="asunto" className="form-label fw-bold">
                      <span className="material-icons me-1" style={{ fontSize: '16px', verticalAlign: 'middle' }}>subject</span>
                      Asunto *
                    </label>
                    <select
                      className="form-select form-select-lg"
                      id="asunto"
                      name="asunto"
                      value={formData.asunto}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecciona un asunto</option>
                      <option value="consulta-producto">Consulta sobre producto</option>
                      <option value="pedido">Estado de mi pedido</option>
                      <option value="devolucion">Devolución o cambio</option>
                      <option value="facturacion">Facturación</option>
                      <option value="colaboracion">Colaboración comercial</option>
                      <option value="sugerencia">Sugerencia o feedback</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  
                  <div className="col-12">
                    <label htmlFor="mensaje" className="form-label fw-bold">
                      <span className="material-icons me-1" style={{ fontSize: '16px', verticalAlign: 'middle' }}>message</span>
                      Mensaje *
                    </label>
                    <textarea
                      className="form-control form-control-lg"
                      id="mensaje"
                      name="mensaje"
                      rows="6"
                      value={formData.mensaje}
                      onChange={handleChange}
                      placeholder="Escribe tu mensaje aquí... Incluye todos los detalles relevantes para poder ayudarte mejor."
                      required
                    ></textarea>
                    <small className="text-muted">
                      Mínimo 10 caracteres ({formData.mensaje.length}/500)
                    </small>
                  </div>
                  
                  <div className="col-12">
                    <div className="form-check mb-3">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id="privacidad"
                        required
                      />
                      <label className="form-check-label" htmlFor="privacidad">
                        Acepto la <a href="#" className="text-decoration-none">política de privacidad</a> y el tratamiento de mis datos personales.
                      </label>
                    </div>
                  </div>
                  
                  <div className="col-12">
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg w-100 py-3"
                      disabled={enviando}
                    >
                      {enviando ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Enviando mensaje...
                        </>
                      ) : (
                        <>
                          <span className="material-icons me-2" style={{ fontSize: '16px', verticalAlign: 'middle' }}>send</span>
                          Enviar mensaje
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;