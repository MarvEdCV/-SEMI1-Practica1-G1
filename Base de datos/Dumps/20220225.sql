-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: db-photobucket.c5urnai0eipr.us-east-1.rds.amazonaws.com    Database: db-photobucket
-- ------------------------------------------------------
-- Server version       8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
Warning: A partial dump from a server that has GTIDs will by default include the GTIDs of all transactions, even those that changed suppressed parts of the database. If you don't want to restore GTIDs, pass --set-gtid-purged=OFF. To make a complete dump, pass --all-databases --triggers --routines --events.
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `album`
--

DROP TABLE IF EXISTS `album`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `album` (
  `album_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  `username` varchar(30) NOT NULL,
  PRIMARY KEY (`album_id`),
  KEY `album_user_username_fk` (`username`),
  CONSTRAINT `album_user_username_fk` FOREIGN KEY (`username`) REFERENCES `user` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `album`
--

LOCK TABLES `album` WRITE;
/*!40000 ALTER TABLE `album` DISABLE KEYS */;
INSERT INTO `album` VALUES (1,'default-marved','2023-02-24 00:46:19','2023-02-24 02:33:28',NULL,'marved'),(2,'default-sara','2023-02-24 02:34:07','2023-02-24 02:34:07',NULL,'sara'),(3,'default-julio','2023-02-24 02:34:07','2023-02-24 02:34:07',NULL,'julio'),(4,'default-jose','2023-02-24 02:34:07','2023-02-24 02:34:07',NULL,'jose'),(5,'default-user-sp','2023-02-24 03:12:35','2023-02-24 03:12:35',NULL,'user-sp'),(6,'default-user-postman','2023-02-24 03:48:30','2023-02-24 03:48:30',NULL,'user-postman'),(7,'default-user-postmann','2023-02-24 03:50:44','2023-02-24 03:50:44',NULL,'user-postmann'),(8,'default-user-postmana','2023-02-24 03:52:58','2023-02-24 03:52:58',NULL,'user-postmana'),(9,'default-user-postmanb','2023-02-24 03:54:53','2023-02-24 03:54:53',NULL,'user-postmanb'),(10,'default-user-postmanc','2023-02-24 04:22:01','2023-02-24 04:22:01',NULL,'user-postmanc'),(11,'default-user-postmand','2023-02-24 04:29:32','2023-02-24 04:29:32',NULL,'user-postmand'),(12,'default-user-postmane','2023-02-24 04:32:41','2023-02-24 04:32:41',NULL,'user-postmane'),(13,'default-user-postmanf','2023-02-24 05:26:21','2023-02-24 05:26:21',NULL,'user-postmanf'),(14,'default-user-postmang','2023-02-25 00:18:10','2023-02-25 00:18:10',NULL,'user-postmang'),(15,'default-user-postmani','2023-02-25 00:43:34','2023-02-25 00:43:34',NULL,'user-postmani'),(16,'default-user-postmanj','2023-02-25 01:15:39','2023-02-25 01:15:39',NULL,'user-postmanj'),(18,'albumupdate1','2023-02-25 04:41:10','2023-02-25 04:51:06',NULL,'marved'),(19,'updateAlbum2','2023-02-25 04:43:33','2023-02-25 05:18:09','2023-02-25 05:18:09','marved');
/*!40000 ALTER TABLE `album` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `picture`
--

DROP TABLE IF EXISTS `picture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `picture` (
  `picture_id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(2048) NOT NULL,
  `album_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`picture_id`),
  KEY `picture_album_album_id_fk` (`album_id`),
  CONSTRAINT `picture_album_album_id_fk` FOREIGN KEY (`album_id`) REFERENCES `album` (`album_id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `picture`
--

LOCK TABLES `picture` WRITE;
/*!40000 ALTER TABLE `picture` DISABLE KEYS */;
INSERT INTO `picture` VALUES (1,'https://as2.ftcdn.net/v2/jpg/03/01/74/15/1000_F_301741517_3bvFxpxY3I74BrSFJT86Cqzz6p8cEBJ7.jpg',1,'2023-02-24 00:46:33','2023-02-24 00:46:33',NULL),(2,'https://cdn-icons-png.flaticon.com/512/2780/2780137.png',1,'2023-02-24 02:35:10','2023-02-24 02:35:10',NULL),(3,'https://cdn-icons-png.flaticon.com/512/9074/9074661.png',1,'2023-02-24 02:35:11','2023-02-24 02:35:10',NULL),(4,'https://cdn-icons-png.flaticon.com/512/9757/9757636.png',1,'2023-02-24 02:35:11','2023-02-24 02:35:11',NULL),(5,'https://cdn-icons-png.flaticon.com/512/2788/2788975.png',1,'2023-02-24 02:35:11','2023-02-24 02:35:12',NULL),(6,'https://cdn-icons-png.flaticon.com/512/2708/2708232.png',2,'2023-02-24 02:36:21','2023-02-24 02:36:21',NULL),(7,'https://cdn-icons-png.flaticon.com/512/6092/6092424.png',2,'2023-02-24 02:36:21','2023-02-24 02:36:21',NULL),(8,'https://cdn-icons-png.flaticon.com/512/6901/6901254.png',2,'2023-02-24 02:36:21','2023-02-24 02:36:21',NULL),(9,'https://cdn-icons-png.flaticon.com/512/2897/2897051.png',2,'2023-02-24 02:36:22','2023-02-24 02:36:22',NULL),(10,'https://cdn-icons-png.flaticon.com/512/9562/9562181.png',2,'2023-02-24 02:36:22','2023-02-24 02:36:22',NULL),(11,'https://cdn-icons-png.flaticon.com/512/9112/9112393.png',3,'2023-02-24 02:37:45','2023-02-24 02:37:45',NULL),(12,'https://cdn-icons-png.flaticon.com/512/9066/9066002.png',3,'2023-02-24 02:37:45','2023-02-24 02:37:45',NULL),(13,'https://cdn-icons-png.flaticon.com/512/7752/7752780.png',3,'2023-02-24 02:37:45','2023-02-24 02:37:45',NULL),(14,'https://cdn-icons-png.flaticon.com/512/6447/6447213.png',3,'2023-02-24 02:37:45','2023-02-24 02:37:45',NULL),(15,'https://cdn-icons-png.flaticon.com/512/7909/7909574.png',3,'2023-02-24 02:37:46','2023-02-24 02:37:46',NULL),(16,'https://cdn-icons-png.flaticon.com/512/2850/2850482.png',4,'2023-02-24 02:38:19','2023-02-24 02:38:19',NULL),(17,'https://cdn-icons-png.flaticon.com/512/7909/7909007.png',4,'2023-02-24 02:38:19','2023-02-24 02:38:19',NULL),(18,'https://cdn-icons-png.flaticon.com/512/9757/9757636.png',4,'2023-02-24 02:38:19','2023-02-24 02:38:19',NULL),(19,'https://cdn-icons-png.flaticon.com/512/7752/7752780.png',4,'2023-02-24 02:38:19','2023-02-24 02:38:19',NULL),(20,'https://cdn-icons-png.flaticon.com/512/2780/2780137.png',4,'2023-02-24 02:38:19','2023-02-24 02:38:19',NULL),(21,'https://cdn-icons-png.flaticon.com/512/7272/7272303.png',5,'2023-02-24 03:12:35','2023-02-24 03:12:35',NULL),(22,'https://cdn-icons-png.flaticon.com/512/9002/9002438.png',6,'2023-02-24 03:48:30','2023-02-24 03:48:30',NULL),(23,'https://cdn-icons-png.flaticon.com/512/9002/9002438.png',7,'2023-02-24 03:50:44','2023-02-24 03:50:44',NULL),(24,'https://cdn-icons-png.flaticon.com/512/9002/9002438.png',8,'2023-02-24 03:52:58','2023-02-24 03:52:58',NULL),(25,'https://cdn-icons-png.flaticon.com/512/9002/9002438.png',9,'2023-02-24 03:54:53','2023-02-24 03:54:53',NULL),(26,'https://cdn-icons-png.flaticon.com/512/9002/9002438.png',10,'2023-02-24 04:22:01','2023-02-24 04:22:01',NULL),(27,'https://cdn-icons-png.flaticon.com/512/9002/9002438.png',11,'2023-02-24 04:29:32','2023-02-24 04:29:32',NULL),(28,'https://cdn-icons-png.flaticon.com/512/9002/9002438.png',12,'2023-02-24 04:32:41','2023-02-24 04:32:41',NULL),(29,'https://cdn-icons-png.flaticon.com/512/9002/9002438.png',13,'2023-02-24 05:26:21','2023-02-24 05:26:21',NULL),(30,'https://cdn-icons-png.flaticon.com/512/9002/9002438.png',14,'2023-02-25 00:18:10','2023-02-25 00:18:10',NULL),(31,'https://practica1-g1-imagenes-semi1.s3.amazonaws.com/elbicho-1677285813905-NodeJs.jpeg',15,'2023-02-25 00:43:34','2023-02-25 00:43:34',NULL),(32,'https://practica1-g1-imagenes-semi1.s3.amazonaws.com/elbicho-1677287738295-NodeJs.jpeg',16,'2023-02-25 01:15:39','2023-02-25 01:15:39',NULL),(33,'https://practica1-g1-imagenes-semi1.s3.amazonaws.com/elbicho-1677285813905-NodeJs.jpeg',1,'2023-02-25 03:50:02','2023-02-25 03:50:02',NULL),(34,'https://practica1-g1-imagenes-semi1.s3.amazonaws.com/messi-1677297535885-NodeJs.jpg',1,'2023-02-25 03:58:57','2023-02-25 03:58:57',NULL),(35,'https://practica1-g1-imagenes-semi1.s3.amazonaws.com/messi-1677297618972-NodeJs.jpg',1,'2023-02-25 04:00:19','2023-02-25 04:00:19',NULL),(36,'https://practica1-g1-imagenes-semi1.s3.amazonaws.com/elbicho-1677285813905-NodeJs.jpeg',2,'2023-02-25 04:17:45','2023-02-25 04:17:45',NULL),(37,'https://practica1-g1-imagenes-semi1.s3.amazonaws.com/elrayomcuin-1677298931206-NodeJs.jpeg',1,'2023-02-25 04:22:12','2023-02-25 04:22:12',NULL),(38,'https://practica1-g1-imagenes-semi1.s3.amazonaws.com/elbicho-1677285813905-NodeJs.jpeg',18,'2023-02-25 04:41:42','2023-02-25 04:41:42',NULL),(39,'https://cdn-icons-png.flaticon.com/512/9002/9002438.png',18,'2023-02-25 06:09:13','2023-02-25 06:09:13',NULL);
/*!40000 ALTER TABLE `picture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `username` varchar(30) NOT NULL,
  `password` varchar(32) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('jose','90e528618534d005b1a7e7b7a367813f','2023-02-24 02:32:50','2023-02-25 01:12:21',NULL,'Jose semi1'),('julio','62398fb63509f679f2128ea6a44a7f9a','2023-02-24 02:32:31','2023-02-25 01:12:22',NULL,'Julio semi1'),('marved','8e1a6573fd07592522adac7394383e54','2023-02-24 00:45:53','2023-02-25 04:00:19',NULL,'Eduards'),('sara','312dc6ec7c900fb9017bf43c6b1f81bb','2023-02-24 02:32:19','2023-02-25 01:12:22',NULL,'Sara semi1'),('user-postman','365c95c84b29fb4ef345c4e6ecd1420d','2023-02-24 03:48:30','2023-02-25 01:12:23',NULL,'defaultname'),('user-postmana','5e732dd1154cf16f41fdec60999b5bf7','2023-02-24 03:52:58','2023-02-25 01:12:23',NULL,'defaultname'),('user-postmanb','187e64ad8788aaba6c07694d247d506e','2023-02-24 03:54:53','2023-02-25 01:12:24',NULL,'defaultname'),('user-postmanc','24fe4151ebd8a04f4cb844f752ddc694','2023-02-24 04:22:01','2023-02-25 01:12:24',NULL,'defaultname'),('user-postmand','a1af9561f52def365518d8d0fd3bb183','2023-02-24 04:29:32','2023-02-25 01:12:21',NULL,'defaultname'),('user-postmane','d98d044645c76592342e90adf96ca957','2023-02-24 04:32:41','2023-02-25 01:12:22',NULL,'defaultname'),('user-postmanf','5799c50aa4af76105cfaa6c8b90dd8e0','2023-02-24 05:26:21','2023-02-25 01:12:23',NULL,'defaultname'),('user-postmang','effd58729a38a8fbc20f93acc7da3335','2023-02-25 00:18:10','2023-02-25 01:12:22',NULL,'defaultname'),('user-postmani','fcde4895eb5a62ed1f9ea7d11f7ace37','2023-02-25 00:43:34','2023-02-25 01:12:21',NULL,'defaultname'),('user-postmanj','1c68033fcc65e71c1c246f5356972039','2023-02-25 01:15:39','2023-02-25 01:15:39',NULL,'default name'),('user-postmann','139f469904f6cc618647393463030b4e','2023-02-24 03:50:44','2023-02-25 01:12:21',NULL,'defaultname'),('user-sp','9fc88fec1ebe316a6cd7dd55c2de7a6b','2023-02-24 03:12:35','2023-02-25 01:12:24',NULL,'defaultname');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-25  0:28:21