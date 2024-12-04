-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-12-2024 a las 14:19:17
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `muebles_ropy`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_promotions_status` ()   BEGIN
    -- Marcar como inactivas las promociones cuya fecha de finalización ya pasó
    UPDATE `promotions`
    SET `is_active` = 0
    WHERE `end_date` < CURDATE() AND `is_active` = 1;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `colors`
--

CREATE TABLE `colors` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `colors`
--

INSERT INTO `colors` (`id`, `name`) VALUES
(1, 'Rojo'),
(2, 'Azul'),
(3, 'Amarillo'),
(4, 'Negro'),
(5, 'Blanco'),
(6, 'Gris'),
(7, 'Rosa'),
(8, 'Verde'),
(9, 'Morado'),
(10, 'Lila');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materials`
--

CREATE TABLE `materials` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `materials`
--

INSERT INTO `materials` (`id`, `name`) VALUES
(1, 'Metal'),
(2, 'Madera'),
(3, 'Satín');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notifications`
--

CREATE TABLE `notifications` (
  `notificationId` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `date` date DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `notifications`
--

INSERT INTO `notifications` (`notificationId`, `userId`, `title`, `message`, `date`, `status`) VALUES
(1, 1, 'Nueva actualización de producto', 'Hemos añadido nuevos camarotes a nuestra tienda, échale un vistazo.', '2024-09-10', 'unread'),
(2, 2, NULL, 'Cristian, revisa los nuevos camarotes que hemos añadido!!', NULL, NULL),
(3, 3, NULL, 'Bienvenido a muebles ROPY.', NULL, 'enviada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orderitems`
--

