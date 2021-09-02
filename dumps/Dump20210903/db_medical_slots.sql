-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: db_medical
-- ------------------------------------------------------
-- Server version	8.0.25

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
-- Table structure for table `slots`
--

DROP TABLE IF EXISTS `slots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `slots` (
  `unique_id` int NOT NULL DEFAULT '1',
  `patient_id` varchar(100) NOT NULL,
  `doctor_id` int NOT NULL DEFAULT '1',
  `day` varchar(20) NOT NULL,
  `slot_time` varchar(20) NOT NULL,
  PRIMARY KEY (`unique_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slots`
--

LOCK TABLES `slots` WRITE;
/*!40000 ALTER TABLE `slots` DISABLE KEYS */;
INSERT INTO `slots` VALUES (7077,'addu@gmail.com',1,'monday',''),(8770,'alexandergrahambell@gmail.com',1,'monday',''),(15750,'daniel@gmail.com',1,'monday',''),(43403,'das@gmail.com',1,'monday',''),(65550,'x--~@gmail.com',4,'Tuesday','1:00'),(77799,'aminatazim@gmail.com',3,'Wednesday','22:30'),(165515,'einstein@gmail.com',1,'monday',''),(221115,'zombie@gmail.com',1,'monday',''),(222222,'fffffffff@g.com',1,'Saturday','20:00'),(243422,'ggg@fjhfb.com',3,'Thursday','4:20'),(272727,'afffa@jfdhf.com',3,'Tuesday','4:20'),(277742,'farhan@gmail.com',1,'monday',''),(278877,'zubbu@gmail.com',1,'monday',''),(292777,'fucker@gmail.com',1,'monday',''),(294455,'ami@faisi.com',3,'Wednesday','18:00'),(315313,'gengis@khan.com',1,'Wednesday','23:20'),(333333,'ggggggg@g.com',1,'friday',''),(338333,'giggle@hotmail.com',3,'Monday','13:20'),(341313,'reg@gmail.com',1,'monday',''),(345557,'ashiq@mohabbat.com',1,'Thursday','21:30'),(347434,'ami@gmail.com',1,'monday',''),(393739,'magg@q.com',1,'Thursday','22:00'),(410071,'dean@gmail.com',1,'monday',''),(413338,'geralt@witcher.com',1,'monday',''),(414441,'hdv@ydtf.com',3,'Monday','15:10'),(414719,'ema@khima.com',1,'Wednesday','14:10'),(419090,'doc@doc.com',1,'monday',''),(442222,'f@ffff.com',1,'monday',''),(444440,'hdh@hsh.com',3,'Wednesday','18:30'),(444444,'arham@ggggggg.com',2,'Wednesday','0:30'),(444464,'rajthackeray@gmail.com',1,'monday',''),(444499,'mhah@gmail.com',3,'Wednesday','22:20'),(444777,'rajthackeray@gmail.com',1,'monday',''),(446464,'rajthackeray@gmail.com',1,'monday',''),(446476,'mkjh@haj.com',4,'Wednesday','4:10'),(446646,'rajthackeray@gmail.com',1,'monday',''),(446666,'rat@g.com',1,'monday',''),(446674,'rajthackeray@gmail.com',1,'monday',''),(464444,'rajthackeray@gmail.com',1,'monday',''),(464474,'rajthackeray@gmail.com',1,'monday',''),(464647,'rajthackeray@gmail.com',1,'monday',''),(466446,'rajthackeray@gmail.com',1,'monday',''),(466664,'jjjj@wwww.com',3,'Wednesday','4:30'),(474144,'arr@email.com',4,'Saturday','13:00'),(474444,'arrrraa@jdfn.com',1,'friday','0:00'),(476466,'rajthackeray@gmail.com',1,'monday',''),(476674,'rajthackeray@gmail.com',1,'monday',''),(476747,'rajthackeray@gmail.com',1,'monday',''),(477444,'hhh@a.com',1,'Monday','17:20'),(479749,'arham@g.com',2,'friday',''),(486868,'balthackeray@gmail.com',1,'monday',''),(493492,'c@pqrst.com',1,'monday',''),(499949,'m@m.com',1,'monday',''),(535111,'genie@gmail.com',1,'monday',''),(546767,'jami@chu.com',1,'Monday','21:10'),(550555,'amini@gmail.com',3,'Wednesday','23:10'),(557997,'Amina@gmail.com',1,'monday',''),(559949,'wick@gmail.com',1,'monday',''),(575555,'faisi@fai.com',1,'Thursday','13:10'),(585855,'bsbsb@bsdk.com',3,'Wednesday','15:10'),(597967,'chutiya@mc.com',4,'Wednesday','14:00'),(644444,'rajthackeray@gmail.com',1,'monday',''),(644666,'rajthackeray@gmail.com',1,'monday',''),(644674,'rajthackeray@gmail.com',1,'monday',''),(644746,'rajthackeray@gmail.com',1,'monday',''),(646676,'rajthackeray@gmail.com',1,'monday',''),(663744,'hat@gmail.com',1,'monday',''),(664746,'rajthackeray@gmail.com',1,'monday',''),(667766,'rajthackeray@gmail.com',1,'monday',''),(674767,'turk@gmail.com',4,'Wednesday','23:30'),(679746,'jama@jami.com',1,'undefined','22:00'),(707700,'adnan@addu.com',1,'Wednesday','16:30'),(711979,'mohammed@hotmail.com',3,'Wednesday','18:30'),(724777,'fdad@hg.com',3,'Tuesday','4:30'),(740740,'khan@pathan.com',3,'Wednesday','23:00'),(747446,'rajthackeray@gmail.com',1,'monday',''),(747467,'rajthackeray@gmail.com',1,'monday',''),(755777,'dask@email.com',1,'monday',''),(758777,'khali@khaali.com',2,'Wednesday','17:10'),(758888,'salll@gmal.com',3,'Wednesday','13:30'),(764446,'rajthackeray@gmail.com',1,'monday',''),(764664,'rajthackeray@gmail.com',1,'monday',''),(764744,'rajthackeray@gmail.com',1,'monday',''),(764766,'rajthackeray@gmail.com',1,'monday',''),(766464,'rajthackeray@gmail.com',1,'monday',''),(767778,'ajmal@gujju.com',1,'monday',''),(774797,'arhamgandu@gmail.com',1,'Wednesday','22:10'),(776476,'rajthackeray@gmail.com',1,'monday',''),(777777,'aaaaaaaaaaaa@a.com',3,'tuesday',''),(777974,'arhamgandu@chutiya.com',4,'Tuesday','20:30'),(779479,'a@gmail.com',1,'monday',''),(779867,'a@b.com',1,'Wednesday','21:20'),(784884,'bhau@gmail.com',3,'Wednesday','23:10'),(891819,'vicve@gg.com',2,'Wednesday','17:30'),(909994,'mdm@ghugggu.com',1,'Monday','14:00'),(910909,'name@gmail.com',1,'monday',''),(916911,'newton@gmail.com',1,'monday',''),(944769,'chutiya@female.com',4,'Monday','22:10'),(949997,'anwar@email.com',3,'Wednesday','19:10'),(964777,'jama@jami.com',1,'Saturday','22:10'),(990725,'nickfury@gmail.com',3,'Wednesday','13:00'),(997453,'sam@gmail.com',1,'monday',''),(997743,'a@gmail.com',1,'monday',''),(997747,'arhamgandu@gmail.com',3,'Wednesday','22:30');
/*!40000 ALTER TABLE `slots` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-03  1:38:49
