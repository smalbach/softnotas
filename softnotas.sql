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
  `estudiante_grupo_id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `abono` int(11) NOT NULL,
  `ususario_id` int(11) NOT NULL,
  `creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla softnotas.abonos: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `abonos` DISABLE KEYS */;
INSERT INTO `abonos` (`id`, `estudiante_grupo_id`, `fecha`, `abono`, `ususario_id`, `creado`) VALUES
	(1, 1, '2015-07-22', 150000, 0, '2015-07-29 21:40:52'),
	(2, 2, '2015-07-30', 180000, 0, '2015-07-30 00:20:18');
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
  `creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla softnotas.cordinadores: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `cordinadores` DISABLE KEYS */;
INSERT INTO `cordinadores` (`id`, `grupo_id`, `profesor_id`, `creado`) VALUES
	(1, 1, 1, '2015-07-30 00:20:55');
/*!40000 ALTER TABLE `cordinadores` ENABLE KEYS */;


-- Volcando estructura para tabla softnotas.cursos
CREATE TABLE IF NOT EXISTS `cursos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `curso` varchar(100) NOT NULL,
  `detalle` varchar(200) NOT NULL,
  `creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla softnotas.cursos: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `cursos` DISABLE KEYS */;
INSERT INTO `cursos` (`id`, `curso`, `detalle`, `creado`) VALUES
	(1, 'DISEÑO DE MODAS', 'Curso intensivo en modas 80 horas.', '2015-07-30 00:17:10'),
	(2, 'DISEÑO GRAFICO', 'Curso intensivo en diseño grafico 1280 horas.', '2015-07-30 00:17:10');
/*!40000 ALTER TABLE `cursos` ENABLE KEYS */;


-- Volcando estructura para tabla softnotas.estudiantes
CREATE TABLE IF NOT EXISTS `estudiantes` (
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
  `estado` enum('ACTIVO','INACTIVO') NOT NULL,
  `creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla softnotas.estudiantes: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `estudiantes` DISABLE KEYS */;
INSERT INTO `estudiantes` (`id`, `usuario_id`, `identificacion`, `tipo_identificacion`, `nombres`, `apellidos`, `sexo`, `fecha_nacimiento`, `direccion`, `telefono`, `estado`, `creado`) VALUES
	(1, 0, '1111', 'CC', 'JOSE ENRIQUE', 'TUÑON VILLALBA', 'M', '2015-07-05', 'CALLE 32 # 16 - 31', '3014978369', 'ACTIVO', '2015-07-28 23:15:15');
/*!40000 ALTER TABLE `estudiantes` ENABLE KEYS */;


-- Volcando estructura para tabla softnotas.estudiantes_grupo
CREATE TABLE IF NOT EXISTS `estudiantes_grupo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estudiante_id` int(11) NOT NULL,
  `grupo_id` int(11) NOT NULL,
  `descuento` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `abono_inicial` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla softnotas.estudiantes_grupo: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `estudiantes_grupo` DISABLE KEYS */;
INSERT INTO `estudiantes_grupo` (`id`, `estudiante_id`, `grupo_id`, `descuento`, `total`, `abono_inicial`, `fecha`, `creado`) VALUES
	(1, 1, 1, 10, 90000, 150000, '2015-07-22', '2015-07-29 21:40:52'),
	(2, 1, 3, 20, 480000, 180000, '2015-07-30', '2015-07-30 00:20:18');
/*!40000 ALTER TABLE `estudiantes_grupo` ENABLE KEYS */;


-- Volcando estructura para tabla softnotas.grupos
CREATE TABLE IF NOT EXISTS `grupos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `curso_id` int(11) NOT NULL,
  `anio_id` int(11) NOT NULL,
  `valor` int(11) NOT NULL,
  `jornada_id` int(11) NOT NULL,
  `creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla softnotas.grupos: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `grupos` DISABLE KEYS */;
INSERT INTO `grupos` (`id`, `curso_id`, `anio_id`, `valor`, `jornada_id`, `creado`) VALUES
	(1, 1, 1, 100000, 2, '2015-07-30 00:17:57'),
	(2, 1, 1, 100000, 1, '2015-07-30 00:17:57'),
	(3, 1, 1, 600000, 3, '2015-07-30 00:17:57'),
	(4, 2, 1, 500000, 3, '2015-07-30 00:17:57');
/*!40000 ALTER TABLE `grupos` ENABLE KEYS */;


-- Volcando estructura para tabla softnotas.jornadas
CREATE TABLE IF NOT EXISTS `jornadas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `jornada` varchar(50) NOT NULL,
  `creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla softnotas.jornadas: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `jornadas` DISABLE KEYS */;
INSERT INTO `jornadas` (`id`, `jornada`, `creado`) VALUES
	(1, 'MATINAL', '2015-07-30 00:18:18'),
	(2, 'VESPERTINA', '2015-07-30 00:18:18'),
	(3, 'NOCTURNA', '2015-07-30 00:18:18');
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
  `creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
  `estado` enum('ACTIVO','INACTIVO') NOT NULL,
  `creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla softnotas.periodos: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `periodos` DISABLE KEYS */;
/*!40000 ALTER TABLE `periodos` ENABLE KEYS */;


-- Volcando estructura para tabla softnotas.permisos
CREATE TABLE IF NOT EXISTS `permisos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `permiso` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla softnotas.permisos: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `permisos` DISABLE KEYS */;
INSERT INTO `permisos` (`id`, `permiso`) VALUES
	(1, 'administrador'),
	(2, 'estudiante'),
	(3, 'profesor');
/*!40000 ALTER TABLE `permisos` ENABLE KEYS */;


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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla softnotas.profesores: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `profesores` DISABLE KEYS */;
INSERT INTO `profesores` (`id`, `usuario_id`, `identificacion`, `tipo_identificacion`, `nombres`, `apellidos`, `sexo`, `fecha_nacimiento`, `direccion`, `telefono`, `creado`) VALUES
	(1, 0, '1102798482', 'CC', 'CALIXTO ENRIQUE', 'TUÑON VILLALBA', 'M', '2015-07-16', 'CALLE 32 # 16 - 31', '3012356987', '2015-07-28 23:17:33');
/*!40000 ALTER TABLE `profesores` ENABLE KEYS */;


-- Volcando estructura para tabla softnotas.profesores_grupo
CREATE TABLE IF NOT EXISTS `profesores_grupo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `profesor_id` int(11) NOT NULL,
  `grupo_id` int(11) NOT NULL,
  `creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla softnotas.profesores_grupo: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `profesores_grupo` DISABLE KEYS */;
/*!40000 ALTER TABLE `profesores_grupo` ENABLE KEYS */;


-- Volcando estructura para tabla softnotas.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(15) NOT NULL,
  `password` varchar(15) NOT NULL,
  `permiso_id` int(1) NOT NULL,
  `estado` enum('ACTIVO','INACTIVO') NOT NULL,
  `creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla softnotas.usuarios: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` (`id`, `login`, `password`, `permiso_id`, `estado`, `creado`) VALUES
	(1, '1102798482', '822c02ba3311c81', 3, 'ACTIVO', '2015-07-28 23:17:33');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
