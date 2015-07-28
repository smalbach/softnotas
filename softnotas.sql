-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.6.21 - MySQL Community Server (GPL)
-- SO del servidor:              Win32
-- HeidiSQL Versión:             9.2.0.4947
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Volcando estructura de base de datos para softnotas
CREATE DATABASE IF NOT EXISTS `softnotas` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `softnotas`;


-- Volcando estructura para tabla softnotas.abonos
CREATE TABLE IF NOT EXISTS `abonos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estudiante_grupo_id` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `abono` int(11) DEFAULT NULL,
  `ususario_id` int(11) DEFAULT NULL,
  `creado` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla softnotas.abonos: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `abonos` DISABLE KEYS */;
INSERT INTO `abonos` (`id`, `estudiante_grupo_id`, `fecha`, `abono`, `ususario_id`, `creado`) VALUES
	(1, 1, '2015-07-27', 75000, NULL, '2015-07-27 20:18:04'),
	(2, 2, '2015-07-27', 0, NULL, '2015-07-27 20:19:21'),
	(3, 2, '2015-07-27', 40000, NULL, '2015-07-27 20:20:00'),
	(4, 2, '2015-07-27', 20000, NULL, '2015-07-27 20:20:29');
/*!40000 ALTER TABLE `abonos` ENABLE KEYS */;


-- Volcando estructura para tabla softnotas.anios
CREATE TABLE IF NOT EXISTS `anios` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `anio` year(4) NOT NULL,
  `creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla softnotas.anios: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `anios` DISABLE KEYS */;
INSERT INTO `anios` (`id`, `anio`, `creado`) VALUES
	(1, '2015', '2015-07-04 13:10:05');
/*!40000 ALTER TABLE `anios` ENABLE KEYS */;


-- Volcando estructura para tabla softnotas.cordinadores
CREATE TABLE IF NOT EXISTS `cordinadores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `grupo_id` int(11) NOT NULL,
  `profesor_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla softnotas.cordinadores: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `cordinadores` DISABLE KEYS */;
INSERT INTO `cordinadores` (`id`, `grupo_id`, `profesor_id`) VALUES
	(1, 1, 1);
/*!40000 ALTER TABLE `cordinadores` ENABLE KEYS */;


-- Volcando estructura para tabla softnotas.cursos
CREATE TABLE IF NOT EXISTS `cursos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `curso` varchar(100) NOT NULL,
  `detalle` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla softnotas.cursos: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `cursos` DISABLE KEYS */;
INSERT INTO `cursos` (`id`, `curso`, `detalle`) VALUES
	(1, 'DISEÑO DE MODAS', 'Curso intensivo en modas 80 horas.'),
	(2, 'DISEÑO GRAFICO', 'Curso intensivo en diseño grafico 1280 horas.');
/*!40000 ALTER TABLE `cursos` ENABLE KEYS */;


-- Volcando estructura para tabla softnotas.estudiantes
CREATE TABLE IF NOT EXISTS `estudiantes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL DEFAULT '0',
  `identificacion` varchar(15) NOT NULL,
  `tipo_identificacion` varchar(2) DEFAULT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `sexo` varchar(1) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `estado` enum('ACTIVO','INACTIVO') NOT NULL,
  `creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla softnotas.estudiantes: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `estudiantes` DISABLE KEYS */;
INSERT INTO `estudiantes` (`id`, `usuario_id`, `identificacion`, `tipo_identificacion`, `nombres`, `apellidos`, `sexo`, `fecha_nacimiento`, `direccion`, `telefono`, `estado`, `creado`) VALUES
	(2, 0, '1102798482', 'CC', 'JOSE ENRIQUE', 'TUÑON VILLALBA', 'M', '2015-07-09', 'CALLE 32 # 16 - 31', '3014978369', 'ACTIVO', '2015-07-26 12:19:59');
/*!40000 ALTER TABLE `estudiantes` ENABLE KEYS */;


-- Volcando estructura para tabla softnotas.estudiantes_grupo
CREATE TABLE IF NOT EXISTS `estudiantes_grupo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estudiante_id` int(11) NOT NULL,
  `grupo_id` int(11) NOT NULL,
  `descuento` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `abono_inicial` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla softnotas.estudiantes_grupo: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `estudiantes_grupo` DISABLE KEYS */;
INSERT INTO `estudiantes_grupo` (`id`, `estudiante_id`, `grupo_id`, `descuento`, `total`, `abono_inicial`) VALUES
	(1, 2, 4, 25, 375000, 75000),
	(2, 2, 2, 10, 90000, 0);
/*!40000 ALTER TABLE `estudiantes_grupo` ENABLE KEYS */;


-- Volcando estructura para tabla softnotas.grupos
CREATE TABLE IF NOT EXISTS `grupos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `curso_id` int(11) NOT NULL,
  `anio_id` int(11) NOT NULL,
  `valor` int(11) NOT NULL,
  `jornada_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla softnotas.grupos: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `grupos` DISABLE KEYS */;
INSERT INTO `grupos` (`id`, `curso_id`, `anio_id`, `valor`, `jornada_id`) VALUES
	(1, 1, 1, 100000, 2),
	(2, 1, 1, 100000, 1),
	(3, 1, 1, 600000, 3),
	(4, 2, 1, 500000, 3);
/*!40000 ALTER TABLE `grupos` ENABLE KEYS */;


