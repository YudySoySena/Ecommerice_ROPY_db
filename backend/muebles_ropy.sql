CREATE DATABASE muebles_ropy;
USE muebles_ropy;

/*Tablas de la base de datos*/

-- Tabla Usuarios
CREATE TABLE Usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Status VARCHAR(50) DEFAULT 'Activo',
    Rol VARCHAR(50) DEFAULT 'Usuario',
    Direccion VARCHAR(255),
    Telefono VARCHAR(50)
);

SELECT * FROM Usuarios;
SHOW TABLES FROM muebles_ropy;

SELECT * FROM usuarios WHERE Email ="Katherinyudy@gmail.com" and Password ="Yk5678¿?";

DESCRIBE Usuarios;
DESCRIBE Rol;

-- Tabla Rol
CREATE TABLE Rol (
  id_rol INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  nombre VARCHAR(50),
  descripcion VARCHAR(50)
);

ALTER TABLE Rol 
MODIFY COLUMN descripcion VARCHAR(300);

INSERT INTO Rol(descripcion)
VALUES  (1, 'Usuario', 'Rol cliente, puede ver la vista cliente, hacer pedidos, recibir notificaciones y ver su historial de compras'),
(2, 'Administrador', 'Rol Administrador, puede ver, consultar, editar y eliminar Usuarios, pedidos, productos, notificaciones y promociones');





UPDATE `rol` SET `descripcion` = 'Rol Administrador, puede ver, consultar, editar y eliminar Usuarios, pedidos, productos, notificaciones y promociones' WHERE `rol`.`id_rol` = 2;

-- Tabla central: ProductItems
CREATE TABLE ProductItems (
    id INT PRIMARY KEY,
    discount DECIMAL(5,2),
    cover VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    material VARCHAR(255),
    material2 VARCHAR(255),
    price DECIMAL(10,2),
    description TEXT,
    rating DECIMAL(3,2),
    colors JSON,
    sizes JSON,
    promotion_type VARCHAR(50),
    promotion_start_date DATE,
    promotion_end_date DATE,
    imgProducto VARCHAR(300),
    stock INT DEFAULT 0
);

SELECT * FROM productitems;
SHOW CREATE TABLE productitems;

-- Insersión de datos

INSERT INTO productitems (id, discount, cover, name, material, material2, price, description, rating, promotion_type, promotion_start_date, promotion_end_date, imgProducto, stock) 
VALUES
(1, 10.00, 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122301/sofa-03_ernjxs.png', 'Sofá Rojo satín', NULL, NULL, 550.00, 'Sofá rojo satinado, elegante y cómodo.', 4.5, 'seasonal', '2024-11-01', '2024-11-30', 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122301/sofa-03_ernjxs.png', 15),
(2, 5.00, 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122300/product28_yvjfrd.png', 'Camarote azul y amarillo de tubos metal', NULL, NULL, 750.00, 'Camarote resistente con diseño moderno.', 4.2, 'clearance', '2024-11-01', '2024-11-15', 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122300/product28_yvjfrd.png', 10),
(3, NULL, 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122299/product27_bxclll.png', 'Camarote doble desarmable de metal', NULL, NULL, 670.00, 'Camarote desarmable práctico y duradero.', 4.3, NULL, NULL, NULL, 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122299/product27_bxclll.png', 8),
(4, 7.50, 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122298/product26_asuw1w.png', 'Camarote de 2 piezas con escalera de metal', NULL, NULL, 690.00, 'Camarote funcional con escalera incluida.', 4.0, 'flash', '2024-11-20', '2024-11-22', 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122298/product26_asuw1w.png', 20),
(5, NULL, 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122298/product25_n9wffe.png', 'Camarote de niña rosa y morado de metal', NULL, NULL, 720.00, 'Camarote colorido ideal para niñas.', 4.7, NULL, NULL, NULL, 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122298/product25_n9wffe.png', 12),
(6, 10.00, 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122295/product22_kblbbo.png', 'Camarote de 2 piezas verde amarillo rojo y azul de metal', NULL, NULL, 800.00, 'Camarote multicolor vibrante y resistente.', 4.6, 'seasonal', '2024-11-01', '2024-11-30', 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122295/product22_kblbbo.png', 25),
(7, 15.00, 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122294/product21_uyiyix.png', 'Camarote 2 piezas azul y rojo de metal', NULL, NULL, 780.00, 'Camarote moderno con estilo juvenil.', 4.1, 'flash', '2024-11-15', '2024-11-18', 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122294/product21_uyiyix.png', 10),
(8, NULL, 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122293/product20_fp2nsm.png', 'Camarote 2 piezas negro de metal', NULL, NULL, 720.00, 'Diseño elegante en color negro.', 4.4, NULL, NULL, NULL, 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122293/product20_fp2nsm.png', 8),
(9, NULL, 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122293/product18_fzllcb.png', 'Camarote 2 piezas azul y rojo con escalera de metal', NULL, NULL, 850.00, 'Incluye escalera, ideal para espacios reducidos.', 4.3, NULL, NULL, NULL, 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122293/product18_fzllcb.png', 5),
(10, NULL, 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122293/product19_hkasrk.png', 'Camarote verde y amarillo de metal', NULL, NULL, 740.00, 'Camarote duradero y vibrante.', 4.2, NULL, NULL, NULL, 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122293/product19_hkasrk.png', 12);

