import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import { UserContext } from "./UserContext";
import Validation from './loginValidation'

const Login = ({ setIsAuthenticated }) => {
  const [values, setValues] = useState({
    Email: '',
    Password: '',
    redirectTo: "profile",
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { setContextUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Manejo de inputs y actualizaciones de los valores
  const handleInput = (event) => {
    const { name, value } = event.target;
    console.log(`Input changed: ${name} = ${value}`);  // Verifica los cambios en la consola
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));
  };  
  

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const validationErrors = Validation(values);
    setErrors(validationErrors);
    
    if (!errors.Email && !errors.Password) {
      setLoading(true); // Inicia la carga
      axios.post('http://localhost:8081/login', values)
    .then(res => {
        setLoading(false);
        if (res.status === 200) { // Asegúrate de que la respuesta sea exitosa
            const user = res.data; // Aquí esperas que se devuelva el objeto de usuario
            handleLogin(user);
        } else {
            alert("No existe el usuario, ¿Quieres crear una cuenta?");
        }
    })
    .catch(err => {
        setLoading(false);
        console.error(err);
        alert("Error en el servidor. Intente nuevamente.");
    });
    }
  };
  
  const handleLogin = (user) => {
    // Verificamos si el objeto de usuario existe y si tiene un rol definido
    if (user) {
        // Manejo del rol de administrador
        if (user.Rol === "Administrador") {
            setContextUser(user); // Almacenamos el usuario en el contexto
            setIsAuthenticated(true); // Marcamos al usuario como autenticado
            navigate("/admin"); // Redirigimos al panel de administrador
        } else if (user.Rol === "Usuario") {
            // Manejo del rol de usuario normal
            setContextUser(user); // Almacenamos el usuario en el contexto
            setIsAuthenticated(true); // Marcamos al usuario como autenticado

            // Redirigir según la opción seleccionada en el formulario
            if (values.redirectTo === "profile" && user.id) {
                navigate(`/user/${user.id}`); // Redirigir al perfil del usuario
            } else {
                navigate("/"); // Redirigir a la página principal
            }
        } else {
            // Manejo de roles no reconocidos
            console.error("Rol no reconocido:", user.Rol);
            alert("Rol de usuario no reconocido. Por favor, contacta al administrador.");
        }
    } else {
        // Si no hay un usuario, se muestra un mensaje de error
        console.error("No se pudo obtener la información del usuario.");
        alert("Error al iniciar sesión. Usuario no encontrado.");
    }
};  

  return (
    <div className="card-body">
      <div className="hold-transition login-page">
        <div className="login-box">
          <b>Iniciar Sesión</b>
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <input
                type="email"
                name="Email"
                autoComplete="email"
                className="form-control"
                placeholder="Correo"
                value={values.Email}
                onChange={handleInput}
              />
              {errors.Email && <span style={{ color: 'red' }} className="text-danger">{errors.Email}</span>}
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                name="Password"
                autoComplete="current-password"
                className="form-control"
                placeholder="Contraseña"
                value={values.Password}
                onChange={handleInput}
              />
              {errors.Password && <span style={{ color: 'red' }} className="text-danger">{errors.Password}</span>}
            </div>

            <div className="input-group mb-3">
              <label>Redirigir a:</label>
              <select
                name="redirectTo"
                className="form-control"
                value={values.redirectTo}
                onChange={handleInput}
              >
                <option value="profile">Perfil</option>
                <option value="mainPage">Página Principal</option>
              </select>
            </div>

            <div className="row">
              <div className="col-4">
                <button type="submit" className="btn btn-primary btn-block">
                  Iniciar Sesión
                </button>
              </div>
            </div>
          </form>
          <p className="mb-1">
            <Link to="/forgot_password">¿Olvidaste tu contraseña?</Link>
          </p>
          <p className="mb-0">
            <Link to="/register" className="text-center">
              ¿Aún no estás registrado?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;