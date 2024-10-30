import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  
  // Estados comunes para ambos pasos
  const [email, setEmail] = useState('');
  const [nuevaContraseña, setNuevaContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [mensajeTipo, setMensajeTipo] = useState('');
  const [tokenValido, setTokenValido] = useState(false);
  const [loading, setLoading] = useState(false);

  // Efecto para verificar el token en caso de restablecimiento de contraseña
  useEffect(() => {
    const verificarToken = async () => {
      if (token) {
        try {
          const response = await fetch(`http://localhost:8081/restablecer/${token}`);
          if (!response.ok) throw new Error('Token inválido o expirado');
          setTokenValido(true);
          setMensaje('Token válido. Puede establecer una nueva contraseña.');
          setMensajeTipo('success');
        } catch (error) {
          setMensaje(error.message);
          setMensajeTipo('error');
          setTokenValido(false);
        }
      }
    };
    verificarToken();
  }, [token]);

  // Función para manejar el envío de correo de restablecimiento
  const manejarEnvioCorreo = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8081/restablecer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMensaje('Se ha enviado un enlace para restablecer tu contraseña.');
        setMensajeTipo('success');
      } else {
        const errorData = await response.json();
        setMensaje(errorData.message || 'Error al enviar el enlace. Intenta nuevamente.');
        setMensajeTipo('error');
      }
    } catch (err) {
      setMensaje('Error al enviar el enlace. Intenta nuevamente.');
      setMensajeTipo('error');
    } finally {
      setLoading(false);
      setTimeout(() => {
        setMensaje('');
        setMensajeTipo('');
      }, 5000);
    }
  };

  // Función para manejar el restablecimiento de la contraseña
  const manejarRestablecimientoContraseña = async (e) => {
    e.preventDefault();
    if (nuevaContraseña.length < 6) {
      setMensaje('La contraseña debe tener al menos 6 caracteres.');
      setMensajeTipo('error');
      return;
    }

    if (nuevaContraseña !== confirmarContraseña) {
      setMensaje('Las contraseñas no coinciden.');
      setMensajeTipo('error');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8081/restablecer/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nuevaContraseña }),
      });

      if (response.ok) {
        setMensaje('Contraseña restablecida con éxito.');
        setMensajeTipo('success');
        setTimeout(() => navigate('/login'), 1000);
      } else {
        setMensaje('Error al restablecer la contraseña.');
        setMensajeTipo('error');
      }
    } catch (error) {
      setMensaje(error.message);
      setMensajeTipo('error');
    }
  };

  const styles = {
    container: { /* estilos compartidos */ },
    formContainer: { /* estilos compartidos */ },
    input: { /* estilos compartidos */ },
    button: { /* estilos compartidos */ },
    notification: {
      marginTop: '20px',
      color: mensajeTipo === 'success' ? 'green' : 'red',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1>{token ? 'Restablecer Contraseña' : 'Recuperar Contraseña'}</h1>
        {mensaje && <div style={styles.notification}>{mensaje}</div>}

        {token ? (
          // Formulario para restablecer la contraseña
          tokenValido && (
            <form onSubmit={manejarRestablecimientoContraseña}>
              <input
                type="password"
                placeholder="Nueva contraseña"
                value={nuevaContraseña}
                onChange={(e) => setNuevaContraseña(e.target.value)}
                style={styles.input}
                required
              />
              <input
                type="password"
                placeholder="Confirmar nueva contraseña"
                value={confirmarContraseña}
                onChange={(e) => setConfirmarContraseña(e.target.value)}
                style={styles.input}
                required
              />
              <button type="submit" style={styles.button}>
                Restablecer Contraseña
              </button>
            </form>
          )
        ) : (
          // Formulario para enviar correo de recuperación
          <form onSubmit={manejarEnvioCorreo}>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar Enlace'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;