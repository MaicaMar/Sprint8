-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-02-2024 a las 13:47:18
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sprint8`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `events`
--

INSERT INTO `events` (`id`, `title`, `start`, `end`) VALUES
(1, 'aniversario', '2024-01-30 11:00:00', '2024-01-30 20:00:00'),
(3, 'rebajas', '2024-01-20 11:13:36', '2024-01-20 22:13:36'),
(4, 'Hola Isma!', '2024-02-15 11:00:00', '2024-02-29 12:00:00'),
(5, 'Reunión', '2024-02-05 12:00:00', '2024-02-05 17:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `graphics_barchart`
--

CREATE TABLE `graphics_barchart` (
  `id` int(11) NOT NULL,
  `year` int(11) DEFAULT NULL,
  `series_a` int(11) DEFAULT NULL,
  `series_b` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `graphics_barchart`
--

INSERT INTO `graphics_barchart` (`id`, `year`, `series_a`, `series_b`) VALUES
(1, 2006, 65, 28),
(2, 2007, 59, 48),
(3, 2008, 80, 40),
(4, 2009, 81, 19),
(5, 2010, 56, 86),
(6, 2011, 55, 27),
(7, 2012, 40, 90);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `graphics_piechart`
--

CREATE TABLE `graphics_piechart` (
  `id` int(11) NOT NULL,
  `month` varchar(255) NOT NULL,
  `toys` decimal(5,2) NOT NULL,
  `electronics` decimal(5,2) NOT NULL,
  `groceries` decimal(5,2) NOT NULL,
  `furniture` decimal(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `graphics_piechart`
--

INSERT INTO `graphics_piechart` (`id`, `month`, `toys`, `electronics`, `groceries`, `furniture`) VALUES
(1, 'January', 20.50, 10.30, 30.80, 38.40),
(2, 'February', 15.20, 25.00, 20.70, 39.10),
(3, 'March', 12.80, 32.00, 18.50, 36.70),
(4, 'April', 22.30, 18.60, 27.10, 31.90),
(5, 'May', 17.60, 24.30, 14.90, 43.20),
(6, 'June', 19.00, 15.80, 33.20, 31.90),
(7, 'July', 16.40, 21.70, 25.10, 36.80),
(8, 'August', 24.10, 12.60, 28.30, 34.90),
(9, 'September', 14.90, 28.50, 19.70, 36.90),
(10, 'October', 18.30, 20.20, 22.40, 39.10),
(11, 'November', 23.20, 14.80, 30.00, 31.90),
(12, 'December', 21.50, 17.10, 25.90, 35.50);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `locations`
--

CREATE TABLE `locations` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `locations`
--

INSERT INTO `locations` (`id`, `name`, `latitude`, `longitude`) VALUES
(1, 'Barcelona', 41.38510000, 2.17340000),
(2, 'Madrid', 40.41650000, -3.70256000),
(4, 'Carrer Aragó', 41.40566422, 2.18275522),
(5, 'Bau', 41.39755850, 2.19603527),
(6, 'Casa Maria', 41.39964218, 2.16042977),
(7, 'Sants-Montjuïc', 41.36484325, 2.14957073);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `location` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `phone`, `location`) VALUES
(1, 'Hola', 'Talqual', 'usuario@inventado.es', '987654345', 'Barcelona'),
(2, 'Maria', 'DB', 'maria@db.com', '888999777', 'Los Ángeles'),
(3, 'Guillermo', 'Toledo', 'guito@toto.com', '567765678', 'Madrid'),
(4, 'Paz', 'Padilla', 'paz@padilla.es', '888999777', 'Sevilla'),
(5, 'Paola', 'Pola', 'paola@pola.es', '777666555', 'Logroño'),
(6, 'Elena', 'Borbona', 'elena@borbona.es', '888555444', 'España'),
(7, 'Manola', 'Pez', 'manola@pez.es', '555666444', 'Málaga'),
(8, 'Maria', 'Mare', 'maria@mare.com', '999666444', 'San Marino'),
(9, 'Pepe', 'Rubianes', 'pepe@rubianes.com', '556453246', 'Barcelona'),
(10, 'Sara', 'Barrés', 'sara@barres.cat', '664353412', 'Valencia'),
(11, 'Lisa', 'Simpson', 'lisa@simpson.com', '987654321', 'EE.UU');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `graphics_barchart`
--
ALTER TABLE `graphics_barchart`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `graphics_piechart`
--
ALTER TABLE `graphics_piechart`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `graphics_barchart`
--
ALTER TABLE `graphics_barchart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `graphics_piechart`
--
ALTER TABLE `graphics_piechart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
