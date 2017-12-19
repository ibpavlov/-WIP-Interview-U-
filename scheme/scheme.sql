-- phpMyAdmin SQL Dump
-- version 4.0.10.14
-- http://www.phpmyadmin.net
--
-- Хост: localhost:3306
-- Време на генериране:  5 юли 2016 в 16:13
-- Версия на сървъра: 5.5.50-cll
-- Версия на PHP: 5.4.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- БД: `ivel_interview`
--

-- --------------------------------------------------------

--
-- Структура на таблица `questions`
--

CREATE TABLE IF NOT EXISTS `questions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(500) DEFAULT NULL,
  `ip` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC AUTO_INCREMENT=34 ;

--
-- Схема на данните от таблица `questions`
--

INSERT INTO `questions` (`id`, `name`, `ip`, `type`, `created`) VALUES
  (21, 'Може ли да ми кажете нещо повече за себе си?', '1', 'Основен', '2016-05-29 09:21:11'),
  (22, 'С какво сте се занимавали досега?', '1', 'Основен', '2016-05-29 09:21:11'),
  (23, 'Как стигнахте до тук?', '1', 'Основен', '2016-05-29 09:21:11'),
  (24, 'Ще ми разкажете ли повече за вашите качества и знания?', '1', 'Основен', '2016-05-29 09:21:11'),
  (25, 'Защо мислите, че сте подходящи за тази позиция?', '1', 'Основен', '2016-05-29 09:21:11'),
  (26, 'Какви са Вашите силни страни?', '1', 'Основен', '2016-05-29 09:21:11'),
  (27, 'Каква е разликата между int и Integer?', '1', 'Технически', '2016-05-29 09:21:11'),
  (28, 'Какво е полиморфизъм и за какво може да го използваш?', '1', 'Технически', '2016-05-29 09:21:11'),
  (29, 'Какво знаеш за транзакциите в базите данни?', '1', 'Технически', '2016-05-29 09:21:11'),
  (33, '', '::1', '', '2016-05-29 13:12:19');

-- --------------------------------------------------------

--
-- Структура на таблица `records`
--

CREATE TABLE IF NOT EXISTS `records` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  `ip` varchar(20) CHARACTER SET latin1 DEFAULT NULL,
  `file` varchar(1000) CHARACTER SET latin1 DEFAULT NULL,
  `subtitles` varchar(1000) CHARACTER SET latin1 DEFAULT NULL,
  `type` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=70 ;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
