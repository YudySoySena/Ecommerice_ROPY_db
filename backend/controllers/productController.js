import { v2 as cloudinary } from 'cloudinary';

const createProduct = (req, res) => {
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
        rating
    } = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error de conexión a la base de datos.");
        }

        cloudinary.uploader.upload(productImage.tempFilePath, { folder: "Products" }, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error al subir la imagen a Cloudinary.");
            }

            const newProduct = {
                cover: result.secure_url,
                public_id: result.public_id,
                name,
                price,
                description,
                stock,
                discount,
                material,
                material2,
                rating,
                promotion_type,
                promotion_start_date,
                promotion_end_date,
                imgProducto: result.secure_url,
            };

            conn.query("INSERT INTO productitems SET ?", [newProduct], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send("Error al crear el producto.");
                }

                res.status(201).json(newProduct); // Devolver el producto recién creado
            });
        });
    });
};

const getAllProducts = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error de conexión a la base de datos.");
        }

        const query = 
            `SELECT 
                id, discount, cover, name, material, material2, price, description, rating, promotion_type, promotion_start_date, promotion_end_date, imgProducto, stock
            FROM productitems;`
        ;

        conn.query(query, (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error al obtener los productos.");
            }
            res.json(rows);
        });
    });
};

const getProductById = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error de conexión a la base de datos.");
        }
        const query = 
            `SELECT 
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
        ;`
        conn.query(query, [id], (err, rows) => {
            if (err || rows.length === 0) {
                return res.status(404).send("Producto no encontrado.");
            }
            const product = rows[0];
            product.colors = product.colors ? product.colors.split(',') : [];
            product.sizes = product.sizes ? product.sizes.split(',') : [];
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

        const query = 
            `SELECT 
                id, discount, cover, name, material, material2, price, description, rating, promotion_type, promotion_start_date, promotion_end_date, imgProducto, stock
            FROM productitems
            WHERE discount > 0;
        ;`

        conn.query(query, (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error al obtener los productos con descuento.");
            }
            res.json(rows);
        });
    });
};

const updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, material, material2, price, description, stock, rating } = req.body;
  
    req.getConnection((err, conn) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error de conexión a la base de datos.");
      }
  
      const query = `
        UPDATE productos
        SET name = ?, material = ?, material2 = ?, price = ?, description = ?, stock = ?, rating = ?
        WHERE id = ?;
      `;
      conn.query(query, [name, material, material2, price, description, stock, rating, id], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error al actualizar el producto.");
        }
        res.status(200).send("Producto actualizado exitosamente.");
      });
    });
  };
  
const deleteProduct = (req, res) => {
    const { id } = req.params;
  
    req.getConnection((err, conn) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error de conexión a la base de datos.");
      }
  
      const query = `DELETE FROM productos WHERE id = ?`;
      conn.query(query, [id], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error al eliminar el producto.");
        }
        res.status(200).send("Producto eliminado exitosamente.");
      });
    });
  };  


export default { createProduct, getAllProducts, getProductById, getDiscountedProducts, updateProduct, deleteProduct };