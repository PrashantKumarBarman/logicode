-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 08, 2022 at 07:51 PM
-- Server version: 10.6.4-MariaDB
-- PHP Version: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `logicode`
--

-- --------------------------------------------------------

--
-- Table structure for table `mobile_contacts`
--

CREATE TABLE `mobile_contacts` (
  `id` int(11) NOT NULL,
  `mobile` varchar(16) NOT NULL,
  `time_zone` varchar(255) NOT NULL,
  `created_on` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `sent_messages`
--

CREATE TABLE `sent_messages` (
  `id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `message` varchar(1000) NOT NULL,
  `message_sid` varchar(34) DEFAULT NULL,
  `message_type` varchar(16) NOT NULL,
  `audio_file_name` varchar(255) NOT NULL,
  `status` varchar(32) DEFAULT NULL,
  `created_on` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mobile_contacts`
--
ALTER TABLE `mobile_contacts`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mobile_contacts`
--
ALTER TABLE `mobile_contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
