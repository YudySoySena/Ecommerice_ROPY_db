import { v2 as cloudinary } from "cloudinary";

const createProduct = async (req, res) => {
  try {
    // Verificar si se proporciona la imagen
    if (!req.files || !req.files.file) {
      return res.status(400).send("La imagen del producto es requerida.");
    }
    const productImage = req.files.file;
    const {
      name,
      price,
      description,
      stock,
      discount,
      material,
      material2,
      rating,
      colors,
      promotion,
    } = req.body;

    // Obtener conexión a la base de datos
    req.getConnection(async (err, conn) => {
      if (err) {
        console.error("Error de conexión a la base de datos:", err);
        return res.status(500).send("Error de conexión a la base de datos.");
      }

      try {
        // Subir imagen a Cloudinary
        const uploadResult = await cloudinary.uploader.upload(
          productImage.tempFilePath,
          {
            folder: "Products",
          }
        );

        // Consultar IDs relacionados
        const query = `
                    SELECT 
                        c.id AS colorId, 
                        m.id AS materialId, 
                        pr.id AS promotionId
                    FROM colors c
                    LEFT JOIN materials m ON m.name IN (?)
                    LEFT JOIN promotions pr ON pr.name IN (?)
                    WHERE c.name IN (?);
                `;

        const [relatedIds] = await conn.query(query, [
          [material],
          [promotion],
          [colors],
        ]);

        // Verificar resultados de la consulta
        if (!relatedIds || relatedIds.length === 0) {
          return res
            .status(400)
            .send(
              "No se encontraron relaciones válidas para colores, materiales o promociones."
            );
        }

        // Preparar datos para insertar el producto
        const newProduct = {
          cover: uploadResult.secure_url,
          public_id: uploadResult.public_id,
          name,
          price,
          description,
          stock,
          discount,
          material,
          material2,
          rating,
          imgProducto: uploadResult.secure_url,
        };

        // Insertar producto en la base de datos
        conn.query(
          "INSERT INTO productitems SET ?",
          [newProduct],
          (err, result) => {
            if (err) {
              console.error("Error al crear el producto:", err);
              return res.status(500).send("Error al crear el producto.");
            }

            // Respuesta con el producto creado
            res.status(201).json({ id: result.insertId, ...newProduct });
          }
        );
      } catch (uploadError) {
        console.error("Error al procesar la solicitud:", uploadError);
        return res.status(500).send("Error al procesar la solicitud.");
      }
    });
  } catch (error) {
    console.error("Error general en el controlador:", error);
    return res.status(500).send("Error interno del servidor.");
  }
};

const getAllProducts = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error de conexión a la base de datos.");
    }

    const query = `SELECT 
                id, discount, cover, name, material, price, description, rating, imgProducto, stock
            FROM productitems;`;
    conn.query(query, (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error al obtener los productos.");
      }
      res.json(rows);
    });
  });
};

const getWeeklyHgh = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error de conexión a la base de datos.");
    }

    const query = `SELECT name, cover, description
      FROM FeaturedProducts
      WHERE week_start = CURDATE() - INTERVAL WEEKDAY(CURDATE()) + 1 DAY`;
    conn.query(query, (err, rows) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .send("Error al obtener los productos destacados semanales.");
      }
      res.json(rows);
    });
  });
};

// Obtener datos de las llaves foraneas
// Colors:

// const getColors = (req, res) => {
//     req.getConnection((err, conn) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send("Error de conexión a la base de datos.");
//         }

//         const query =
//             `SELECT id, name FROM colors;`
//         ;

//         conn.query(query, (err, rows) => {
//             if (err) {
//                 console.error(err);
//                 return res.status(500).send("Error al obtener los colores.");
//             }
//             res.json(rows);
//         });
//     });
// };

// const getMaterials = (req, res) => {
//     req.getConnection((err, conn) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send("Error de conexión a la base de datos.");
//         }

//         const query =
//             `SELECT id, name FROM materials;`
//         ;

//         conn.query(query, (err, rows) => {
//             if (err) {
//                 console.error(err);
//                 return res.status(500).send("Error al obtener los colores.");
//             }
//             res.json(rows);
//         });
//     });
// };

// const getPromotionProduct = (req, res) => {
//     req.getConnection((err, conn) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send("Error de conexión a la base de datos.");
//         }

//         const query =
//             `SELECT promotion_type FROM colors;`
//         ;

//         conn.query(query, (err, rows) => {
//             if (err) {
//                 console.error(err);
//                 return res.status(500).send("Error al obtener los colores.");
//             }
//             res.json(rows);
//         });
//     });
// };

const getProductById = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error de conexión a la base de datos.");
    }
    const query = `SELECT 
                pi.*, 
                GROUP_CONCAT(DISTINCT c.name) AS colors, 
                GROUP_CONCAT(DISTINCT s.size) AS sizes 
            FROM productitems pi
            LEFT JOIN product_colors pc ON pi.id = pc.product_id
            LEFT JOIN colors c ON pc.color_id = c.id
            LEFT JOIN product_sizes ps ON pi.id = ps.product_id
            LEFT JOIN sizes s ON ps.size_id = s.id
            WHERE pi.id = ?
            GROUP BY pi.id;
        ;`;
    conn.query(query, [id], (err, rows) => {
      if (err || rows.length === 0) {
        return res.status(404).send("Producto no encontrado.");
      }
      const product = rows[0];
      product.colors = product.colors ? product.colors.split(",") : [];
      product.sizes = product.sizes ? product.sizes.split(",") : [];
      res.json(product);
    });
  });
};

const getDiscountedProducts = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error de conexión a la base de datos.");
    }

    const query = `SELECT 
                id, discount, cover, name, material, material2, price, description, rating, promotion_type, promotion_start_date, promotion_end_date, imgProducto, stock
            FROM productitems
            WHERE discount > 0;
        ;`;

    conn.query(query, (err, rows) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .send("Error al obtener los productos con descuento.");
      }
      res.json(rows);
    });
  });
};

const getFeaturedProducts = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error de conexión a la base de datos.");
    }

    const query = `SELECT name, cover, description
      FROM FeaturedProducts
      WHERE week_start = CURDATE() - INTERVAL WEEKDAY(CURDATE()) + 1 DAY
          ;`;

    conn.query(query, (err, rows) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .send("Error al obtener los productos con descuento.");
      }
      res.json(rows);
    });
  });
};

const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, material, material2, price, description, stock, rating } =
    req.body;

  req.getConnection((err, conn) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error de conexión a la base de datos.");
    }

    const query = `
        UPDATE productitems
        SET name = ?, material = ?, material2 = ?, price = ?, description = ?, stock = ?, rating = ?
        WHERE id = ?;
      `;
    conn.query(
      query,
      [name, material, material2, price, description, stock, rating, id],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error al actualizar el producto.");
        }
        res.status(200).send("Producto actualizado exitosamente.");
      }
    );
  });
};

const deleteProduct = (req, res) => {
  const { id } = req.params;

  req.getConnection((err, conn) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error de conexión a la base de datos.");
    }

    const query = `DELETE FROM productitems WHERE id = ?`;
    conn.query(query, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error al eliminar el producto.");
      }
      console.log("Producto eliminado exitosamente:", result);
      res.status(200).send("Producto eliminado exitosamente.");
    });
  });
};

export default {
  createProduct,
  getAllProducts,
  getProductById,
  getDiscountedProducts,
  getFeaturedProducts,
  updateProduct,
  deleteProduct,
};
