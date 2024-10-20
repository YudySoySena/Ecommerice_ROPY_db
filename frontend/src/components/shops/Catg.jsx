import { Checkbox, FormControlLabel, FormGroup, Slider, Typography, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios'; // Si necesitas hacer llamadas a la API

const ProductFilter = ({ onFilter }) => {
  const [categories, setCategories] = useState({
    todos: true,
    camas: false,
    sillas: false,
    mesas: false,
  });

  const [materials, setMaterials] = useState({
    metal: false,
    madera: false,
    otros: false
  });

  const [colors, setColors] = useState({
    blanco: false,
    gris: false,
    maderaOscura: false
  });

  const [sizes, setSizes] = useState({
    size1: false,
    size2: false,
    size3: false,
  });

  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleCategoryChange = (event) => {
    setCategories({
      ...categories,
      [event.target.name]: event.target.checked,
    });
  };

  const handleMaterialChange = (event) => {
    setMaterials({
      ...materials,
      [event.target.name]: event.target.checked,
    });
  };

  const handleColorChange = (event) => {
    setColors({
      ...colors,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSizeChange = (event) => {
    setSizes({
      ...sizes,
      [event.target.name]: event.target.checked,
    });
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const applyFilters = () => {
    const filters = {
      categories: Object.keys(categories).filter((cat) => categories[cat]),
      materials: Object.keys(materials).filter((mat) => materials[mat]),
      colors: Object.keys(colors).filter((col) => colors[col]),
      sizes: Object.keys(sizes).filter((size) => sizes[size]),
      priceRange,
    };
    
    onFilter(filters);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h6">Filtrar Productos</Typography>

      {/* Categorías */}
      <Typography variant="subtitle1">Categorías</Typography>
      <FormGroup>
        {Object.keys(categories).map((category) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={categories[category]}
                onChange={handleCategoryChange}
                name={category}
              />
            }
            label={category.charAt(0).toUpperCase() + category.slice(1)}
            key={category}
          />
        ))}
      </FormGroup>

      {/* Materiales */}
      <Typography variant="subtitle1" style={{ marginTop: '20px' }}>Materiales</Typography>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={materials.metal} onChange={handleMaterialChange} name="metal" />}
          label="Metal"
        />
        <FormControlLabel
          control={<Checkbox checked={materials.madera} onChange={handleMaterialChange} name="madera" />}
          label="Madera"
        />
      </FormGroup>

      {/* Colores */}
      <Typography variant="subtitle1" style={{ marginTop: '20px' }}>Colores</Typography>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={colors.blanco} onChange={handleColorChange} name="blanco" />}
          label="Blanco"
        />
        <FormControlLabel
          control={<Checkbox checked={colors.gris} onChange={handleColorChange} name="gris" />}
          label="Gris"
        />
        <FormControlLabel
          control={<Checkbox checked={colors.maderaOscura} onChange={handleColorChange} name="maderaOscura" />}
          label="Madera Oscura"
        />
      </FormGroup>

      {/* Tamaños */}
      <Typography variant="subtitle1" style={{ marginTop: '20px' }}>Tamaños</Typography>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={sizes.size1} onChange={handleSizeChange} name="size1" />}
          label="1.2 x 2 m"
        />
        <FormControlLabel
          control={<Checkbox checked={sizes.size2} onChange={handleSizeChange} name="size2" />}
          label="1.5 x 2 m"
        />
        <FormControlLabel
          control={<Checkbox checked={sizes.size3} onChange={handleSizeChange} name="size3" />}
          label="2 x 2.5 m"
        />
      </FormGroup>

      {/* Rango de precio */}
      <Typography variant="subtitle1" style={{ marginTop: '20px' }}>Rango de precio</Typography>
      <Slider
        value={priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        min={0}
        max={2000}
        step={50}
      />
      <Typography>Desde: ${priceRange[0]} Hasta: ${priceRange[1]}</Typography>

      {/* Botón de aplicar filtro */}
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '20px' }}
        onClick={applyFilters}
      >
        Filtrar
      </Button>
    </div>
  );
};

export default ProductFilter;