-- Tabla: Materials
CREATE TABLE materials (
    id INT PRIMARY KEY,
    name VARCHAR(255)
);

-- Inserción  de datos en materiales

INSERT INTO materials (id, name)
VALUES
    (1, 'Metal'),
    (2, 'Madera'),
    (3, 'Satín');

-- Insertar materiales únicos en la tabla materials
INSERT INTO materials (id, name)
SELECT DISTINCT id, material
FROM (
    SELECT ROW_NUMBER() OVER (ORDER BY material) AS id, material
    FROM (
        SELECT material FROM ProductItems
        UNION
        SELECT material2 FROM ProductItems WHERE material2 IS NOT NULL
    ) AS uniqueMaterials
) AS materialIds;

-- Tabla de relación: Product-Materials
CREATE TABLE product_materials (
    product_id INT,
    material_id INT,
    FOREIGN KEY (product_id) REFERENCES ProductItems(id),
    FOREIGN KEY (material_id) REFERENCES materials(id)
);

-- Insersión de datos product_materials:
 INSERT INTO product_materials (product_id, material_id)
VALUES
    (1, 3),  -- Sofa Rojo satín
    (2, 1),  -- Camarote azul y amarillo de tubos metal
    (3, 1),  -- Camarote doble desarmable de metal
    (4, 1),  -- Camarote de 2 piezas con escalera de metal
    (5, 1),  -- Camarote de niña rosa y morado de metal
    (6, 1); -- Camarote de 2 piezas verde amarillo rojo y azul de metal
    -- Camarote elegante de madera
    -- Camarote negro en forma de L de metal

-- Tabla: Colors
CREATE TABLE colors (
    id INT PRIMARY KEY,
    name VARCHAR(255)
);

-- Insertar colores únicos en la tabla colors
INSERT INTO colors (id, name)
SELECT DISTINCT id, color
FROM (
    SELECT ROW_NUMBER() OVER (ORDER BY color) AS id, color
    FROM (
        SELECT JSON_UNQUOTE(JSON_EXTRACT(colors, '$[*]')) AS color
        FROM ProductItems
    ) AS uniqueColors
) AS colorIds;

-- insersión colores
INSERT INTO colors (id, name)
VALUES
    (1, 'Rojo'),
    (2, 'Azul'),
    (3, 'Amarillo'),
    (4, 'Negro'),
    (5, 'Blanco'),
    (6, 'Gris'),
    (7, 'Rosa'),
    (8, 'Verde'),
    (9, 'Morado');
    
    
    SELECT * FROM colors;

