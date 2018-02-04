SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
CREATE DATABASE IF NOT EXISTS `library` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `library`;

DROP TABLE IF EXISTS `author`;
CREATE TABLE `author` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `age` int(11) NOT NULL,
  `gender` int(11) NOT NULL,
  `born` varchar(20) NOT NULL,
  `about` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `book`;
CREATE TABLE `book` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `author` int(11) NOT NULL,
  `isbn` bigint(20) NOT NULL,
  `about` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


ALTER TABLE `author`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `book`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author` (`author`);


ALTER TABLE `author`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `book`
  ADD CONSTRAINT `book_ibfk_1` FOREIGN KEY (`author`) REFERENCES `author` (`id`) ON UPDATE CASCADE;
