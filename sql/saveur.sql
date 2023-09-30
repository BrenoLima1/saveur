-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 30, 2023 at 03:04 PM
-- Server version: 5.7.36
-- PHP Version: 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `saveur`
--

-- --------------------------------------------------------

--
-- Table structure for table `funcionarios`
--

DROP TABLE IF EXISTS `funcionarios`;
CREATE TABLE IF NOT EXISTS `funcionarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(20) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `nome` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login` (`login`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `funcionarios`
--

INSERT INTO `funcionarios` (`id`, `login`, `senha`, `nome`) VALUES
(1, 'micaela', '$2y$10$3wrDOZsK1./xAxHF.LNub..M.6JPxH/H2GW3zz5FpZxo9v5aOAkgC', 'Micaela'),
(2, 'breno', '$2y$10$3wrDOZsK1./xAxHF.LNub..M.6JPxH/H2GW3zz5FpZxo9v5aOAkgC', 'Breno'),
(3, 'ana', '$2y$10$3wrDOZsK1./xAxHF.LNub..M.6JPxH/H2GW3zz5FpZxo9v5aOAkgC', 'Ana');

-- --------------------------------------------------------

--
-- Table structure for table `mesas`
--

DROP TABLE IF EXISTS `mesas`;
CREATE TABLE IF NOT EXISTS `mesas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numero` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `numero` (`numero`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `mesas`
--

INSERT INTO `mesas` (`id`, `numero`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);

-- --------------------------------------------------------

--
-- Table structure for table `reservas`
--

DROP TABLE IF EXISTS `reservas`;
CREATE TABLE IF NOT EXISTS `reservas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_funcionario` int(11) NOT NULL,
  `id_mesa` int(11) NOT NULL,
  `cliente` varchar(200) NOT NULL,
  `dia` date NOT NULL,
  `horario` time NOT NULL,
  `situacao` varchar(12) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_funcionario` (`id_funcionario`),
  KEY `fk_id_mesa` (`id_mesa`)
) ENGINE=MyISAM AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `reservas`
--

INSERT INTO `reservas` (`id`, `id_funcionario`, `id_mesa`, `cliente`, `dia`, `horario`, `situacao`) VALUES
(1, 2, 1, 'João', '2025-01-01', '11:00:00', 'cancelada'),
(47, 2, 1, 'Breno dos Santos Lima', '2023-03-02', '11:00:00', 'cancelada'),
(48, 2, 1, 'q q', '2023-03-02', '12:01:00', 'cancelada'),
(49, 2, 1, 'Breno dos Santos Lima', '2023-03-02', '11:00:00', 'cancelada'),
(43, 2, 1, 'qq', '2024-01-02', '11:00:00', 'cancelada'),
(46, 2, 1, 'q q', '2023-03-02', '11:00:00', 'cancelada'),
(41, 2, 1, 'qq', '2026-01-01', '11:00:00', 'cancelada'),
(45, 2, 1, 'Breno dos Santos Lima', '2023-03-02', '12:23:00', 'cancelada'),
(44, 2, 1, 'Breno dos Santos Lima', '2024-01-02', '13:00:00', 'cancelada'),
(38, 2, 1, 'q q', '2024-02-01', '11:00:00', 'cancelada'),
(36, 2, 1, 'q q', '2025-01-01', '11:00:00', 'cancelada'),
(50, 2, 1, 'q q', '2023-03-03', '11:21:00', 'em espera'),
(51, 2, 1, 'q q', '2027-06-04', '12:48:00', 'cancelada'),
(52, 2, 1, 'q q', '2026-07-24', '12:59:00', 'cancelada'),
(53, 2, 1, 'breno', '2024-01-01', '13:00:00', 'cancelada'),
(54, 2, 3, 'Breno dos Santos Lima', '2023-04-15', '13:01:00', 'cancelada'),
(55, 2, 2, 'Breno dos Santos Lima', '2023-04-15', '13:01:00', 'em espera'),
(56, 2, 7, 'Breno dos Santos Lima', '2023-05-27', '12:29:00', 'em espera'),
(57, 2, 1, 'Breno dos Santos Lima', '2037-06-28', '11:33:00', 'em espera'),
(58, 2, 1, 'Breno dos Santos Lima', '2065-02-01', '12:59:00', 'em espera'),
(59, 2, 3, 'Breno', '2025-05-03', '13:00:00', 'em espera'),
(60, 2, 3, 'Breno dos Santos Lima', '2027-04-04', '13:00:00', 'em espera');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