-- Tabla de relación: Product-Colors
CREATE TABLE product_colors (
    product_id INT,
    color_id INT,
    FOREIGN KEY (product_id) REFERENCES ProductItems(id),
    FOREIGN KEY (color_id) REFERENCES colors(id)
);

-- insersión de datos: 

INSERT INTO product_colors (product_id, color_id)
VALUES
    (1, 1),  -- Sofa Rojo satín -> Rojo
    (2, 2),  -- Camarote azul y amarillo de tubos metal -> Azul
    (2, 3),  -- Camarote azul y amarillo de tubos metal -> Amarillo
    (3, 2),  -- Camarote doble desarmable de metal -> Azul
    (4, 2),  -- Camarote de 2 piezas con escalera de metal -> Azul
    (5, 7),  -- Camarote de niña rosa y morado de metal -> Rosa
    (5, 9),  -- Camarote de niña rosa y morado de metal -> Morado
    (6, 8);  -- Camarote de 2 piezas verde amarillo rojo y azul -> Verde

-- Tabla: Sizes
CREATE TABLE sizes (
    id INT PRIMARY KEY,
    size VARCHAR(255)
);

INSERT INTO sizes (id, size)
VALUES
    (1, 'Individual'),
    (2, 'Matrimonial'),
    (3, '3 piezas'),
    (4, '2 piezas');
    

-- Insertar tamaños únicos en la tabla sizes
INSERT INTO sizes (id, size)
SELECT DISTINCT id, size
FROM (
    SELECT ROW_NUMBER() OVER (ORDER BY size) AS id, size
    FROM (
        SELECT JSON_UNQUOTE(JSON_EXTRACT(sizes, '$[*]')) AS size
        FROM ProductItems
    ) AS uniqueSizes
) AS sizeIds;

-- Tabla de relación: Product-Sizes
CREATE TABLE product_sizes (
    product_id INT,
    size_id INT,
    FOREIGN KEY (product_id) REFERENCES ProductItems(id),
    FOREIGN KEY (size_id) REFERENCES sizes(id)
);

-- Insersión de datos de product_sizes

INSERT INTO product_sizes (product_id, size_id)
VALUES
    (2, 4),  -- Camarote azul y amarillo de tubos metal -> 2 piezas
    (3, 4),  -- Camarote doble desarmable de metal -> 2 piezas
    (4, 3),  -- Camarote de 2 piezas con escalera -> 3 piezas
    (5, 4),  -- Camarote de niña rosa y morado de metal -> 2 piezas
    (6, 3);  -- Camarote de 2 piezas verde amarillo rojo y azul -> 3 piezas

-- Tabla: Product Variants
CREATE TABLE ProductVariants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    color_id INT,
    size_id INT,
    stock INT DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES ProductItems(id),
    FOREIGN KEY (color_id) REFERENCES colors(id),
    FOREIGN KEY (size_id) REFERENCES sizes(id)
);
-- insersión de datos productVariants:
INSERT INTO ProductVariants (product_id, color_id, size_id, stock)
VALUES
    (1, 1, NULL, 10),  -- Sofa Rojo satín: Rojo, Queen, 10 en stock
    (2, 2, 4, 15),  -- Camarote azul y amarillo: Azul, 2 piezas, 15 en stock
    (2, 3, 4, 15),  -- Camarote azul y amarillo: Amarillo, 2 piezas, 15 en stock
    (3, 2, 4, 20),  -- Camarote doble desarmable de metal: Azul, 2 piezas, 20 en stock
    (4, 2, 3, 5),   -- Camarote de 2 piezas con escalera: Azul, 3 piezas, 5 en stock
    (5, 7, 4, 8),   -- Camarote de niña rosa y morado: Rosa, 2 piezas, 8 en stock
    (6, 8, 3, 12);  -- Camarote de 2 piezas verde amarillo: Verde, 3 piezas, 12 en stock

-- Consultar las relaciones: 

SELECT 
    p.name AS Product, 
    m.name AS Material, 
    c.name AS Color, 
    s.size AS Size, 
    v.stock AS Stock
