import React, { useState, useEffect } from "react";
// Asegúrate de tener el archivo de estilos importado

const Catg = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:4000/ProductItems")
      .then(response => response.json())
      .then(data => {
        setAllItems(data);

        // Group items by categories
        const categorizedItems = {
          "Todos los Productos": data,
          "Camarotes Campestres": data.filter(item => item.name.includes("Campestre")),
          "Camarotes de 3 Niveles": data.filter(item => item.name.includes("3 niveles")),
          "Camarotes Estudio": data.filter(item => item.name.includes("Estudio")),
        };

        setCategories(Object.keys(categorizedItems));
        setFilteredItems(categorizedItems["Todos los Productos"]);
      });
  }, []);

  useEffect(() => {
    // Apply price filter when category or price changes
    const applyFilters = () => {
      const min = parseFloat(minPrice) || 0;
      const max = parseFloat(maxPrice) || Infinity;
      const itemsToFilter = selectedCategory ? filteredItems[selectedCategory] : allItems;

      const filtered = itemsToFilter.filter(item => item.price >= min && item.price <= max);
      setFilteredItems(filtered);
    };

    applyFilters();
  }, [minPrice, maxPrice, selectedCategory, allItems]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const itemsToDisplay = category === "Todos los Productos" ? allItems : allItems.filter(item => item.category === category);
    setFilteredItems(itemsToDisplay);
  };

  return (
    <div className='container'>
      <div className='sidebar'>
        <div className='chead d_flex'>
          <h1>Categorías de Camarotes</h1>
        </div>
        <div className='category-list'>
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryChange(category)}
              className={selectedCategory === category ? 'active' : ''}
            >
              {category}
            </button>
          ))}
        </div>
        <div className='price-filter'>
          <label>Filtrar por precio: </label>
          <input
            id="minPrice"
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            id="maxPrice"
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <button onClick={() => setFilteredItems(filteredItems)}>Filtrar</button>
        </div>
      </div>
      <div className='main-content'>
        {selectedCategory && (
          <div className='item-list'>
            {filteredItems.map((item, index) => (
              <div className='box f_flex' key={index}>
                <img src={item.cover} alt={item.name} />
                <span>{item.name}</span>
                <span>${item.price}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Catg;