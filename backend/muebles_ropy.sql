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

ALTER TABLE Usuarios MODIFY id INT  ;
DELETE FROM Usuarios;

ALTER TABLE Usuarios
ADD COLUMN rol_id INT;

ALTER TABLE `usuarios` DROP `rol_id`;

ALTER TABLE Usuarios
ADD CONSTRAINT fk_roles FOREIGN KEY (rol_id) REFERENCES Rol (id_rol);

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

SELECT * FROM Rol;

UPDATE `rol` SET `descripcion` = 'Rol Administrador, puede ver, consultar, editar y eliminar Usuarios, pedidos, productos, notificaciones y promociones' WHERE `rol`.`id_rol` = 2;

-- Tabla ProductItems

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
    promotion_end_date DATE
);


-- Table structure example

CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    price DECIMAL(10, 2),
    description TEXT,
    rating DECIMAL(3, 2),
    discount INT
);

CREATE TABLE materials (
    id INT PRIMARY KEY,
    name VARCHAR(255)
);

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

DROP TABLE materials;

CREATE TABLE product_materials (
    product_id INT,
    material_id INT,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (material_id) REFERENCES materials(id)
);

CREATE TABLE colors (
    id INT PRIMARY KEY,
    name VARCHAR(255)
);

INSERT INTO colors (id, name)
SELECT DISTINCT id, color
FROM (
  SELECT ROW_NUMBER() OVER (ORDER BY color) AS id, color
  FROM (
    SELECT UNNEST(colors) AS color
    FROM ProductItems
  ) AS uniqueColors
) AS colorIds;

CREATE TABLE product_colors (
    product_id INT,
    color_id INT,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (color_id) REFERENCES colors(id)
);

CREATE TABLE sizes (
    id INT PRIMARY KEY,
    size VARCHAR(255)
);

CREATE TABLE product_sizes (
    product_id INT,
    size_id INT,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (size_id) REFERENCES sizes(id)
);

-- Inserting data into these tables would involve multiple INSERT statements.

ALTER TABLE ProductItems ADD COLUMN promotion_type VARCHAR(50), 
                         ADD COLUMN promotion_start_date DATE,
                         ADD COLUMN promotion_end_date DATE;

DROP TABLE ProductItems;

ALTER TABLE ProductItems
ADD COLUMN stock INT DEFAULT 0;

ALTER TABLE ProductItems
ADD COLUMN stock INT DEFAULT 0;

CREATE TABLE ProductVariants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    color_id INT,
    size_id INT,
    stock INT DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES ProductItems(id),
    FOREIGN KEY (color_id) REFERENCES Colors(id),
    FOREIGN KEY (size_id) REFERENCES Sizes(id)
);


-- Tabla Sections
CREATE TABLE Sections (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Tabla ProductSection
CREATE TABLE ProductSection (
    product_id INT,
    section_id INT,
    PRIMARY KEY (product_id, section_id),
    FOREIGN KEY (product_id) REFERENCES ProductItems(id),
    FOREIGN KEY (section_id) REFERENCES Sections(id)
);

-- Tabla Orders
CREATE TABLE Orders (
    orderId VARCHAR(255) PRIMARY KEY,
    userId INT,
    total DECIMAL(10,2),
    status VARCHAR(50),
    orderDate DATE,
    deliveryDate DATE,
    shippingAddress VARCHAR(255),
    cancelReason TEXT,
    paymentMethod VARCHAR(50),
    FOREIGN KEY (userId) REFERENCES Usuarios(id)  
);

-- Tabla OrderItems
CREATE TABLE OrderItems (
    orderItemId INT AUTO_INCREMENT PRIMARY KEY,
    orderId VARCHAR(255),
    productId INT,
    quantity INT,
    price DECIMAL(10,2),
    discount DECIMAL(5,2),
    FOREIGN KEY (orderId) REFERENCES Orders(orderId),
    FOREIGN KEY (productId) REFERENCES ProductItems(id)
);

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