FROM 
    ProductVariants v
JOIN 
    ProductItems p ON v.product_id = p.id
JOIN 
    materials m ON v.product_id = m.id
JOIN 
    colors c ON v.color_id = c.id
JOIN 
    sizes s ON v.size_id = s.id;


-- Inicio Procesos extrasss
/*
	SHOW CREATE TABLE orderitems;
	ALTER TABLE orderitems DROP COLUMN orderitems_ibfk_2;
	DROP TABLE ProductItems;
*/
-- Final procesos extrass

-- Tabla: Sections (para categorizar productos)
CREATE TABLE Sections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

-- Inserción de datos a la tabla sections:

INSERT INTO Sections (name) 
VALUES 
    ('Sala'),
    ('Habitación'),
    ('Habitación infantil');

-- Tabla de relación: Product-Sections (muchos a muchos)
CREATE TABLE ProductSection (
    product_id INT,
    section_id INT,
    PRIMARY KEY (product_id, section_id),
    FOREIGN KEY (product_id) REFERENCES ProductItems(id) ON DELETE CASCADE,
    FOREIGN KEY (section_id) REFERENCES Sections(id) ON DELETE CASCADE
);

-- Inserción de datos tabla product section

-- Relacionar productos con sus secciones
INSERT INTO ProductSection (product_id, section_id)
VALUES 
    (1, 1),  -- Sofa Rojo satín -> Living Room
    (2, 2),  -- Camarote azul y amarillo de tubos metal -> Bedroom
    (3, 2),  -- Camarote doble desarmable de metal -> Bedroom
    (4, 2),  -- Camarote de 2 piezas con escalera de metal -> Bedroom
    (5, 3),  -- Camarote de niña rosa y morado de metal -> Kids Room
    (6, 3),  -- Camarote de 2 piezas verde amarillo rojo y azul de metal -> Kids Room
    (7, 2),  -- Camarote 2 piezas azul y rojo de metal -> Bedroom
    (8, 2),  -- Camarote 2 piezas negro de metal -> Bedroom
    (9, 3),  -- Camarote 2 piezas azul y rojo con escalera -> Kids Room
    (10, 3); -- Camarote verde y amarillo de metal -> Kids Room
    
    
-- Consulta para verificar la relación entre tabla productitems y sections :
SELECT 
    p.name AS Product, 
    s.name AS Section
FROM 
    ProductSection ps
JOIN 
    ProductItems p ON ps.product_id = p.id
JOIN 
    Sections s ON ps.section_id = s.id;

-- Consulta para obtener los productis mas vendidos de la semana

SELECT 
    p.id AS product_id,
    p.name AS product_name,
    SUM(oi.quantity) AS total_sold,
    SUM(oi.price * oi.quantity * (1 - (oi.discount / 100))) AS total_revenue
FROM 
    OrderItems oi
JOIN 
    Orders o ON oi.orderId = o.orderId
JOIN 
    ProductItems p ON oi.productId = p.id
WHERE 
    o.status = 'Completed'
    AND o.orderDate >= CURDATE() - INTERVAL 7 DAY
GROUP BY 
    p.id
ORDER BY 
    total_sold DESC
LIMIT 10; -- Cambia el límite según tus necesidades

-- Crear vista para consultar los productos más vendidos de la semana

CREATE OR REPLACE VIEW ProductosTopSemanales AS
SELECT 
    p.id AS product_id,
    p.name AS product_name,
    SUM(oi.quantity) AS total_sold,
    SUM(oi.price * oi.quantity * (1 - (oi.discount / 100))) AS total_revenue
FROM 
    OrderItems oi
JOIN 
    Orders o ON oi.orderId = o.orderId
JOIN 
    ProductItems p ON oi.productId = p.id
WHERE 
    o.status = 'Completed'
    AND o.orderDate >= CURDATE() - INTERVAL 7 DAY
GROUP BY 
    p.id
ORDER BY 
    total_sold DESC
LIMIT 10;

