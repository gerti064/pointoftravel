-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 10, 2025 at 01:37 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pointoftravel`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `password`) VALUES
(5, 'gerti', '$2y$10$/es/sobvdR7wng.dHsGuDOfqe2lRD1R6CpdAxihK5M/nPZwkG7rUu');

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `trip_type` varchar(10) NOT NULL,
  `departure_location` varchar(255) NOT NULL,
  `departure_date` date NOT NULL,
  `return_date` date DEFAULT NULL,
  `number_of_adults` int(11) NOT NULL,
  `number_of_kids` int(11) NOT NULL,
  `travel_mode` varchar(10) NOT NULL,
  `hotel` varchar(255) DEFAULT NULL,
  `kids_ages` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `trip_type`, `departure_location`, `departure_date`, `return_date`, `number_of_adults`, `number_of_kids`, `travel_mode`, `hotel`, `kids_ages`, `created_at`) VALUES
(1, 'one-way', 'istanbul', '2222-02-22', NULL, 1, 0, '0', NULL, '[]', '2025-06-24 15:04:02'),
(2, 'one-way', 'istanbul', '3333-03-31', NULL, 1, 0, '0', NULL, '[]', '2025-06-24 15:05:54'),
(3, 'one-way', 'istanbul', '6666-06-06', NULL, 1, 0, '0', NULL, '[]', '2025-06-24 15:11:25'),
(4, 'one-way', 'istanbul', '5555-05-05', NULL, 1, 0, '0', NULL, '[]', '2025-06-24 15:14:22'),
(5, 'one-way', 'istanbul', '0333-03-31', NULL, 1, 0, '0', NULL, '[]', '2025-06-24 15:20:14'),
(6, 'two-way', 'istanbul', '0333-03-31', '4444-04-04', 1, 0, '0', NULL, '[]', '2025-06-25 13:10:45'),
(7, 'one-way', 'skopje', '2025-12-09', NULL, 3, 0, '0', 'bonita', '[]', '2025-06-25 15:10:53');

-- --------------------------------------------------------

--
-- Table structure for table `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_messages`
--

INSERT INTO `contact_messages` (`id`, `name`, `email`, `message`, `created_at`) VALUES
(1, 'Andet Fejzuli', '222@gmail.com', 'sdsd', '2025-06-24 15:41:27'),
(2, 'Andet Fejzuli', 'gerti@gmail.com', 'jttfl', '2025-06-24 15:54:29');

-- --------------------------------------------------------

--
-- Table structure for table `featured_items`
--

CREATE TABLE `featured_items` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `text` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `featured_items`
--

INSERT INTO `featured_items` (`id`, `title`, `text`, `image`) VALUES
(1, 'Beach Escapes', 'Relax on sun-soaked beaches and crystal-clear waters. ble\n', '/api/admin/uploads/IMG-20241215-WA0006.jpg'),
(2, 'Mountain Adventures', 'Find thrills and breathtaking views in the highlands.', 'path/to/p2.jpg'),
(3, 'City Tours', 'Immerse yourself in vibrant cultures and historic landmarks.', 'path/to/p3.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `featured_items`
--
ALTER TABLE `featured_items`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
