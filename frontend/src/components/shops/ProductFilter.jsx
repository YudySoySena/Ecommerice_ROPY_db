import { Checkbox, FormControlLabel, FormGroup, Slider, Typography, Button } from '@mui/material';
import { useState } from 'react';

const ProductFilter = ({ onFilter }) => {
  // Agregué más categorías con base en los productos
  const [categories, setCategories] = useState({
    todos: true,
    camas: false,
    camarotes: false,
  });

  // Agregué un material adicional con base en los productos
  const [materials, setMaterials] = useState({
    metal: false,
    madera: false,
    metalmadera: false,
  });

  // Filtrado por rango de precios
  const [priceRange, setPriceRange] = useState([0, 1000]);

  // Filtro para aplicar descuentos
  const [hasDiscount, setHasDiscount] = useState(false);

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

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleDiscountChange = (event) => {
    setHasDiscount(event.target.checked);
  };

  // Se ajustan los filtros y se pasan al componente padre
  const handleFilterClick = () => {
    const filters = {
      categories: Object.keys(categories).filter((category) => categories[category]),
      materials: Object.keys(materials).filter((material) => materials[material]),
      priceRange,
      hasDiscount,
    };
    onFilter(filters);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h6">Filtrar Productos</Typography>

      {/* Filtros por categorías */}
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

      {/* Filtros por materiales */}
      <Typography variant="subtitle1" style={{ marginTop: '20px' }}>Materiales</Typography>
      <FormGroup>
        {Object.keys(materials).map((material) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={materials[material]}
                onChange={handleMaterialChange}
                name={material}
              />
            }
            label={material.charAt(0).toUpperCase() + material.slice(1)}
            key={material}
          />
        ))}
      </FormGroup>

      {/* Filtros por rango de precios */}
      <Typography variant="subtitle1" style={{ marginTop: '20px' }}>Rango de precio</Typography>
      <Slider
        value={priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        min={0}
        max={5000000}
        step={50}
      />

      {/* Filtro por descuento */}
      <FormControlLabel
        control={<Checkbox checked={hasDiscount} onChange={handleDiscountChange} />}
        label="Con Descuento"
        style={{ marginTop: '20px' }}
      />

      <Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={handleFilterClick}>
        Filtrar
      </Button>
    </div>
  );
};

export default ProductFilter;