-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: flask_connection
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `backgroudImg_url` varchar(255) DEFAULT NULL,
  `website` varchar(50) DEFAULT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'Toyota','https://stimg.cardekho.com/images/carexteriorimages/930x620/Toyota/Fortuner/10903/1695443447797/front-left-side-47.jpg','https://www.toyota.com','https://www.citypng.com/public/uploads/preview/hd-toyota-logo-emblem-transparent-png-7017516947726323ivxwwcgjw.png'),(2,'Honda','https://static.pakwheels.com/2021/10/2022-Honda-Civic-Si-2.jpg','https://www.honda.com','https://i.pinimg.com/originals/da/9c/a5/da9ca5610b6a94b59294e9cc37657cb1.png'),(3,'Ford','https://image.cnbcfm.com/api/v1/image/107238183-1683642530891-All-New_Ford_Ranger_Raptor_12.jpg?v=1684584001&w=1600&h=900','https://www.ford.com','https://media.designrush.com/inspiration_images/291693/conversions/ford_logo_0_c4103a3013ad-mobile.jpg'),(4,'BMW','https://www.autocar.co.uk/sites/autocar.co.uk/files/bmw-i5-review-2023-20-cornering-front_0.jpg','https://www.bmw.com','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7wXcM8jUu1VyyQ98QHAPQ3HM926HMDYphMg&s'),(5,'Dodge','https://www.goodwood.com/globalassets/.road--racing/road/news/2022/8-august/dodge-charger-ev/dodge-charger-ev-08.jpg?crop=(0,0,2600,1463)&width=1600','https://www.dodge.com/','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdXTVCMrHyiBrzntTaDejk8PqMh_5EC40kZw&s'),(6,'Porsche','https://cdn.motor1.com/images/mgl/nAy9Bj/s1/porsche-suv-elettrico-7-posti-il-render-di-motor1.com.webp','https://www.porsche.com/','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlIJCSTcFVGMexbsQ4Laep9kWONXqN7d52mA&s'),(7,'Lamborghini','https://hips.hearstapps.com/hmg-prod/images/2023-lamborghini-huracan-sterrato127-6467c8f12dcce.jpg?crop=0.595xw:0.445xh;0.174xw,0.447xh&resize=1200:*','https://www.lamborghini.com/en-en','https://www.brandcrowd.com/blog/wp-content/uploads/2023/05/Lamborghini-logo-1-1024x819.jpg');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `models`
--

DROP TABLE IF EXISTS `models`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `models` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `backgroundImg_url` varchar(255) DEFAULT NULL,
  `issuanceYear` year DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `fuel_type` varchar(30) NOT NULL,
  `brand_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `brand_id` (`brand_id`),
  CONSTRAINT `models_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `models`
--