CREATE TABLE `orderitems` (
  `orderItemId` int(11) NOT NULL,
  `orderId` varchar(255) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL CHECK (`quantity` > 0),
  `price` decimal(10,2) NOT NULL,
  `discount` decimal(5,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `orderitems`
--

INSERT INTO `orderitems` (`orderItemId`, `orderId`, `productId`, `quantity`, `price`, `discount`) VALUES
(1, 'ORD001', 1, 2, 550000.00, 10.00),
(2, 'ORD001', 2, 1, 750000.00, 5.00),
(3, 'ORD002', 6, 1, 800000.00, 10.00),
(4, 'ORD003', 4, 2, 690000.00, 7.50),
(6, 'ORD004', 8, 1, 720000.00, 0.00),
(7, 'ORD005', 9, 2, 850000.00, 0.00),
(8, 'ORD005', 7, 1, 780000.00, 15.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `orderId` varchar(255) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `status` enum('Pending','Completed','Cancelled') NOT NULL,
  `orderDate` date NOT NULL,
  `deliveryDate` date DEFAULT NULL,
  `shippingAddress` varchar(255) DEFAULT NULL,
  `cancelReason` text DEFAULT NULL,
  `paymentMethod` enum('Credit Card','PayPal','Bank Transfer','Cash') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`orderId`, `userId`, `total`, `status`, `orderDate`, `deliveryDate`, `shippingAddress`, `cancelReason`, `paymentMethod`) VALUES
('ORD001', 1, 1650000.00, 'Completed', '2024-11-15', '2024-11-20', '123 Calle Falsa, Ciudad', NULL, 'Credit Card'),
('ORD002', 2, 800000.00, 'Completed', '2024-11-18', '2024-11-21', '456 Avenida Real, Ciudad', NULL, 'PayPal'),
('ORD003', 3, 1560000.00, 'Completed', '2024-11-19', '2024-11-22', '789 Calle Central, Ciudad', NULL, 'Bank Transfer'),
('ORD004', 4, 720000.00, 'Cancelled', '2024-11-20', NULL, '987 Calle Norte, Ciudad', 'Stock insuficiente', 'Cash'),
('ORD005', 5, 1400000.00, 'Completed', '2024-11-21', '2024-11-23', '654 Calle Sur, Ciudad', NULL, 'Credit Card');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productitems`
--

CREATE TABLE `productitems` (
  `id` int(11) NOT NULL,
  `discount` decimal(5,2) DEFAULT NULL,
  `cover` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `material` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `rating` decimal(3,2) DEFAULT NULL,
  `colors` int(11) DEFAULT NULL,
  `colors2` int(11) DEFAULT NULL,
  `sizes` int(11) DEFAULT NULL,
  `imgProducto` varchar(300) DEFAULT NULL,
  `stock` int(11) DEFAULT 0,
  `promotion_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productitems`
--

INSERT INTO `productitems` (`id`, `discount`, `cover`, `name`, `material`, `price`, `description`, `rating`, `colors`, `colors2`, `sizes`, `imgProducto`, `stock`, `promotion_id`) VALUES
(1, 10.00, 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122301/sofa-03_ernjxs.png', 'Sofá Rojo satín', 3, 550000.00, 'Sofá rojo satinado, elegante y cómodo.', 4.50, NULL, 0, NULL, 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122301/sofa-03_ernjxs.png', 15, 1),
(2, 5.00, 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122300/product28_yvjfrd.png', 'Camarote azul y amarillo de tubos metal', 1, 750000.00, 'Camarote resistente con diseño moderno.', 4.20, NULL, 0, NULL, 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122300/product28_yvjfrd.png', 10, 2),
(3, NULL, 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122299/product27_bxclll.png', 'Camarote doble desarmable de metal', 1, 670000.00, 'Camarote desarmable práctico y duradero.', 4.30, NULL, 0, NULL, 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122299/product27_bxclll.png', 8, NULL),
(4, 7.50, 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122298/product26_asuw1w.png', 'Camarote de 2 piezas con escalera de metal', 1, 690000.00, 'Camarote funcional con escalera incluida.', 4.00, NULL, 0, NULL, 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122298/product26_asuw1w.png', 20, 3),
(5, NULL, 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122298/product25_n9wffe.png', 'Camarote de niña rosa y morado de metal', 1, 720000.00, 'Camarote colorido ideal para niñas.', 4.70, NULL, 0, NULL, 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122298/product25_n9wffe.png', 12, NULL),
(6, 10.00, 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122295/product22_kblbbo.png', 'Camarote de 2 piezas verde amarillo rojo y azul de metal', 1, 800000.00, 'Camarote multicolor vibrante y resistente.', 4.60, NULL, 0, NULL, 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122295/product22_kblbbo.png', 25, NULL),
(7, 15.00, 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122294/product21_uyiyix.png', 'Camarote 2 piezas azul y rojo de metal', 1, 780000.00, 'Camarote moderno con estilo juvenil.', 4.10, NULL, 0, NULL, 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122294/product21_uyiyix.png', 10, NULL),
(8, NULL, 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122293/product20_fp2nsm.png', 'Camarote 2 piezas negro de metal', 1, 720000.00, 'Diseño elegante en color negro.', 4.40, NULL, 0, NULL, 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122293/product20_fp2nsm.png', 8, NULL),
(9, NULL, 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122293/product18_fzllcb.png', 'Camarote 2 piezas azul y rojo con escalera de metal', 1, 850000.00, 'Incluye escalera, ideal para espacios reducidos.', 4.30, NULL, 0, NULL, 'https://res.cloudinary.com/dv1xgco7s/image/upload/v1732122293/product18_fzllcb.png', 5, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productvariants`
--

CREATE TABLE `productvariants` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `color_id` int(11) DEFAULT NULL,
  `size_id` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productvariants`
--

INSERT INTO `productvariants` (`id`, `product_id`, `color_id`, `size_id`, `stock`) VALUES
(1, 1, NULL, NULL, 10),
(2, 2, NULL, 4, 15),
(3, 2, NULL, 4, 15),
(4, 3, 2, 4, 20),
(5, 4, 2, 3, 5),
(6, 5, 7, 4, 8),
(7, 6, 8, 3, 12),
(8, 1, 1, NULL, 10),
(9, 2, 2, 4, 15),
(10, 2, 3, 4, 15),
(11, 3, 2, 4, 20),
(12, 4, 2, 3, 5),
(13, 5, 7, 4, 8),
(14, 6, 8, 3, 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_colors`
--

CREATE TABLE `product_colors` (
  `product_id` int(11) DEFAULT NULL,
  `color_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `product_colors`
--

INSERT INTO `product_colors` (`product_id`, `color_id`) VALUES
(1, 1),
(2, 2),
(2, 3),
(3, 2),
(4, 2),
(5, 7),
(5, 9),
(6, 8),
(2, 2),
(2, 3),
(5, 5),
(7, 10),
(7, 7),
(2, 3),
(8, 8),
(2, 3),
(9, 1),
(9, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_materials`
--

CREATE TABLE `product_materials` (
  `product_id` int(11) DEFAULT NULL,
  `material_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `product_materials`
--

INSERT INTO `product_materials` (`product_id`, `material_id`) VALUES
(1, 3),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_sizes`
--

CREATE TABLE `product_sizes` (
  `product_id` int(11) DEFAULT NULL,
  `size_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `product_sizes`
--

INSERT INTO `product_sizes` (`product_id`, `size_id`) VALUES
(2, 4),
(3, 4),
(4, 3),
(5, 4),
(6, 3),
(2, 4),
(3, 4),
(4, 3),
(5, 4),
(6, 3),
(2, 4),
(3, 4),
(4, 3),
(5, 4),
(6, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `promotions`
--

CREATE TABLE `promotions` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `promotion_type` int(11) DEFAULT NULL,
  `discount_percentage` decimal(5,2) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `promotions`
--

INSERT INTO `promotions` (`id`, `product_id`, `promotion_type`, `discount_percentage`, `start_date`, `end_date`, `description`, `is_active`) VALUES
(1, 1, 1, 15.00, '2024-12-01', '2024-12-31', 'Promoción especial de fin de año para el elegante sofá rojo.', 1),
(2, 2, 2, 15.00, '2024-12-15', '2024-12-17', 'Descuento único durante el fin de semana en este camarote moderno.', 1),
(3, 4, 1, 15.00, '2024-12-10', '2024-12-20', 'Aprovecha el descuento especial en este camarote funcional.', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `descripcion` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `nombre`, `descripcion`) VALUES
(1, 'Usuario', 'Rol cliente, puede ver la vista cliente, hacer pedidos, recibir notificaciones y ver su historial de compras'),
(2, 'Administrador', 'Rol Administrador, puede ver, consultar, editar y eliminar Usuarios, pedidos, productos, notificaciones y promociones');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sizes`
--

CREATE TABLE `sizes` (
  `id` int(11) NOT NULL,
  `size` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sizes`
--

INSERT INTO `sizes` (`id`, `size`) VALUES
(1, 'Individual'),
(2, 'Matrimonial'),
(3, '3 piezas'),
(4, '2 piezas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `type_promotion`
--

CREATE TABLE `type_promotion` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `type_promotion`
--

INSERT INTO `type_promotion` (`id`, `name`) VALUES
(1, 'Mitad de precio'),
(2, 'Back Friday');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Status` varchar(50) DEFAULT 'Activo',
  `Rol` int(11) NOT NULL,
  `Direccion` varchar(255) DEFAULT NULL,
  `Telefono` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `Nombre`, `Email`, `Password`, `Status`, `Rol`, `Direccion`, `Telefono`) VALUES
(1, 'Yudy Garcia', 'Katherinyudy@gmail.com', 'Yk5678¿?', 'Activo', 2, NULL, NULL),
(2, 'Cris Garcia', 'crisgarcia2@cris.co', '1234', 'Activo', 1, 'Cra avenida septima #19b', '306876534'),
(3, 'Marquita', 'marquito@soy.sena', 'Yu5678??', 'Activo', 1, 'Cll 67c #19b', '3058765432'),
(4, 'Andrea Quemba', 'aquemba4@gmail.com', 'Yu5678??', 'Activo', 1, 'av 30 #106 -10', '3112233453'),
(5, 'Carlos Gómez', 'carlos.gomez@gmail.com', 'ruizcarlos123', 'Inactivo', 1, 'cra 43d #105f-4', '3209876568');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `materials`
--
ALTER TABLE `materials`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notificationId`),
  ADD KEY `userId` (`userId`);

--
-- Indices de la tabla `orderitems`
--
ALTER TABLE `orderitems`
  ADD PRIMARY KEY (`orderItemId`),
  ADD KEY `orderId` (`orderId`),
  ADD KEY `productId` (`productId`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `userId` (`userId`);

--
-- Indices de la tabla `productitems`
--
ALTER TABLE `productitems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_sizes` (`sizes`),
  ADD KEY `fk_materials` (`material`),
  ADD KEY `fk_colors` (`colors`),
  ADD KEY `fk_promotion_id` (`promotion_id`);

--
-- Indices de la tabla `productvariants`
--
ALTER TABLE `productvariants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `color_id` (`color_id`),
  ADD KEY `size_id` (`size_id`);

--
-- Indices de la tabla `product_colors`
--
ALTER TABLE `product_colors`
  ADD KEY `product_id` (`product_id`),
  ADD KEY `color_id` (`color_id`);

--
-- Indices de la tabla `product_materials`
--
ALTER TABLE `product_materials`
  ADD KEY `product_id` (`product_id`),
  ADD KEY `material_id` (`material_id`);

--
-- Indices de la tabla `product_sizes`
--
ALTER TABLE `product_sizes`
  ADD KEY `product_id` (`product_id`),
  ADD KEY `size_id` (`size_id`);

--
-- Indices de la tabla `promotions`
--
ALTER TABLE `promotions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `fk_promotion_type` (`promotion_type`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `type_promotion`
--
ALTER TABLE `type_promotion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `fk_rol_usuarios` (`Rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `materials`
--
ALTER TABLE `materials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notificationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `orderitems`
--
ALTER TABLE `orderitems`
  MODIFY `orderItemId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `productvariants`
--
ALTER TABLE `productvariants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `promotions`
--
ALTER TABLE `promotions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `type_promotion`
--
ALTER TABLE `type_promotion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `orderitems`
--
ALTER TABLE `orderitems`
  ADD CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `productitems` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `productitems`
--
ALTER TABLE `productitems`
  ADD CONSTRAINT `fk_colors` FOREIGN KEY (`colors`) REFERENCES `colors` (`id`),
  ADD CONSTRAINT `fk_materials` FOREIGN KEY (`material`) REFERENCES `materials` (`id`),
  ADD CONSTRAINT `fk_promotion_id` FOREIGN KEY (`promotion_id`) REFERENCES `promotions` (`id`),
  ADD CONSTRAINT `fk_sizes` FOREIGN KEY (`sizes`) REFERENCES `sizes` (`id`);

--
-- Filtros para la tabla `productvariants`
--
ALTER TABLE `productvariants`
  ADD CONSTRAINT `productvariants_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `productitems` (`id`),
  ADD CONSTRAINT `productvariants_ibfk_2` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`),
  ADD CONSTRAINT `productvariants_ibfk_3` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`id`);

--
-- Filtros para la tabla `product_colors`
--
ALTER TABLE `product_colors`
  ADD CONSTRAINT `product_colors_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `productitems` (`id`),
  ADD CONSTRAINT `product_colors_ibfk_2` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`);

--
-- Filtros para la tabla `product_materials`
--
ALTER TABLE `product_materials`
  ADD CONSTRAINT `product_materials_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `productitems` (`id`),
  ADD CONSTRAINT `product_materials_ibfk_2` FOREIGN KEY (`material_id`) REFERENCES `materials` (`id`);

--
-- Filtros para la tabla `product_sizes`
--
ALTER TABLE `product_sizes`
  ADD CONSTRAINT `product_sizes_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `productitems` (`id`),
  ADD CONSTRAINT `product_sizes_ibfk_2` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`id`);

--
-- Filtros para la tabla `promotions`
--
ALTER TABLE `promotions`
  ADD CONSTRAINT `fk_promotion_type` FOREIGN KEY (`promotion_type`) REFERENCES `type_promotion` (`id`),
  ADD CONSTRAINT `promotions_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `productitems` (`id`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_rol_usuarios` FOREIGN KEY (`Rol`) REFERENCES `rol` (`id_rol`);

DELIMITER $$
--
-- Eventos
--
CREATE DEFINER=`root`@`localhost` EVENT `check_promotions_daily` ON SCHEDULE EVERY 1 DAY STARTS '2024-11-30 23:31:03' ON COMPLETION NOT PRESERVE ENABLE DO CALL `update_promotions_status`()$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