-- Volcando estructura para tabla softnotas.jornadas
CREATE TABLE IF NOT EXISTS `jornadas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `jornada` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla softnotas.jornadas: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `jornadas` DISABLE KEYS */;
INSERT INTO `jornadas` (`id`, `jornada`) VALUES
	(1, 'MATINAL'),
	(2, 'VESPERTINA'),
	(3, 'NOCTURNA');
/*!40000 ALTER TABLE `jornadas` ENABLE KEYS */;


-- Volcando estructura para tabla softnotas.logueos_user
CREATE TABLE IF NOT EXISTS `logueos_user` (
  `fecha` datetime DEFAULT NULL,
  `ip` varchar(50) DEFAULT NULL,
  `success` varchar(50) DEFAULT NULL,
  `usuario_id` varchar(50) DEFAULT NULL,
  `pass` varchar(100) DEFAULT NULL,
  `campo1` varchar(50) DEFAULT NULL,
  `campo2` varchar(50) DEFAULT NULL,
  `campo3` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla softnotas.logueos_user: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `logueos_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `logueos_user` ENABLE KEYS */;


-- Volcando estructura para tabla softnotas.notas
CREATE TABLE IF NOT EXISTS `notas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `periodo_id` int(11) NOT NULL,
  `estudiates_grupo_id` int(11) NOT NULL,
  `profesor_id` int(11) NOT NULL,
  `nota` varchar(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla softnotas.notas: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `notas` DISABLE KEYS */;
/*!40000 ALTER TABLE `notas` ENABLE KEYS */;


-- Volcando estructura para tabla softnotas.periodos
CREATE TABLE IF NOT EXISTS `periodos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `anio_id` int(4) NOT NULL,
  `periodo` varchar(1) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_final` date NOT NULL,
  `estado` enum('ACTIVO','INACTIVO') DEFAULT NULL,
  `creado` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla softnotas.periodos: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `periodos` DISABLE KEYS */;
/*!40000 ALTER TABLE `periodos` ENABLE KEYS */;


-- Volcando estructura para tabla softnotas.profesores
CREATE TABLE IF NOT EXISTS `profesores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL DEFAULT '0',
  `identificacion` varchar(15) NOT NULL,
  `tipo_identificacion` varchar(2) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `sexo` varchar(1) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla softnotas.profesores: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `profesores` DISABLE KEYS */;
INSERT INTO `profesores` (`id`, `usuario_id`, `identificacion`, `tipo_identificacion`, `nombres`, `apellidos`, `sexo`, `fecha_nacimiento`, `direccion`, `telefono`, `creado`) VALUES
	(2, 0, '225488', 'CC', 'CALIXTO ENRIQUE', 'TUÑON MARTINEZ', 'M', '2015-07-16', 'CALLE 32 # 16 - 31', '3012356987', '2015-07-26 12:19:55'),
	(3, 0, '30582255', 'CC', 'WILSON', 'FLOREZ', 'M', '2015-07-08', 'CALLE 32 # 16 - 31', '2824036', '2015-07-27 13:48:47');
/*!40000 ALTER TABLE `profesores` ENABLE KEYS */;


-- Volcando estructura para tabla softnotas.profesores_grupo
CREATE TABLE IF NOT EXISTS `profesores_grupo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `profesor_id` int(11) NOT NULL,
  `grupo_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla softnotas.profesores_grupo: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `profesores_grupo` DISABLE KEYS */;
INSERT INTO `profesores_grupo` (`id`, `profesor_id`, `grupo_id`) VALUES
	(1, 2, 2),
	(2, 3, 4);
/*!40000 ALTER TABLE `profesores_grupo` ENABLE KEYS */;


-- Volcando estructura para tabla softnotas.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(40) NOT NULL,
  `password` varchar(40) NOT NULL,
  `permisos` varchar(20) NOT NULL,
  `estado` enum('ACTIVO','INACTIVO') NOT NULL,
  `creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla softnotas.usuarios: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` (`id`, `login`, `password`, `permisos`, `estado`, `creado`) VALUES
	(1, '225488', 'a8f30714cb23d9a75910d5359faad11b', 'profesor', 'ACTIVO', '2015-07-26 12:19:55'),
	(2, '1102798482', '822c02ba3311c81581468075f92160c1', 'estudiante', 'ACTIVO', '2015-07-26 12:19:59'),
	(3, '30582255', '7144c19452c293545cd0c77cd69fe256', 'profesor', 'ACTIVO', '2015-07-27 13:48:47');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;


-- Volcando estructura para disparador softnotas.abono_inicial
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `abono_inicial` AFTER INSERT ON `estudiantes_grupo` FOR EACH ROW begin
insert into abonos (estudiante_grupo_id, fecha, abono) VALUES (new.id, CURDATE(), new.abono_inicial);
end//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;


-- Volcando estructura para disparador softnotas.usuario_estudiante
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `usuario_estudiante` AFTER INSERT ON `estudiantes` FOR EACH ROW begin
insert into usuarios (login, password, permisos) VALUES (new.identificacion, md5(new.identificacion), 'estudiante');
end//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;


-- Volcando estructura para disparador softnotas.usuario_profesor
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `usuario_profesor` AFTER INSERT ON `profesores` FOR EACH ROW begin
insert into usuarios (login, password, permisos) VALUES (new.identificacion, md5(new.identificacion), 'profesor');
end//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
