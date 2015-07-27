-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-07-2015 a las 04:48:06
-- Versión del servidor: 5.6.21
-- Versión de PHP: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `softnotas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `abonos`
--

CREATE TABLE IF NOT EXISTS `abonos` (
`id` int(11) NOT NULL,
  `estudiante_grupo_id` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `valor` varchar(20) DEFAULT NULL,
  `ususario_id` int(11) DEFAULT NULL,
  `creado` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `anios`
--

CREATE TABLE IF NOT EXISTS `anios` (
`id` int(4) NOT NULL,
  `anio` year(4) NOT NULL,
  `creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `anios`
--

INSERT INTO `anios` (`id`, `anio`, `creado`) VALUES
(1, 2015, '2015-07-04 18:10:05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cordinadores`
--

CREATE TABLE IF NOT EXISTS `cordinadores` (
`id` int(11) NOT NULL,
  `grupo_id` int(11) NOT NULL,
  `profesor_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cordinadores`
--

INSERT INTO `cordinadores` (`id`, `grupo_id`, `profesor_id`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE IF NOT EXISTS `cursos` (
`id` int(11) NOT NULL,
  `curso` varchar(100) NOT NULL,
  `detalle` varchar(200) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`id`, `curso`, `detalle`) VALUES
(1, 'Diseño de modas', 'curso de 6 semestres con enfasis en moda.     ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantes`
--

CREATE TABLE IF NOT EXISTS `estudiantes` (
`id` int(11) NOT NULL,
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
  `creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `estudiantes`
--

INSERT INTO `estudiantes` (`id`, `usuario_id`, `identificacion`, `tipo_identificacion`, `nombres`, `apellidos`, `sexo`, `fecha_nacimiento`, `direccion`, `telefono`, `estado`, `creado`) VALUES
(2, 0, '1102798482', 'CC', 'JOSE ENRIQUE', 'TUÑON VILLALBA', 'M', '2015-07-09', 'CALLE 32 # 16 - 31', '3014978369', 'ACTIVO', '2015-07-26 17:19:59');

--
-- Disparadores `estudiantes`
--
DELIMITER //
CREATE TRIGGER `usuario_estudiante` AFTER INSERT ON `estudiantes`
 FOR EACH ROW begin
insert into usuarios (login, password, permisos) VALUES (new.identificacion, md5(new.identificacion), 'estudiante');
end
//
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantes_grupo`
--

CREATE TABLE IF NOT EXISTS `estudiantes_grupo` (
`id` int(11) NOT NULL,
  `estudiante_id` int(11) NOT NULL,
  `grupo_id` int(11) NOT NULL,
  `descuento` int(11) NOT NULL,
  `total` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `estudiantes_grupo`
--

INSERT INTO `estudiantes_grupo` (`id`, `estudiante_id`, `grupo_id`, `descuento`, `total`) VALUES
(1, 2, 1, 10, 90000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupos`
--

CREATE TABLE IF NOT EXISTS `grupos` (
`id` int(11) NOT NULL,
  `curso_id` int(11) NOT NULL,
  `anio_id` int(11) NOT NULL,
  `valor` int(11) NOT NULL,
  `jornada_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `grupos`
--

INSERT INTO `grupos` (`id`, `curso_id`, `anio_id`, `valor`, `jornada_id`) VALUES
(1, 1, 1, 100000, 2),
(2, 1, 1, 100000, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jornadas`
--

CREATE TABLE IF NOT EXISTS `jornadas` (
`id` int(11) NOT NULL,
  `jornada` varchar(50) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `jornadas`
--

INSERT INTO `jornadas` (`id`, `jornada`) VALUES
(1, 'MATINAL'),
(2, 'VESPERTINA'),
(3, 'NOCTURNA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logueos_user`
--

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notas`
--

CREATE TABLE IF NOT EXISTS `notas` (
`id` int(11) NOT NULL,
  `periodo_id` int(11) NOT NULL,
  `estudiates_grupo_id` int(11) NOT NULL,
  `profesor_id` int(11) NOT NULL,
  `nota` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `periodos`
--

CREATE TABLE IF NOT EXISTS `periodos` (
`id` int(11) NOT NULL,
  `anio_id` int(4) NOT NULL,
  `periodo` varchar(1) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_final` date NOT NULL,
  `estado` enum('ACTIVO','INACTIVO') DEFAULT NULL,
  `creado` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesores`
--

CREATE TABLE IF NOT EXISTS `profesores` (
`id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL DEFAULT '0',
  `identificacion` varchar(15) NOT NULL,
  `tipo_identificacion` varchar(2) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `sexo` varchar(1) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `profesores`
--

INSERT INTO `profesores` (`id`, `usuario_id`, `identificacion`, `tipo_identificacion`, `nombres`, `apellidos`, `sexo`, `fecha_nacimiento`, `direccion`, `telefono`, `creado`) VALUES
(2, 0, '225488', 'CC', 'CALIXTO ENRIQUE', 'TUÑON MARTINEZ', 'M', '2015-07-16', 'CALLE 32 # 16 - 31', '3012356987', '2015-07-26 17:19:55');

--
-- Disparadores `profesores`
--
DELIMITER //
CREATE TRIGGER `usuario_profesor` AFTER INSERT ON `profesores`
 FOR EACH ROW begin
insert into usuarios (login, password, permisos) VALUES (new.identificacion, md5(new.identificacion), 'profesor');
end
//
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesores_curso`
--

CREATE TABLE IF NOT EXISTS `profesores_curso` (
`id` int(11) NOT NULL,
  `profesor_id` int(11) NOT NULL,
  `grupo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
`id` int(11) NOT NULL,
  `login` varchar(40) NOT NULL,
  `password` varchar(40) NOT NULL,
  `permisos` varchar(20) NOT NULL,
  `estado` enum('ACTIVO','INACTIVO') NOT NULL,
  `creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `login`, `password`, `permisos`, `estado`, `creado`) VALUES
(1, '225488', 'a8f30714cb23d9a75910d5359faad11b', 'profesor', 'ACTIVO', '2015-07-26 17:19:55'),
(2, '1102798482', '822c02ba3311c81581468075f92160c1', 'estudiante', 'ACTIVO', '2015-07-26 17:19:59');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `abonos`
--
ALTER TABLE `abonos`
 ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `anios`
--
ALTER TABLE `anios`
 ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cordinadores`
--
ALTER TABLE `cordinadores`
 ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
 ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
 ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `estudiantes_grupo`
--
ALTER TABLE `estudiantes_grupo`
 ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `grupos`
--
ALTER TABLE `grupos`
 ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `jornadas`
--
ALTER TABLE `jornadas`
 ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `notas`
--
ALTER TABLE `notas`
 ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `periodos`
--
ALTER TABLE `periodos`
 ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `profesores`
--
ALTER TABLE `profesores`
 ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `profesores_curso`
--
ALTER TABLE `profesores_curso`
 ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `abonos`
--
ALTER TABLE `abonos`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `anios`
--
ALTER TABLE `anios`
MODIFY `id` int(4) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `cordinadores`
--
ALTER TABLE `cordinadores`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `cursos`
--
ALTER TABLE `cursos`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `estudiantes_grupo`
--
ALTER TABLE `estudiantes_grupo`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `grupos`
--
ALTER TABLE `grupos`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `jornadas`
--
ALTER TABLE `jornadas`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `notas`
--
ALTER TABLE `notas`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `periodos`
--
ALTER TABLE `periodos`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `profesores`
--
ALTER TABLE `profesores`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `profesores_curso`
--
ALTER TABLE `profesores_curso`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
