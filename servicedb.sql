-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 04, 2023 at 12:04 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `servicedb`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(255) NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `email` text NOT NULL,
  `tel` text NOT NULL,
  `status` text NOT NULL,
  `date_created` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `password`, `email`, `tel`, `status`, `date_created`) VALUES
(1, 'daniel', '1234', 'daniel@gmail.com', '0546533433', '1', '2023-12-12');

-- --------------------------------------------------------

--
-- Table structure for table `businessinfo`
--

CREATE TABLE `businessinfo` (
  `id` int(255) NOT NULL,
  `name` text NOT NULL,
  `address` text NOT NULL,
  `phone` text NOT NULL,
  `email` text NOT NULL,
  `about` longtext NOT NULL,
  `heading` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `businessinfo`
--

INSERT INTO `businessinfo` (`id`, `name`, `address`, `phone`, `email`, `about`, `heading`) VALUES
(1, 'Assouman Services', 'Accra', '+22222222222', 'daniels@gmal.com', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita natus ad sed harum itaque ullam enim quas, veniam accusantium, quia animi id eos adipisci iusto molestias asperiores explicabo cum vero atque amet corporis! Soluta illum facere consequuntur magni. Ullam dolorem repudiandae cumque voluptate consequatur consectetur, eos provident necessitatibus reiciendis corrupti!\r\n													\r\n													\r\n													\r\n													\r\n													\r\n													\r\n													\r\n													\r\n													\r\n													\r\n													\r\n													\r\n													\r\n													\r\n													', 'The tiger is the largest cat species, most recognisable for their pattern of dark vertical stripes on reddish-girl\r\n													\r\n													\r\n													'),
(2, '', 'Cape Coast', '+253354456677', 'dan@gmail.com', '', ''),
(4, '', 'Aboom Wells', '0269264768', 'danielpmensah926@gmail.com', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `compltedorders`
--

CREATE TABLE `compltedorders` (
  `id` int(255) NOT NULL,
  `user_id` bigint(255) NOT NULL,
  `bookingId` varchar(255) NOT NULL,
  `user_name` text NOT NULL,
  `Tel_house` varchar(255) NOT NULL,
  `Tel` varchar(255) NOT NULL,
  `region` text NOT NULL,
  `address` varchar(255) NOT NULL,
  `house_no` text NOT NULL,
  `book_date` text NOT NULL,
  `bookingtime` text NOT NULL,
  `email` text NOT NULL,
  `price` text NOT NULL,
  `type` text NOT NULL,
  `package` text NOT NULL,
  `completed` int(255) NOT NULL,
  `response` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `email` text NOT NULL,
  `feedback` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `user_id`, `email`, `feedback`, `date`) VALUES
(1, 1, 'de@gmail.com', 'Nice', '2022-12-24 15:25:50'),
(2, 2, 'malo@gmail.com', 'Great', '2022-12-24 15:25:57'),
(3, 3, 'bob@gmail.comm', 'Good', '2022-12-24 15:25:59'),
(4, 4, 'daniel@gmail.com', 'asdf', '2022-12-24 15:26:04');

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` text NOT NULL,
  `message` varchar(255) NOT NULL,
  `msg_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `name`, `email`, `message`, `msg_date`) VALUES
(1, 'paul', 'oseiagyeiwaa@yahoo.com', 'hello', '2022-12-22 18:04:06'),
(2, 'mato', 'lolo@gmail.com', 'Hi\r\n', '2022-12-22 18:04:06'),
(3, 'paul', 'daniel@gmail.com', 'Hey', '2022-12-22 18:04:06'),
(4, 'pail', 'yaa@yahoo.com', 'Sap', '2022-12-22 18:06:32');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(255) NOT NULL,
  `user_id` bigint(255) NOT NULL,
  `bookingId` varchar(255) NOT NULL,
  `user_name` text NOT NULL,
  `Tel_house` varchar(255) NOT NULL,
  `Tel` varchar(255) NOT NULL,
  `region` text NOT NULL,
  `address` varchar(255) NOT NULL,
  `house_no` text NOT NULL,
  `book_date` text NOT NULL,
  `bookingtime` text NOT NULL,
  `email` text NOT NULL,
  `price` bigint(255) NOT NULL,
  `type` text NOT NULL,
  `package` text NOT NULL,
  `completed` int(255) NOT NULL,
  `response` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `bookingId`, `user_name`, `Tel_house`, `Tel`, `region`, `address`, `house_no`, `book_date`, `bookingtime`, `email`, `price`, `type`, `package`, `completed`, `response`) VALUES
(88, 3833, 'SQID33364', 'Daniel024419', '09287254223', '231e13', 'Central Region', 'Abura Street', '3459988', '2022-12-29T17:31', '17:32:31 29/11/2022', 'danielpmensah926@gmail.com', 1000, 'Errands', 'Errands', 1, 'Quick'),
(89, 4536, 'SQID36687', 'Daniel024419', '09287254223', '231e13', 'Central Region', 'Abura Street', '3459988', '2022-12-29T17:31', '17:32:31 29/11/2022', 'poo@gmail.com', 1009, 'Errands', 'Errands', 1, 'Quick'),
(90, 4541, 'SQID41116', ' Bogoo', '0244868409', '231e13', 'Ghana', 'Aboom Wells', '3459988', '2022-12-30T17:41', '17:39:27 29/11/2022', 'd1@gmail.com', 709, 'Cleaning', 'Cleaning', 1, 'Quick'),
(92, 1649, 'SQID4924', ' Bo', '90000000', '999999999999', 'Ghana', 'Ghana Audit Service', '00000', '2022-12-30T17:47', '17:46:46 29/11/2022', 'oseiagyeiwaa@yahoo.com', 709, 'Cleaning', 'Cleaning', 1, 'Quick'),
(93, 3057, 'SQID57877', ' Bo', '90000000', '999999999999', 'Ghana', 'Ghana Audit Service', '00000', '2022-12-29T18:05', '17:57:11 29/11/2022', 'obo@yahoo.com', 709, 'Cleaning', 'Cleaning', 1, 'Quick'),
(94, 2, 'SID38246', 'USER', '+23300000000', '0269264768', 'Central Region', 'Aboom Wells', '3459988', '2022-12-31T11:40', '11:11:2 31/11/2022', 'user@gmail.com', 849, 'Teaching', 'Teaching', 1, 'Quick'),
(95, 408, 'SQID8191', 'Daniel024419', '0244868409', '999999999999', 'Ghana', 'Ghana Audit Service', '00000', '2023-01-20T12:08', '12:7:42 1/0/2023', 'oseiagyeiwaa@yahoo.com', 849, 'Teaching', 'Teaching', 1, 'Quick'),
(96, 239, 'SQID9353', 'Daniel024419', '0244868409', '999999999999', 'Ghana', 'Ghana Audit Service', '00000', '2023-01-20T12:08', '12:9:18 1/0/2023', 'oseiagyeiwaa@yahoo.com', 849, 'Teaching', 'Teaching', 1, 'Quick'),
(99, 369, 'SQID9770', 'Daniel024419', '0244868409', '999999999999', 'Ghana', 'Ghana Audit Service', '00000', '2023-01-20T12:08', '12:9:18 1/0/2023', 'oseiagyeiwaa@yahoo.com', 849, 'Teaching', 'Teaching', 0, 'Quick'),
(100, 419, 'SQID9185', 'Daniel024419', '0244868409', '999999999999', 'Ghana', 'Ghana Audit Service', '00000', '2023-01-20T12:08', '12:9:18 1/0/2023', 'oseiagyeiwaa@yahoo.com', 849, 'Teaching', 'Teaching', 0, 'Quick'),
(101, 1011, 'SQID11726', 'Daniel024419', '0244868409', '999999999999', 'Ghana', 'Ghana Audit Service', '00000', '2023-01-20T12:08', '12:9:18 1/0/2023', 'oseiagyeiwaa@yahoo.com', 849, 'Teaching', 'Teaching', 0, 'Quick'),
(102, 2, 'SID8582', 'USER', '+23300000000', '0269264768', 'Central Region', 'Aboom Wells', '3459988', '2023-01-11T15:08', '15:6:23 2/0/2023', 'user@gmail.com', 1900, 'Errands', 'Errands', 0, 'Quick'),
(103, 2, 'SID6662', 'USER', '+23300000000', '0269264768', 'Central Region', 'Aboom Wells', '3459988', '2023-01-24T20:06', '20:5:21 2/0/2023', 'user@gmail.com', 709, 'Cleaning', 'Cleaning', 0, 'Quick'),
(105, 4952, 'SQID52932', 'daniel', '876543', '0017165242', 'Ghana', 'Aboom Wells', '3459988', '2023-02-01T16:52', '16:36:24 3/0/2023', 'dan@gmail.com', 849, 'Teaching', 'Teaching', 0, 'Quick'),
(106, 5352, 'SQID52171', 'daniel', '876543', '0017165242', 'Ghana', 'Aboom Wells', '3459988', '2023-02-01T16:52', '16:36:24 3/0/2023', 'dan@gmail.com', 849, 'Teaching', 'Teaching', 1, 'Quick'),
(107, 5552, 'SQID52727', 'daniel', '876543', '0017165242', 'Ghana', 'Aboom Wells', '3459988', '2023-02-01T16:52', '16:36:24 3/0/2023', 'dan@gmail.com', 849, 'Teaching', 'Teaching', 1, 'Quick'),
(108, 169, 'SQID9289', 'daniel', '876543', '0017165242', 'Ghana', 'Aboom Wells', '3459988', '2023-02-01T16:52', '17:1:0 3/0/2023', 'dan@gmail.com', 849, 'Teaching', 'Teaching', 0, 'Quick'),
(111, 2, 'BKID8610', 'USER', '+23300000000', '0269264768', 'Central Region', 'Aboom Wells', '3459988', '2023-01-03T14:08', '10:53:25 4/0/2023', 'user@gmail.com', 11001, 'weeding ', 'Premium', 0, 'Quick'),
(112, 2, 'SID3414', 'USER', '+23300000000', '0269264768', 'Central Region', 'Aboom Wells', '3459988', '2023-01-27T12:34', '12:31:3 7/0/2023', 'user@gmail.com', 899, 'Documentation', 'Documentation', 0, 'Quick');

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

CREATE TABLE `packages` (
  `id` int(255) NOT NULL,
  `package_type` text NOT NULL,
  `type` text NOT NULL,
  `max_price` varchar(255) NOT NULL,
  `min_price` varchar(255) NOT NULL,
  `package_links` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `packages`
--

INSERT INTO `packages` (`id`, `package_type`, `type`, `max_price`, `min_price`, `package_links`) VALUES
(1, 'Basic', 'Houses', '100', '609', '/package-basic'),
(2, 'Pro', 'Community', '700', '900', '/package-pro'),
(3, 'Premium', 'Occasions', '1000', '2000', '/package-premium');

-- --------------------------------------------------------

--
-- Table structure for table `package_basic`
--

CREATE TABLE `package_basic` (
  `id` int(255) NOT NULL,
  `price` bigint(255) NOT NULL,
  `types` text NOT NULL,
  `package_type` varchar(255) NOT NULL,
  `addons` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `package_basic`
--

INSERT INTO `package_basic` (`id`, `price`, `types`, `package_type`, `addons`) VALUES
(2, 9801, 'BedRoom', 'Basic', 'All'),
(3, 560, 'Kitchen', 'Basic', 'All'),
(4, 800, 'Farm', 'Basic', 'All');

-- --------------------------------------------------------

--
-- Table structure for table `package_premium`
--

CREATE TABLE `package_premium` (
  `id` int(255) NOT NULL,
  `price` text NOT NULL,
  `types` text NOT NULL,
  `package_type` varchar(255) NOT NULL,
  `addons` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `package_premium`
--

INSERT INTO `package_premium` (`id`, `price`, `types`, `package_type`, `addons`) VALUES
(1, '5000', 'NGO', 'Premium', 'All'),
(2, '4000', 'School', 'Premium', 'ALL'),
(3, '9000', 'Church', 'Premium', 'All'),
(5, '11001', 'weeding', 'Premium', 'pillow'),
(6, '100', 'Quivo', 'Premium', 'pillow');

-- --------------------------------------------------------

--
-- Table structure for table `package_pro`
--

CREATE TABLE `package_pro` (
  `id` int(255) NOT NULL,
  `price` bigint(255) NOT NULL,
  `types` text NOT NULL,
  `package_type` varchar(255) NOT NULL,
  `addons` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `package_pro`
--

INSERT INTO `package_pro` (`id`, `price`, `types`, `package_type`, `addons`) VALUES
(1, 1009, 'Compund', 'Pro', 'Tabs'),
(2, 1200, 'Public Washroom', 'Pro', 'ALl'),
(3, 1300, 'Street', 'Pro', 'All'),
(6, 909, 'Park', 'Pro', 'All');

-- --------------------------------------------------------

--
-- Table structure for table `quickusers`
--

CREATE TABLE `quickusers` (
  `id` int(255) NOT NULL,
  `userId` bigint(255) NOT NULL,
  `bookingId` text NOT NULL,
  `user_name` text NOT NULL,
  `Tel_house` text NOT NULL,
  `Tel` text NOT NULL,
  `region` text NOT NULL,
  `address` varchar(255) NOT NULL,
  `house_no` varchar(255) NOT NULL,
  `email` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quickusers`
--

INSERT INTO `quickusers` (`id`, `userId`, `bookingId`, `user_name`, `Tel_house`, `Tel`, `region`, `address`, `house_no`, `email`, `date`) VALUES
(34, 81, 'SQID1320', 'Daniel024419', '90000000', '987654', '', 'Abo', '5678', '7@gmail.com', '2022-12-29 17:01:08'),
(36, 3833, 'SQID33364', 'Daniel024419', '09287254223', '231e13', 'Central Region', 'Abura Street', '3459988', 'danielpmensah926@gmail.com', '2022-12-29 17:33:38'),
(37, 4536, 'SQID36687', 'Daniel024419', '09287254223', '231e13', 'Central Region', 'Abura Street', '3459988', 'poo@gmail.com', '2022-12-29 17:36:45'),
(39, 3247, 'SQID47843', ' Bo', '90000000', '999999999999', 'Ghana', 'Ghana Audit Service', '00000', 'oseiagyeiwaa@yahoo.com', '2022-12-29 17:47:32'),
(41, 3057, 'SQID57877', ' Bo', '90000000', '999999999999', 'Ghana', 'Ghana Audit Service', '00000', 'obo@yahoo.com', '2022-12-29 18:05:58'),
(42, 408, 'SQID8191', 'Daniel024419', '0244868409', '999999999999', 'Ghana', 'Ghana Audit Service', '00000', 'oseiagyeiwaa@yahoo.com', '2023-01-01 12:08:40'),
(43, 239, 'SQID9353', 'Daniel024419', '0244868409', '999999999999', 'Ghana', 'Ghana Audit Service', '00000', 'oseiagyeiwaa@yahoo.com', '2023-01-01 12:09:23'),
(44, 289, 'SQID9250', 'Daniel024419', '0244868409', '999999999999', 'Ghana', 'Ghana Audit Service', '00000', 'oseiagyeiwaa@yahoo.com', '2023-01-01 12:09:28'),
(45, 319, 'SQID9571', 'Daniel024419', '0244868409', '999999999999', 'Ghana', 'Ghana Audit Service', '00000', 'oseiagyeiwaa@yahoo.com', '2023-01-01 12:09:31'),
(46, 369, 'SQID9770', 'Daniel024419', '0244868409', '999999999999', 'Ghana', 'Ghana Audit Service', '00000', 'oseiagyeiwaa@yahoo.com', '2023-01-01 12:09:36'),
(47, 419, 'SQID9185', 'Daniel024419', '0244868409', '999999999999', 'Ghana', 'Ghana Audit Service', '00000', 'oseiagyeiwaa@yahoo.com', '2023-01-01 12:09:41'),
(48, 1011, 'SQID11726', 'Daniel024419', '0244868409', '999999999999', 'Ghana', 'Ghana Audit Service', '00000', 'oseiagyeiwaa@yahoo.com', '2023-01-01 12:11:10'),
(49, 4952, 'SQID52932', 'daniel', '876543', '0017165242', 'Ghana', 'Aboom Wells', '3459988', 'dan@gmail.com', '2023-01-03 16:52:49'),
(50, 5352, 'SQID52171', 'daniel', '876543', '0017165242', 'Ghana', 'Aboom Wells', '3459988', 'dan@gmail.com', '2023-01-03 16:52:53'),
(51, 5552, 'SQID52727', 'daniel', '876543', '0017165242', 'Ghana', 'Aboom Wells', '3459988', 'dan@gmail.com', '2023-01-03 16:52:55');

-- --------------------------------------------------------

--
-- Table structure for table `region`
--

CREATE TABLE `region` (
  `id` int(255) NOT NULL,
  `regionName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `region`
--

INSERT INTO `region` (`id`, `regionName`) VALUES
(1, 'Central'),
(2, 'Western'),
(3, 'Northen'),
(4, 'Eastern');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `hour_price` bigint(255) NOT NULL,
  `availabilty` varchar(255) NOT NULL,
  `control` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `name`, `hour_price`, `availabilty`, `control`) VALUES
(1, 'Errands', 109, 'Yes', 1),
(2, 'Cleaning', 709, 'Yes', 1),
(3, 'Teaching', 849, 'Yes', 1),
(5, 'Singing', 975, 'Yes', 1),
(6, 'Painting', 89911, 'Yes', 1),
(11, 'Documentation', 899, 'Yes', 1),
(12, 'Wig', 877, 'Yes', 1);

-- --------------------------------------------------------

--
-- Table structure for table `subscribers`
--

CREATE TABLE `subscribers` (
  `id` int(255) NOT NULL,
  `email` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subscribers`
--

INSERT INTO `subscribers` (`id`, `email`, `date`) VALUES
(1, 'danielpmensah926@gmail.com', '2022-12-22 18:08:52'),
(2, 'kjhgf@gmail.com', '2023-01-03 18:46:15'),
(3, 'daniel@gmail.com', '2023-01-04 19:03:31');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `tel_house` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `region` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `house_no` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `userstatus` int(255) NOT NULL,
  `date_created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `tel_house`, `telephone`, `region`, `address`, `house_no`, `email`, `password`, `userstatus`, `date_created`) VALUES
(1, 'DanielPeey', '054111111111', '024111111111', 'Central region', 'Abura,cape coast', 'AV95', 'danielpmensah926@gmail.com', 'admin', 1, '2022-12-12 00:00:00'),
(2, 'USER', '+23300000000', '0269264768', 'Central Region', 'Aboom Wells', '3459988', 'user@gmail.com', 'user', 0, '2022-12-22 14:30:58'),
(6, 'daniel123', 'dfdf', '0269264768', 'Central Region', 'Abura Street', '3459988', 'danielpmensah926@gmail.com', '11222e', 0, '2022-12-18 16:19:09'),
(7, ' Bogoobo', '+233269264768', '0269264768', 'Central Region', 'Aboom Wells', '3459988', 'danielpmensah926@gmail.com', 'asd', 0, '2022-12-18 16:20:38'),
(8, 'Boooo', '23r', '0244868409', 'Ghana', 'Aboom Wells', '33', 'danielpmensah926@gmail.com', 'def', 0, '2022-12-18 16:24:04'),
(12, 'baba', '+233269264768', '+233269264768', 'Ghana', 'Aboom Wells', 'qw', 'saa@gmail.com', '123', 1, '2022-12-22 14:38:00'),
(18, 'paul', '+233269000000', '+23320000000', 'Ghana', 'Aboom Wells', '87867', 'wee@gmail.com', '0000', 1, '2023-01-07 15:30:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `businessinfo`
--
ALTER TABLE `businessinfo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `compltedorders`
--
ALTER TABLE `compltedorders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `package_basic`
--
ALTER TABLE `package_basic`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `package_premium`
--
ALTER TABLE `package_premium`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `package_pro`
--
ALTER TABLE `package_pro`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quickusers`
--
ALTER TABLE `quickusers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `region`
--
ALTER TABLE `region`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscribers`
--
ALTER TABLE `subscribers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `businessinfo`
--
ALTER TABLE `businessinfo`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `compltedorders`
--
ALTER TABLE `compltedorders`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT for table `packages`
--
ALTER TABLE `packages`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `package_basic`
--
ALTER TABLE `package_basic`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `package_premium`
--
ALTER TABLE `package_premium`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `package_pro`
--
ALTER TABLE `package_pro`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `quickusers`
--
ALTER TABLE `quickusers`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `region`
--
ALTER TABLE `region`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `subscribers`
--
ALTER TABLE `subscribers`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
