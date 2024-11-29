// Importa la conexión a la base de datos desde el middleware express-myconnection

// Obtener todas las órdenes con sus items
const saltRounds = 10;

const getAllOrders = (req, res) => {
  req.getConnection((err, conn) => {
      if (err) {
          console.error(err);
          return res.status(500).send("Error de conexión a la base de datos.");
      }

      const query = `
SELECT 
    o.orderId, 
    o.userId, 
    o.total, 
    o.status, 
    o.orderDate, 
    o.deliveryDate, 
    o.shippingAddress, 
    CONCAT('[', 
        GROUP_CONCAT(
            CONCAT(
                '{"productId":', oi.productId, 
                ',"quantity":', oi.quantity, 
                ',"price":', oi.price, 
                ',"discount":', oi.discount, '}'
            )
        ), 
    ']') AS items
FROM orders o
LEFT JOIN orderitems oi ON o.orderId = oi.orderId
GROUP BY o.orderId;
      `;

      conn.query(query, (err, rows) => {
          if (err) {
              console.error(err);
              return res.status(500).send("Error al obtener los pedidos.");
          }
          res.json(rows);
      });
  });
};

export default { getAllOrders };
