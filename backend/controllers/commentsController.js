const createComments = async (req, res) => {
  req.getConnection(async (err, conn) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error de conexión a la base de datos.");
    }
    const { productId, userId, sessionId, rating, comment, isAnonymous } =
      req.body;

    try {
      // Validar que no exceda el límite de comentarios
      const [existingComments] = await db.execute(
        `SELECT COUNT(*) AS count FROM comments 
               WHERE productId = ? AND (userId = ? OR sessionId = ?)`,
        [productId, userId || null, sessionId || null]
      );

      const limit = isAnonymous ? 1 : 2;
      if (existingComments[0].count >= limit) {
        return res
          .status(400)
          .json({ error: "Has alcanzado el límite de comentarios." });
      }

      // Insertar comentario
      await db.execute(
        `INSERT INTO comments (productId, userId, sessionId, rating, comment, isAnonymous)
               VALUES (?, ?, ?, ?, ?, ?)`,
        [
          productId,
          userId || null,
          sessionId || null,
          rating,
          comment,
          isAnonymous,
        ]
      );

      // Actualizar promedio de calificaciones
      await db.execute(
        `INSERT INTO ratings (productId, averageRating, totalRatings)
               VALUES (?, ?, 1)
               ON DUPLICATE KEY UPDATE 
               averageRating = (averageRating * totalRatings + ?) / (totalRatings + 1),
               totalRatings = totalRatings + 1`,
        [productId, rating, rating]
      );

      res.status(201).json({ message: "Comentario agregado exitosamente." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al agregar el comentario." });
    }
  });
};
const getCommentsById = async (req, res) => {
    req.getConnection(async (err, conn) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error de conexión a la base de datos.");
      }
  
        const { productId } = req.params;

        try {
          const [comments] = await db.execute(
            `SELECT comment, rating, isAnonymous, createdAt, 
                    IF(isAnonymous, 'Anónimo', (SELECT Nombre FROM usuarios WHERE id = comments.userId)) AS userName
             FROM comments WHERE productId = ? ORDER BY createdAt DESC LIMIT 5`,
            [productId]
          );
  
        res.status(201).json({ message: "Comentario agregado exitosamente." });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al agregar el comentario." });
      }
    });
  };

  const getCommentsByIdMore = async (req, res) => {
    req.getConnection(async (err, conn) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error de conexión a la base de datos.");
      }
      const { productId } = req.params;
      const { offset } = req.query;
    
      try {
        const [comments] = await db.execute(
          `SELECT comment, rating, isAnonymous, createdAt, 
                  IF(isAnonymous, 'Anónimo', (SELECT Nombre FROM usuarios WHERE id = comments.userId)) AS userName
           FROM comments WHERE productId = ? ORDER BY createdAt DESC LIMIT 5 OFFSET ?`,
          [productId, parseInt(offset, 10)]
        );
  
        res.status(201).json({ message: "Comentario agregado exitosamente." });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al agregar el comentario." });
      }
    });
  };

export default { createComments, getCommentsById, getCommentsByIdMore };