LOCK TABLES `models` WRITE;
/*!40000 ALTER TABLE `models` DISABLE KEYS */;
INSERT INTO `models` VALUES (1,'Toyota Corolla','https://media.ed.edmunds-media.com/toyota/corolla/2023/oem/2023_toyota_corolla_sedan_xse_fq_oem_1_1280.jpg',2022,20000.00,'Gasoline',1),(2,'Toyota Camry','https://static.pakwheels.com/2023/11/rt.jpg',2023,25000.00,'Gasoline',1),(3,'Toyota RAV4','https://media.ed.edmunds-media.com/toyota/rav4-hybrid/2024/oem/2024_toyota_rav4-hybrid_4dr-suv_se_fq_oem_1_1280.jpg',2022,27000.00,'Hybrid',1),(4,'Honda Civic','https://car-images.bauersecure.com/wp-images/2301/honda-civic-93.jpg',2022,21000.00,'Gasoline',2),(5,'Honda Accord','https://www.honda.ca/-/media/Brands/Honda/Models/ACCORD/2023/Overview/03_KeyFeatures/Honda_Accord_key-features_desktop_1036x520_v2.png?h=520&iar=0&w=1036&rev=496c6d6de1154ef4afd9e6dd5e15e7d9&hash=BD236571C5D71428CBCAD14EE7E23208',2023,26000.00,'Gasoline',2),(6,'Honda CR-V','https://www.autocar.co.uk/sites/autocar.co.uk/files/honda-c-rv-review-2023-001-tracking-front.jpg',2022,28000.00,'Hybrid',2),(7,'Ford Focus','https://cdn.motor1.com/images/mgl/A97LL/s1/ford-focus-st-line-restyling-2022.jpg',2022,22000.00,'Gasoline',3),(8,'Ford Mustang','https://www.motortrend.com/uploads/2023/08/008-2024-Ford-Mustang-GT-Premium-Performance-pack-front-three-quarters.jpg?w=768&width=768&q=75&format=webp',2023,35000.00,'Gasoline',3),(9,'Ford Escape','https://di-uploads-pod41.dealerinspire.com/sunriseford/uploads/2023/09/2024-Ford-Escape-1.jpg',2022,30000.00,'Hybrid',3),(10,'BMW 3 Series','https://www.topgear.com/sites/default/files/2022/09/1-BMW-3-Series.jpg',2022,41000.00,'Gasoline',4),(11,'BMW 5 Series','https://www.topgear.com/sites/default/files/2024/04/TopGear%20-%20First%20Drive%20-%20BMW%205%20Series%202024-031.jpg',2023,55000.00,'Gasoline',4),(12,'BMW X5','https://media.ed.edmunds-media.com/bmw/x5/2025/oem/2025_bmw_x5_4dr-suv_xdrive40i_fq_oem_1_1280.jpg',2022,60000.00,'Hybrid',4),(13,'Dodge Charger','https://s1.cdn.autoevolution.com/images/news/gallery/2023-dodge-charger-arrives-digitally-curvy-and-sporting-v12-hellephant-oomph_2.jpg',2023,29999.99,'Gasoline',5),(14,'Dodge Challenger','https://medias.fcacanada.ca//specs/dodge/challenger/year-2023/media/images/bento-boxe/2023-dodge-challenger-slimhero-desktop-capability_1e0ebd04ba107ae9c580f37c59e805e-2496x1248.jpg',2023,27999.99,'Gasoline',5),(15,'dodge durango','https://d2v1gjawtegg5z.cloudfront.net/uploads/files/000/548/132/original/2022-05_MY23_Durango_Gallery_04.jpg.image.2880.jpeg?1690828748',2023,32999.99,'Gasoline',5),(16,'Dodge Ram 1500','https://www.ramtrucks.com/content/dam/fca-brands/na/ramtrucks/en_us/2025/ram-1500/gallery/desktop/my25-ram-1500-gallery-open-1-d.jpg',2023,35999.99,'Gasoline',5),(17,'Lamborghini Urus','https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Lamborghini_Urus_19.09.20_JM_%282%29_%28cropped%29.jpg/1200px-Lamborghini_Urus_19.09.20_JM_%282%29_%28cropped%29.jpg',2023,245000.00,'Gasoline',7);
/*!40000 ALTER TABLE `models` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Badar','Ur Zaman','hbrsadiqian123@gmail.com','scrypt:32768:8:1$ro3yE2SwX7h901n9$4a9629459acf90c8e8e8efef2bf101a3dd2a30a3c90f8545cb5a429997553c1ee3c67e164ad8b8bdbc97eb711f340f3cfae2231de8d27b634f496014998a03df','admin'),(2,'Ahmad','Shajee','ashajee11@gmail.com','scrypt:32768:8:1$0T4Rf1DGt0GhP8hD$b25113cc58da1b0d7cee5c13e4ca8fcc1c94420f14f9840b7b1a478db1909af64f879c898b9014b16782e6a38d5159bcc91309c16be4cbbcb771d03fc9fb6a75','user'),(3,'Badar','Ur Zaman','ss@gmail.com','scrypt:32768:8:1$5KCaax4L37d50e43$15d9eecc3812a7a688aa6709db1a7e9a94a8d06841b8baccf004400fbbb54e2cef1ca1ed01c5195fa5c261540d691101631da99647ce1368f70dfb57ca559e6b','user'),(4,'Huzaifa','Bhai','hbhai1122@gmail.com','scrypt:32768:8:1$H7y2XtbyKOxqUvZp$3eac5b2ee509755901bbd96b9693de37438d756fe28c07f41a7b9df7c3b49285104712e94f6a34f797556f68407ed2e23fbde0be63c9a3398f4bd7002150eccf','user'),(5,'Asad','Bhai','abhai11@gmail.com','scrypt:32768:8:1$D1h8TdOmz3YC6A6U$6c252ac0a2453186d3a6b541c4234259b6a726d675b95f12837de7f1fc54eb5077e368f99e7413683e4206ec584c1fa18985899b0c96d313b01fea758df179ea','user'),(6,'Haroon','Tahir','htahir@gmail.com','scrypt:32768:8:1$5zrHy0VojDu7UdrB$94048717fbcb695a60acbcd880bff36fb4d5e918a35f2ba69fbcfc3a12e24d684c8cf54e60b98c0f37c2eba70b84ddb764253f9af8d6106b1dcaf7ce37368628','user'),(7,'Bilal','Abbas','babbas@gmail.com','scrypt:32768:8:1$VylGbnba5keUVv5W$ec96a3cae7f55ca1da8ec4b4df8ba407382b03fc4af2ee0c0512cc10846ba7ada4d856b5154227d690e8ae0ec1ced0dc4686b2398e8ea0b4270e06b0e4a84a95','user'),(8,'Adnan','Ali','aali@gmail.com','scrypt:32768:8:1$2LuZtC6pFLkYMZ5V$888eb90252b322a2743c258a2221f4747e7fe8e67bb0568f3ce65e58d50bacddac43e8743acf54534fa45be045c63572925c557d96c2054a243ec533cf0d657d','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-25 18:43:03