-- Consultar la vista
SELECT * FROM WeeklyTopProducts;

-- Crear un procedimiento almacenado para obtener los productos destacados de la semana

DELIMITER $$

CREATE PROCEDURE GetTopProductsByDateRange(
    IN startDate DATE, 
    IN endDate DATE, 
    IN limitCount INT
)
BEGIN
    SELECT 
        p.id AS product_id,
        p.name AS product_name,
        SUM(oi.quantity) AS total_sold,
        SUM(oi.price * oi.quantity * (1 - (oi.discount / 100))) AS total_revenue
    FROM 
        OrderItems oi
    JOIN 
        Orders o ON oi.orderId = o.orderId
    JOIN 
        ProductItems p ON oi.productId = p.id
    WHERE 
        o.status = 'Completed'
        AND o.orderDate BETWEEN startDate AND endDate
    GROUP BY 
        p.id
    ORDER BY 
        total_sold DESC
    LIMIT limitCount;
END$$

DELIMITER ;

-- Llamar el procedimiento:

CALL GetTopProductsByDateRange('2024-11-14', '2024-11-21', 10);

--  Evento para guardar el historial de los productos:

CREATE EVENT UpdateWeeklyTopProducts
ON SCHEDULE EVERY 1 WEEK STARTS '2024-11-20 00:00:00'
DO
INSERT INTO TopProductsHistory (product_id, total_sold, total_revenue, week_start, week_end)
SELECT 
    p.id, 
    SUM(oi.quantity), 
    SUM(oi.price * oi.quantity * (1 - (oi.discount / 100))), 
    CURDATE() - INTERVAL 7 DAY, 
    CURDATE()
FROM 
    OrderItems oi
JOIN 
    Orders o ON oi.orderId = o.orderId
JOIN 
    ProductItems p ON oi.productId = p.id
WHERE 
    o.status = 'Completed'
    AND o.orderDate >= CURDATE() - INTERVAL 7 DAY
GROUP BY 
    p.id
ORDER BY 
    total_sold DESC;

-- Tabla: Orders (pedidos de usuarios)
CREATE TABLE Orders (
    orderId VARCHAR(255) PRIMARY KEY,
    userId INT,
    total DECIMAL(10,2),
    status ENUM('Pending', 'Completed', 'Cancelled') NOT NULL,
    orderDate DATE NOT NULL,
    deliveryDate DATE,
    shippingAddress VARCHAR(255),
    cancelReason TEXT,
    paymentMethod ENUM('Credit Card', 'PayPal', 'Bank Transfer', 'Cash') NOT NULL,
    FOREIGN KEY (userId) REFERENCES Usuarios(id) ON DELETE CASCADE
);

-- Insersión de datos en la tabla 

INSERT INTO orders (orderId, userId, total, status, orderDate, deliveryDate, shippingAddress, cancelReason, paymentMethod)
VALUES
    ('ORD001', 1, 1650000.00, 'Completed', '2024-11-15', '2024-11-20', '123 Calle Falsa, Ciudad', NULL, 'Credit Card'),
    ('ORD002', 2, 800000.00, 'Completed', '2024-11-18', '2024-11-21', '456 Avenida Real, Ciudad', NULL, 'PayPal'),
    ('ORD003', 3, 1560000.00, 'Completed', '2024-11-19', '2024-11-22', '789 Calle Central, Ciudad', NULL, 'Bank Transfer'),
    ('ORD004', 4, 720000.00, 'Cancelled', '2024-11-20', NULL, '987 Calle Norte, Ciudad', 'Stock insuficiente', 'Cash'),
    ('ORD005', 5, 1400000.00, 'Completed', '2024-11-21', '2024-11-23', '654 Calle Sur, Ciudad', NULL, 'Credit Card');

