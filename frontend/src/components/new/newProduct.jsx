import React, { useState } from "react";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import axios from "axios";
import './new.css';

const NewProduct = ({ title }) => {
  const [file, setFile] = useState(null);

  // Estado para almacenar los valores del formulario
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discount: "",
    description: "",
    cover: "",
    material1: "",
    material2: "",
    colors: "",
    sizes: "" 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setFormData ({
        ...formData,
        [name]: value.split (',').map(item => item.trim())
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/ProductItems", formData);
      console.log("Producto creado:", response.data);
    } catch (error) {
      console.error("Error creando producto:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "/assets/person/DefaultProduct.jpg"
              }
              alt=""
              className="image"
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Cover Image: <DriveFolderUploadOutlined className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              <div className="formInput">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  name="Nombre"
                  placeholder="Nombre Producto"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label>Precio</label>
                <input
                  type="number"
                  name="precio"
                  placeholder="Precio Producto"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label>Discount</label>
                <input
                  type="text"
                  name="descuento"
                  placeholder="Descuento procentaje"
                  value={formData.discount}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label>Description</label>
                <input
                  type="text"
                  name="descuento"
                  placeholder="Descuento Porcentaje"
                  value={formData.discount}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label>Descripción</label>
                <texttarea
                  name="description"
                  placeholder="Producto descripción"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label>Description</label>
                <input
                  type="text"
                  name="cover"
                  placeholder="Image URL"
                  value={formData.cover}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formInput">
                <label>Material</label>
                <input
                  type="text"
                  name="material"
                  placeholder="Material"
                  value={formData.material}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formInput">
                <label>Segundo Material (Si tiene)</label>
                <input
                  type="text"
                  name="material2"
                  placeholder="Segundo Material"
                  value={formData.material2}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formInput">
                <label>Colors (Separados con comas)</label>
                <input
                  type="text"
                  name="colors"
                  placeholder="Color1, Color2, ..."
                  value={formData.colors}
                  onChange={handleArrayChange}
                />
              </div>
              <div className="formInput">
                <label>Medidas (Separados por comas)</label>
                <input
                  type="text"
                  name="medidas"
                  placeholder="Size1, Size2, ..."
                  value={formData.sizes}
                  onChange={handleArrayChange}
                />
              </div>

              <button type="submit">Añadir Productos</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;