import React, { useEffect, useState } from 'react';
import '../../pages/users/admin.css';

function StatisticsCards() {
  const [userCount, setUserCount] = useState(0);

  // Llamada a la API de usuarios
  useEffect(() => {
    fetch('http://localhost:4000/Users')
      .then(response => response.json())
      .then(data => {
        setUserCount(data.length); // Cuenta la cantidad de usuarios
      })
      .catch(error => console.error('Error fetching the data:', error));
  }, []);

  const statistics = [
    { title: 'Usuarios Registrados', value: userCount },
    { title: 'Pedidos Realizados', value: 0 },
    { title: 'Total de Ganancias', value: '0' },
  ];

  return (
    <div className="cards-container">
      {statistics.map((stat, index) => (
        <div key={index} className="card">
          <h2>{stat.title}</h2>
          <p>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

export default StatisticsCards;