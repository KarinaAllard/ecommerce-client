-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 28, 2025 at 08:50 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(10) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(60) DEFAULT NULL,
  `phone` varchar(30) NOT NULL,
  `street_address` varchar(100) NOT NULL,
  `postal_code` varchar(30) NOT NULL,
  `city` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `firstname`, `lastname`, `email`, `password`, `phone`, `street_address`, `postal_code`, `city`, `country`, `created_at`) VALUES
(1, 'Harrier', 'Du Bois', 'tequila_sunset@rcm.com', 'dora', '451451451451', '11 Voyager Road', '000', 'Jamrock', 'Le Caillou', '2025-03-11 08:54:07'),
(2, 'Raphaël Ambrosius', 'Costeau', 'tequila_4_lyfe@rcm.com', 'dora', '451451', '11 Voyager Road', '000', 'Jamrock', 'Le Caillou', '2025-03-11 08:59:09'),
(3, 'Kim', 'Kitsuragi', 'kimball@rcm.com', 'speedfreaks', '012343567', 'Martin Martinaise 42', '432434', 'Jamrock', 'Revachol', '2025-03-12 14:23:04'),
(5, 'Tommy', 'Le Homme', 'tommy_the_trubadour@faln.com', 'family', '123456789', 'Far from Home', '123456', 'Unknown', 'Le Caillou', '2025-03-13 08:03:32'),
(7, 'Klaasje', 'Amandou', 'totallynotaspy@oranje.com', 'oranjelit', '123456789', 'Whirling In Rags', '1234567', 'Martinaise', 'Le Caillou', '2025-03-13 11:44:48'),
(9, 'Harrier', 'Du Boise', 'tequila.sunset@rcm.com', 'doombringer', '123456', '123456', '123123', '123123', '123123', '2025-03-25 08:55:53');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(10) NOT NULL,
  `customer_id` int(10) NOT NULL,
  `total_price` int(5) NOT NULL,
  `payment_status` varchar(30) NOT NULL,
  `payment_id` varchar(200) DEFAULT NULL,
  `order_status` varchar(30) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customer_id`, `total_price`, `payment_status`, `payment_id`, `order_status`, `created_at`) VALUES
(1, 1, 7256, 'unpaid', '', 'processing', '2025-03-11 09:16:48'),
(2, 2, 1765, 'processing', '', 'pending', '2025-03-17 12:08:52'),
(18, 1, 227, 'paid', 'pi_3R70PUJgBMb1kgR61mLF91cy', 'processing', '2025-03-26 20:18:26'),
(19, 3, 375, 'Paid', 'pi_3R70cTJgBMb1kgR61DQDS3wM', 'Received', '2025-03-26 20:31:48'),
(20, 3, 375, 'Paid', 'pi_3R70dXJgBMb1kgR60K5ABzlB', 'Received', '2025-03-26 20:33:04'),
(21, 3, 1644, 'Paid', 'pi_3R70eyJgBMb1kgR60kCl2nqX', 'Received', '2025-03-26 20:34:33'),
(22, 3, 1644, 'Paid', 'pi_3R70fkJgBMb1kgR603Iky3Vt', 'Received', '2025-03-26 20:35:20'),
(70, 1, 53, 'Paid', 'cs_test_a1mGEtbGP3qzV6MeZ439Ae1CTxJUztI9YirRL3s0aLaHwCCsRH8KdKBOuP', 'Received', '2025-03-28 19:47:19');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(10) NOT NULL,
  `order_id` int(10) NOT NULL,
  `product_id` int(10) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `quantity` int(5) NOT NULL,
  `unit_price` int(5) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `product_name`, `quantity`, `unit_price`, `created_at`) VALUES
(1, 1, 1, 'Horrific Necktie', 8, 907, '2025-03-11 09:16:48'),
(3, 2, 3, 'Flare-cut Trousers', 3, 395, '2025-03-17 12:08:52'),
(4, 2, 7, 'Oversized Superstar Sunglasses', 10, 58, '2025-03-17 12:08:52'),
(6, 18, 6, 'Amphibian Sports Visor', 2, 79, '2025-03-26 20:18:26'),
(7, 18, 17, 'Orange Bum Hat', 1, 69, '2025-03-26 20:18:26'),
(8, 19, 6, 'Amphibian Sports Visor', 3, 79, '2025-03-26 20:31:48'),
(9, 19, 17, 'Orange Bum Hat', 2, 69, '2025-03-26 20:31:48'),
(10, 20, 6, 'Amphibian Sports Visor', 3, 79, '2025-03-26 20:33:04'),
(11, 20, 17, 'Orange Bum Hat', 2, 69, '2025-03-26 20:33:04'),
(12, 21, 4, 'Disco-Ass Blazer', 1, 1644, '2025-03-26 20:34:33'),
(13, 22, 4, 'Disco-Ass Blazer', 1, 1644, '2025-03-26 20:35:20'),
(96, 70, 9, 'FRITTTE Plastic Rain Coat', 1, 53, '2025-03-28 19:47:19');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `price` int(5) NOT NULL,
  `stock` int(4) NOT NULL,
  `category` varchar(100) NOT NULL,
  `image` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `stock`, `category`, `image`, `created_at`) VALUES
(1, 'Horrific Necktie', 'The necktie is adorned with a garish pattern. It\'s disturbingly vivid. Somehow you feel as if it would be wrong to ever take it off. It\'s your friend now. You will betray it if you change it for some boring scarf.', 907, 68, 'Neckwear', 'https://static.wikia.nocookie.net/discoelysium_gamepedia_en/images/4/43/Neck_tie.png', '2025-03-11 08:31:54'),
(2, 'Green Snakeskin Shoes', 'They may have lost some of their lustre over the years, but these green crocodile leather shoes fit you perfectly.', 132, 0, 'Shoes', 'https://static.wikia.nocookie.net/discoelysium_gamepedia_en/images/5/57/Shoes_snakeskin.png/', '2025-03-11 09:10:41'),
(3, 'Flare-cut Trousers', 'These golden brown trousers are flare-cut. Normal bell-bottom trousers would be boot-cut, but these are far from normal.', 395, 17, 'Pants', 'https://static.wikia.nocookie.net/discoelysium_gamepedia_en/images/c/c5/Pants_bellbottom.png', '2025-03-11 09:32:53'),
(4, 'Disco-Ass Blazer', 'Looks like someone skinned this blazer off some long extinct disco-animal. It has an enigmatic white rectangle on the back and the right sleeve.', 1644, 4, 'Jacket', 'https://static.wikia.nocookie.net/discoelysium_gamepedia_en/images/8/80/Jacket_suede.png', '2025-03-11 09:34:58'),
(5, 'White Satin Shirt', 'This white satin shirt used to be fancy. It used to really catch the light. Now it has an unsavoury odour.', 13, 29, 'Shirt', 'https://static.wikia.nocookie.net/discoelysium_gamepedia_en/images/b/b5/Shirt_dress_disco.png', '2025-03-11 10:14:43'),
(6, 'Amphibian Sports Visor', 'The malformed green frog of the visor seems to keep an eye on your surroundings. A beady suspicious eye. The lime-tinted cellophane appears to be poorly molded -- the imprint says Made in Safre.', 79, 87, 'Hat', 'https://static.wikia.nocookie.net/discoelysium_gamepedia_en/images/f/f9/Hat_amphibian_sports_visor.png/', '2025-03-13 12:25:30'),
(7, 'Oversized Superstar Sunglasses', 'Is your own stardom too dazzling for your eyes? Can\'t bear to look at your own fabulous reflection in the mirror? Then these classic oversized sunglasses are for you.', 58, 28, 'Glasses', 'https://static.wikia.nocookie.net/discoelysium_gamepedia_en/images/c/ca/Glasses_bugeyes.png/', '2025-03-13 12:31:25'),
(9, 'FRITTTE Plastic Rain Coat', 'A transparent plastic rain coat with FRITTTE (sic!) written on the back. The package photo shows a group of happy Revacholians dancing in the rain.', 53, 99, 'Jacket', 'https://static.wikia.nocookie.net/discoelysium_gamepedia_en/images/a/a8/Jacket_fritte_raincoat.png', '2025-03-14 08:31:17'),
(10, 'Bow Knot', 'You\'re sure that wearing this tie is a statement. You\'re not sure *what* kind of statement, though.', 16, 30, 'Neckwear', 'https://static.wikia.nocookie.net/discoelysium_gamepedia_en/images/a/a5/Neck_bowtie.png', '2025-03-14 08:32:56'),
(11, 'T-Shirt \"Man From Hjelmdall\"', 'The Man from Hjelmdall is standing in front of a burning village, dual-wielding his ever-present zweihänders. His muscles look ready to burst out of the two-dimensional print and into your three-dimensional life.', 26, 999, 'Shirt', 'https://static.wikia.nocookie.net/discoelysium_gamepedia_en/images/8/81/Shirt_hjelmdall.png', '2025-03-14 08:34:30'),
(12, 'Yellow Gardening Gloves', 'Thick latex gardening gloves in classic canary yellow. Maybe you should retire, take up gardening as a hobby? It\'s worth a thought.', 10, 0, 'Gloves', 'https://static.wikia.nocookie.net/discoelysium_gamepedia_en/images/9/94/Gloves_garden.png', '2025-03-14 08:36:07'),
(13, 'Itchy Pants', 'Itchy pants. These pants make you angry. Good LORD these pants are UNCOMFORTABLE. Punch someone in the face! They are striped and calf-length; too tight around thighs, too loose around waist -- the worst case scenario.', 6, 0, 'Pants', 'https://static.wikia.nocookie.net/discoelysium_gamepedia_en/images/a/a0/Pants_itchy_angry.png', '2025-03-14 08:38:38'),
(14, 'Speedfreaks DONKS', 'OFFICIAL MERCHANDISE OF R-R-R-REVACHOL\'S HOTTEST STATION, SPEEDFREAKS FM. LIGHT-UP, STEEL-TOED SNEAKERS TO K-K-K-KEEP YOU DRIVING FAST AND FLASHY.', 121, 35, 'Shoes', 'https://static.wikia.nocookie.net/discoelysium_gamepedia_en/images/1/1f/Shoes_donks.png', '2025-03-14 08:43:45'),
(15, 'Shades of Self-Destruction', 'These death-tinted shades come with an odd longing for self-destruction. They\'re ugly -- you don\'t even need a mirror to know this. Describing them is futile; better get a glass of wine.', 33, 0, 'Glasses', 'https://static.wikia.nocookie.net/discoelysium_gamepedia_en/images/2/22/Glasses_self_destruction.png', '2025-03-14 08:45:13'),
(16, 'Fingerless Gloves', 'Gasoline-stained fingerless gloves in navy blue. They\'ve been worn threadbare, but, being made of wool, still provide some warmth and comfort.', 599, 4, 'Gloves', 'https://static.wikia.nocookie.net/discoelysium_gamepedia_en/images/2/2b/Gloves_bum.png', '2025-03-14 08:47:05'),
(17, 'Orange Bum Hat', 'An orange beanie with a couple of big-ass holes on the side. It looks like it might have been used as a mask during an armed robbery.', 69, 9, 'Hat', 'https://static.wikia.nocookie.net/discoelysium_gamepedia_en/images/c/c5/Hat_bum.png', '2025-03-14 09:16:55');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orderItems_orders` (`order_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `fk_orderItems_orders` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
