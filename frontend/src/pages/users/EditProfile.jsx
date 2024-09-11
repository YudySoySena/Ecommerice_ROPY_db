import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import './editProfile.css';

const EditProfile = () => {
  const { id } = useParams(); // Obtener el id del usuario desde la URL
  const { contextUser, setContextUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    Nombre: '',
    Email: '',
    Direccion: '',
    Telefono: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/Users/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (contextUser && contextUser.id === id) {
      fetchUserData();
    } else {
      navigate('/'); // Redirigir si no es el mismo usuario
    }
  }, [id, contextUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/Users/${id}`, formData);
      setContextUser({ ...contextUser, ...formData }); // Actualiza el contexto
      navigate(`/user/${id}`); // Redirigir al perfil después de guardar los cambios
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('Error al actualizar el perfil. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="edit-profile">
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <label>Nombre:</label>
          <input
            type="text"
            name="Nombre"
            className="form-control"
            value={formData.Nombre}
            onChange={handleChange}
          />
        </div>
        <div className="input-group mb-3">
          <label>Correo:</label>
          <input
            type="email"
            name="Email"
            className="form-control"
            value={formData.Email}
            onChange={handleChange}
          />
        </div>
        <div className="input-group mb-3">
          <label>Dirección:</label>
          <input
            type="text"
            name="Direccion"
            className="form-control"
            value={formData.Direccion}
            onChange={handleChange}
          />
        </div>
        <div className="input-group mb-3">
          <label>Teléfono:</label>
          <input
            type="text"
            name="Telefono"
            className="form-control"
            value={formData.Telefono}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditProfile;