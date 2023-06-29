-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Erstellungszeit: 29. Jun 2023 um 15:18
-- Server-Version: 5.7.42
-- PHP-Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `fwa_ss23`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `orders`
--

CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shipping_method` varchar(255) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `order_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `orders`
--

INSERT INTO `orders` (`id`, `shipping_method`, `payment_method`, `order_date`, `user_id`) VALUES
(2, 'express', 'PayPal', '2023-06-29 14:44:18', 1),
(3, 'express', 'PayPal', '2023-06-29 15:11:33', 1),
(4, 'express', 'PayPal', '2023-06-29 15:12:48', 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_slug` varchar(255) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_available` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_slug` (`product_slug`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `products`
--

INSERT INTO `products` (`id`, `product_slug`, `product_name`, `price`, `image_url`, `description`, `is_available`) VALUES
(1, 'thymian', 'Thymian', 0.99, 'assets/images/Thymian.png', 'Ein Bündel Thymian', 1),
(2, 'rosmarin', 'Rosmarin', 0.99, 'assets/images/Rosmarin.png', 'Ein Bündel Rosmarin', 1),
(3, 'basilikum', 'Basilikum', 0.99, 'assets/images/Basilikum.png', 'Ein Bündel Basilikum', 1),
(4, 'vanille', 'Vanille', 0.99, 'assets/images/Vanille.png', 'Ein Bündel Vanille', 1),
(5, 'safran', 'Safran', 0.99, 'assets/images/Safran.png', 'Ein Bündel Safran', 1),
(6, 'trüffel', 'Trüffel', 0.99, 'assets/images/Trüffel.png', 'Ein Bündel Trüffel', 1),
(7, 'mahlab', 'Mahlab', 0.99, 'assets/images/Mahlab.png', 'Ein Bündel Mahlab', 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `product_orders`
--

CREATE TABLE IF NOT EXISTS `product_orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `amount` int(11) NOT NULL,
  `discount` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `product_orders`
--

INSERT INTO `product_orders` (`id`, `order_id`, `product_id`, `amount`, `discount`) VALUES
(1, 2, 1, 1, '0.00'),
(2, 2, 3, 3, '0.00'),
(3, 3, 1, 1, '0.00'),
(4, 3, 3, 3, '0.00'),
(5, 3, 2, 34, '0.00'),
(6, 3, 7, 11, '0.00'),
(7, 3, 6, 10, '0.00'),
(8, 3, 4, 10, '0.00'),
(9, 3, 5, 10, '0.00'),
(10, 4, 1, 1, '0.00'),
(11, 4, 3, 3, '0.00'),
(12, 4, 6, 4, '0.00'),
(13, 4, 5, 3, '0.00');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(512) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `postcode` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `password`, `first_name`, `last_name`, `postcode`, `city`, `street`, `email`, `phone`) VALUES
(1, 'pass', 'Heinz', 'Heinrich', '12345', 'Stadt', 'Straße 5', 'heinz@example.mail', '0123456789');

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints der Tabelle `product_orders`
--
ALTER TABLE `product_orders`
  ADD CONSTRAINT `product_orders_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `product_orders_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
