import { v2 as cloudinary } from "cloudinary";

const createPromotion = async (req, res) => {
  const {
    product_id,
    promotion_type,
    discount_percentage,
    start_date,
    end_date,
    description,
    is_active,
  } = req.body;

  try {
    const newPromotion = {
      product_id,
      promotion_type,
      discount_percentage,
      start_date,
      end_date,
      description,
      is_active: is_active ? 1 : 0, // Convertir a booleano
    };

    req.getConnection((err, conn) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error de conexión a la base de datos.");
      }

      const query = "INSERT INTO promotions SET ?";
      conn.query(query, newPromotion, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error al crear la promoción.");
        }

        res.status(201).json({ id: result.insertId, ...newPromotion });
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error al crear la promoción.");
  }
};

const getAllPromotions = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error de conexión a la base de datos.");
    }

    const query = `
      SELECT 
        p.id,
        pi.name, 
        tp.name, 
        p.discount_percentage, 
        p.start_date, 
        p.end_date, 
        p.description, 
        p.is_active 
      FROM promotions p 
      JOIN type_promotion tp ON tp.id = p.promotion_type
      JOIN productitems pi ON pi.id = p.product_id;`;

    conn.query(query, (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error al obtener las promociones.");
      }
      res.json(rows);
    });
  });
};

const getAllPromotionsFront = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error de conexión a la base de datos.");
    }

    const query = `
SELECT 
    p.id AS product_id,
    p.name AS product_name,
    p.cover AS product_image,
    p.price AS original_price,
    ROUND(p.price - (p.price * pr.discount_percentage / 100), 2) AS discounted_price,
    pr.discount_percentage AS discount,
    p.rating AS product_rating,
    p.stock AS product_stock,
    pr.start_date AS promotion_start,
    pr.end_date AS promotion_end
FROM 
    productitems p
JOIN 
    promotions pr ON p.promotion_id = pr.id
WHERE 
    pr.is_active = 1
    AND CURDATE() BETWEEN pr.start_date AND pr.end_date
    AND p.stock > 0;
`;

    conn.query(query, (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error al obtener las promociones.");
      }
      res.json(rows);
    });
  });
};

const updatePromotion = (req, res) => {
  const { id } = req.params;
  const {
    product_id,
    promotion_type,
    discount_percentage,
    start_date,
    end_date,
    description,
    is_active,
  } = req.body;

  req.getConnection((err, conn) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error de conexión a la base de datos.");
    }

    const query = `
            UPDATE promotions
            SET product_id = ?, promotion_type = ?, discount_percentage = ?, start_date = ?, end_date = ?, description = ?, is_active = ?
            WHERE id = ?;
        `;

    conn.query(
      query,
      [
        product_id,
        promotion_type,
        discount_percentage,
        start_date,
        end_date,
        description,
        is_active ? 1 : 0,
        id,
      ],
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error al actualizar la promoción.");
        }
        res.status(200).send("Promoción actualizada exitosamente.");
      }
    );
  });
};

const deletePromotion = (req, res) => {
  const { id } = req.params;

  req.getConnection((err, conn) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error de conexión a la base de datos.");
    }

    const query = "DELETE FROM promotions WHERE id = ?;";
    conn.query(query, [id], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error al eliminar la promoción.");
      }
      res.status(200).send("Promoción eliminada exitosamente.");
    });
  });
};

export default {
  createPromotion,
  getAllPromotions,
  getAllPromotionsFront,
  updatePromotion,
  deletePromotion,
};
