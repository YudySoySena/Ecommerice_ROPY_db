import React, { useEffect, useState } from 'react';
import '../../pages/users/admin.css';

function StatisticsCards() {
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  // Llamada a la API de usuarios
  useEffect(() => {
    fetch('http://localhost:4000/Users')
      .then(response => response.json())
      .then(data => {
        setUserCount(data.length); // Cuenta la cantidad de usuarios
      })
      .catch(error => console.error('Error fetching the data:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:4000/Orders')
      .then(response => response.json())
      .then(data => {
        setOrderCount(data.length); // Cuenta la cantidad de usuarios
        const total = data.reduce((sum, order) => sum + order.total, 0);
        setTotalRevenue(total);
      })
      .catch(error => console.error('Error fetching the data:', error));
  }, []);

  const statistics = [
    { title: 'Usuarios Registrados', value: userCount },
    { title: 'Pedidos Realizados', value: orderCount },
    { title: 'Total de Ganancias', value: `$${totalRevenue}` },
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