-- Tabla: OrderItems (detalles de los productos en cada pedido)
CREATE TABLE OrderItems (
    orderItemId INT AUTO_INCREMENT PRIMARY KEY,
    orderId VARCHAR(255),
    productId INT,
    quantity INT NOT NULL CHECK (quantity > 0),
    price DECIMAL(10,2) NOT NULL,
    discount DECIMAL(5,2) DEFAULT 0,
    FOREIGN KEY (orderId) REFERENCES Orders(orderId) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES ProductItems(id) ON DELETE CASCADE
);
-- Insersión de datos a la tabla ordersitems:

INSERT INTO orderitems (orderId, productId, quantity, price, discount)
VALUES
    -- Pedido 1
    ('ORD001', 1, 2, 550000.00, 10.00), -- Sofá Rojo Satín
    ('ORD001', 2, 1, 750000.00, 5.00),  -- Camarote azul y amarillo
    -- Pedido 2
    ('ORD002', 6, 1, 800000.00, 10.00), -- Camarote multicolor
    -- Pedido 3
    ('ORD003', 4, 2, 690000.00, 7.50),  -- Camarote con escalera
    ('ORD003', 10, 1, 740000.00, 0.00), -- Camarote verde y amarillo
    -- Pedido 4 (cancelado, no debería considerarse para métricas)
    ('ORD004', 8, 1, 720000.00, 0.00),  -- Camarote negro
    -- Pedido 5
    ('ORD005', 9, 2, 850000.00, 0.00),  -- Camarote azul y rojo con escalera
    ('ORD005', 7, 1, 780000.00, 15.00); -- Camarote azul y rojo juvenil

-- Tabla Notifications
CREATE TABLE Notifications (
    notificationId VARCHAR(255) PRIMARY KEY,
    userId INT,
    title VARCHAR(255),
    message TEXT,
    date DATE,
    status VARCHAR(50),
    FOREIGN KEY (userId) REFERENCES Usuarios(id)
);

CREATE TABLE Promotions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    promotion_type VARCHAR(50),
    discount_percentage DECIMAL(5,2),
    start_date DATE,
    end_date DATE,
    description TEXT,
    FOREIGN KEY (product_id) REFERENCES ProductItems(id)
);

-- índices en las tablas relacionadas para mejorar la velocidad de consultas

CREATE INDEX idx_product_materials_product_id ON product_materials(product_id);
CREATE INDEX idx_product_colors_product_id ON product_colors(product_id);
CREATE INDEX idx_product_sizes_product_id ON product_sizes(product_id);
CREATE INDEX idx_orderitems_orderid ON OrderItems(orderId);

/*Inserción de datos

Tabla usuarios*/

INSERT INTO Usuarios (id, Nombre, Email, Password, Status, Rol, Direccion, Telefono) VALUES
(1, 'Yudy Garcia', 'Katherinyudy@gmail.com', 'Yk5678¿?', 'Activo', 'Administrador', NULL, NULL),
(2, 'Cris Garcia', 'crisgarcia2@cris.co', '1234', 'Activo', 'Usuario', 'Cra avenida septima #19b', '306876534'),
(3, 'Marquita', 'marquito@soy.sena', 'Yu5678??', 'Activo', 'Administrador', 'Cll 67c #19b', '3058765432'),
(4, 'Andrea Quemba', 'aquemba4@gmail.com', 'Yu5678??', 'Inactivo', 'Usuario', 'av 30 #106 -10', '3112233453'),
(5, 'Carlos Gómez', 'carlos.gomez@gmail.com', 'ruizcarlos123', 'Inactivo', 'Usuario', 'cra 43d #105f-4', '3209876568');


