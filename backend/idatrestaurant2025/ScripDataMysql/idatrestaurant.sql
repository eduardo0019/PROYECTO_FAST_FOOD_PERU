-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-07-2025 a las 03:35:35
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `idatrestaurant`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mesa`
--

CREATE TABLE `mesa` (
  `idmesa` int(11) NOT NULL,
  `codigoinventario` varchar(10) NOT NULL,
  `nombremessa` varchar(10) NOT NULL,
  `descripcionmesa` varchar(150) NOT NULL,
  `ubicacionmesa` varchar(100) NOT NULL,
  `cantidadsillas` int(2) NOT NULL,
  `fecharegistro` date NOT NULL,
  `usuario` int(2) NOT NULL,
  `estadouso` int(2) NOT NULL,
  `estadogeneral` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mesa`
--

INSERT INTO `mesa` (`idmesa`, `codigoinventario`, `nombremessa`, `descripcionmesa`, `ubicacionmesa`, `cantidadsillas`, `fecharegistro`, `usuario`, `estadouso`, `estadogeneral`) VALUES
(1, '100725-1', 'Mesa 01', 'Mesa de Vidrio templado', 'Ventana izquierda', 6, '2025-07-10', 1, 1, 1),
(2, '100725-2', 'Mesa 02', 'Mesa de madera Caoba', 'Centro del ambiente', 4, '2025-07-10', 1, 1, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `mesa`
--
ALTER TABLE `mesa`
  ADD PRIMARY KEY (`idmesa`),
  ADD UNIQUE KEY `nombremessa` (`nombremessa`),
  ADD UNIQUE KEY `codigoinventario` (`codigoinventario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `mesa`
--
ALTER TABLE `mesa`
  MODIFY `idmesa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