INSERT INTO products (id, name, material, price, description, rating, colors, sizes, discount)
VALUES
    (1, 'Camarote Campestre', 'Metal', 551000, 'Un elegante camarote campestre lateral, ideal para espacios reducidos.', 4.5, 'Blanco, Gris, Madera', '1.2 x 2 m, 1.5 x 2 m', 10),
    (2, 'Camarote 3 niveles metalmadera', 'Metal, Madera', 999, 'Camarote de 3 niveles con estructura de metal y madera, resistente y funcional.', 4.2, 'Gris, Madera', '1.2 x 1.8 m, 1.5 x 2 m', 0),
    (3, 'Camarote 3 niveles Francés', 'Madera', 850000, 'Camarote de 3 niveles con diseño francés, elegante y duradero.', 4.8, 'Madera Oscura', '1.5 x 2 m, 2 x 2.5 m', 40),
    (4, 'Camarote 3 Niveles Triada', 'Madera', 905000, 'Camarote de 3 niveles, modelo Triada, con un diseño robusto y moderno.', 4.8, 'Madera Oscura', '1.5 x 2 m, 2 x 2.5 m', 40),
    (5, 'Camarote 3 niveles lineas Redondeado', 'Metal', 75000, 'Camarote de 3 niveles con líneas redondeadas para un estilo más suave.', 4.8, 'Madera Oscura', '1.5 x 2 m, 2 x 2.5 m', 50),
    (6, 'Camarote 3 niveles francés metalmadera', 'Madera', 1600, 'Camarote de 3 niveles con combinación de metal y madera, estilo francés.', 4.8, 'Madera Oscura', '1.5 x 2 m, 2 x 2.5 m', 50),
    (7, 'Camarote de estudiooooooo', 'Metal', 950, 'Camarote Estudio 4, ideal para habitaciones de estudiantes con estilo.', 4.8, 'Madera Oscura', '1.5 x 2 m, 2 x 2.5 m', 0),
    (8, 'Camarote Estudio 2', 'Madera', 850, 'Camarote Estudio 2 con un diseño compacto y funcional para espacios pequeños.', 4.8, 'Madera Oscura', '1.5 x 2 m, 2 x 2.5 m', 10),
    (9, 'Camarote 3 niveles Lineal', 'Madera', 700, 'Camarote de 3 niveles con un diseño lineal y sencillo.', 4.8, 'Madera Oscura', '1.5 x 2 m, 2 x 2.5 m', 50),
    (10, 'Camarote Estudio 2', 'Madera', 850, 'Camarote Estudio 2 con un diseño compacto y funcional para espacios pequeños.', 4.8, 'Madera Oscura', '1.5 x 2 m, 2 x 2.5 m', 10);
    -- Repeat for the remaining products...

SELECT * FROM Usuarios;

-- Inserción tabla productos
INSERT INTO ProductItems (id, discount, cover, name, material, material2, price, description, rating, colors, sizes) VALUES
(1, 10, './images/allProducts/product1.png', 'Camarote Campestre', 'Metal', NULL, 800000, 'Un elegante camarote campestre lateral...', 4.5, JSON_ARRAY('Blanco', 'Gris', 'Madera'), JSON_ARRAY('1.2 x 2 m', '1.5 x 2 m')),
(2, 0, './images/allProducts/product2.png', 'Camarote 3 niveles metalmadera', 'Metal', 'Madera', 999000, 'Camarote de 3 niveles...', 4.2, JSON_ARRAY('Gris', 'Madera'), JSON_ARRAY('1.2 x 1.8 m', '1.5 x 2 m'));

SET FOREIGN_KEY_CHECKS = 0;

SELECT * FROM Usuarios WHERE Email = 'mariapaula@gmail.com' AND Password = 'MaPa$$$123';

INSERT INTO ProductSection (product_id, section_id) VALUES      (1, 1),  -- Sofa Rojo satín -> Living Room     (2, 2),  -- Camarote azul y amarillo de tubos metal -> Bedroom     (3, 2),  -- Camarote doble desarmable de metal -> Bedroom     (4, 2),  -- Camarote de 2 piezas con escalera de metal -> Bedroom     (5, 3),  -- Camarote de niña rosa y morado de metal -> Kids Room     (6, 3),  -- Camarote de 2 piezas verde amarillo rojo y azul de metal -> Kids Room     (7, 2),  -- Camarote 2 piezas azul y rojo de metal -> Bedroom     (8, 2),  -- Camarote 2 piezas negro de metal -> Bedroom     (9, 3),  -- Camarote 2 piezas azul y rojo con escalera -> Kids Room     (10, 3)
