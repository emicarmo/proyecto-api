-- MySQL Script generated by MySQL Workbench
-- Wed Jul  3 15:30:50 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `ceij_libros` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ceij_libros` DEFAULT CHARACTER SET utf8 ;
USE `ceij_libros`;

drop table detalle_carrito;
drop table libros;
drop table carrito;
drop table usuarios;
drop table categoria;

-- -----------------------------------------------------
-- Table `ceij_libros`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ceij_libros`.`usuarios` (
  `id_usuarios` INT NOT NULL AUTO_INCREMENT,
  `usuario` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `fecha_nacimiento` DATE NULL,
  `telefono` VARCHAR(45) NOT NULL,
  `direccion` VARCHAR(255) NOT NULL,
  `ciudad` VARCHAR(100) NOT NULL,
  `provincia` VARCHAR(100) NOT NULL,
  `pais` VARCHAR(45) NOT NULL,
  `codigo_postal` VARCHAR(45) NOT NULL,
  `rol` ENUM('Administrador', 'Cliente') NOT NULL DEFAULT 'Cliente',
  `status` ENUM("activo", "inactivo") NOT NULL DEFAULT 'activo',
  PRIMARY KEY (`id_usuarios`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `usuario_UNIQUE` ON `ceij_libros`.`usuarios` (`usuario` ASC) VISIBLE;

CREATE UNIQUE INDEX `email_UNIQUE` ON `ceij_libros`.`usuarios` (`email` ASC) VISIBLE;

CREATE UNIQUE INDEX `id_usuarios_UNIQUE` ON `ceij_libros`.`usuarios` (`id_usuarios` ASC) VISIBLE;

select * from usuarios;

-- -----------------------------------------------------
-- Table ceij_libros`.`carrito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ceij_libros`.`carrito` (
  `id_carrito` INT NOT NULL AUTO_INCREMENT,
  `usuarios_id` INT NOT NULL,
  PRIMARY KEY (`id_carrito`),
  CONSTRAINT `fk_pedidos_usuarios1`
    FOREIGN KEY (`usuarios_id`)
    REFERENCES `ceij_libros`.`usuarios` (`id_usuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE UNIQUE INDEX `id_pedidos_UNIQUE` ON `ceij_libros`.`carrito` (`id_carrito` ASC) VISIBLE;

CREATE INDEX `fk_pedidos_usuarios1_idx` ON `ceij_libros`.`carrito` (`usuarios_id` ASC) VISIBLE;

-- -----------------------------------------------------
-- Table ceij_libros`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ceij_libros`.`categoria` (
  `id_categoria` INT NOT NULL AUTO_INCREMENT,
  `nombre_cat` VARCHAR(45) NULL,
  PRIMARY KEY (`id_categoria`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `id_categoria_UNIQUE` ON `ceij_libros`.`categoria` (`id_categoria` ASC) VISIBLE;

insert into categoria (nombre_cat)
values("Historia"),
	  ("Psicologia"),
      ("Cienca Ficción"),
      ('Romance'),
	  ('Terror'),
      ('Clasicos'),
      ('Policial'),
      ('Filosofia'),
      ('Fantasia');

select * from categoria;

-- -----------------------------------------------------
-- Table ceij_libros`.`libros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ceij_libros`.`libros` (
  `id_libros` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `categoria_id` INT NOT NULL,
  `editorial` VARCHAR(45) NOT NULL,
  `precio` DECIMAL NOT NULL,
  `stock` INT NOT NULL,
  `descripcion` VARCHAR(1000) NOT NULL,
  `imagen` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_libros`),
  CONSTRAINT `fk_libros_categoria`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `ceij_libros`.`categoria` (`id_categoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_libros_categoria_idx` ON `ceij_libros`.`libros` (`categoria_id` ASC) VISIBLE;

CREATE UNIQUE INDEX `id_libros_UNIQUE` ON `ceij_libros`.`libros` (`id_libros` ASC) VISIBLE;

insert into libros(
nombre,
categoria_id,
editorial,
precio,
stock,
descripcion,
imagen
)
values('Fahrenheit 451', 3, 'Minotauro', 25200, 4, 'Guy Montag es un bombero y el trabajo de un bombero es quemar libros, que están prohibidos porque son causa de discordia y sufrimiento.El Sabueso Mecánico del Departamento de Incendios, armado con una letal inyección hipodérmica, escoltado por helicópteros, está preparado para rastrear a los disidentes que aún conservan y leen libros.', 'image/Fahrenheit-451.jpg'),
      ('La Naranja Mecanica', 3, 'Minotauro', 25200, 3, 'Al quinceañero Alex le gustan los latigazos de ultraviolencia. Junto a su pandilla de amigos, roban, matan y violan en un futuro de pesadilla, hasta que el Estado pone fin a sus desmanes. Pero ¿qué significará para él su reeducación?', 'image/La-naranja-mecanica.jpg'),
      ('Don Quijote de la Mancha', 6, 'Editorial Planeta', 33000, 2, 'Don Quijote, entregado al delirio producido por la lectura en exceso de las novelas de caballería medievales, sale a imponer justicia por la llanura manchega en compañía de su fiel escudero Sancho Panza.', 'image/Don-Quijote-de-la-Mancha.jpg'),
      ('La Metamorfosis', 6, 'Planetalector', 17400, 3, 'La metamorfosis es uno de los relatos más conmovedores e inquietantes de la literatura de todos los tiempos. La animalización del hombre manifiesta, entre otras cosas, la desesperanza frente a un destino personal pero también el pesimismo respecto a lo humano en términos más generales.', 'image/La-Metamorfosis.jpg'),
      ('El Guardian de espadas', 9, 'Crossbooks', 34900, 4, 'En la bulliciosa ciudad-estado de Castelana, un joven huérfano llamado Kel es arrebatado de su humilde origen para llevarlo a La Colina, donde le espera una vida llena de lujos y peligros.', 'image/El-guardian-de-espadas.jpg'),
      ('Kalpa imperial', 9, 'Minotauro', 21900, 5, 'Kalpa imperial reúne once relatos, once fragmentos de la historia del Imperio más Vasto que nunca existió. El Imperio, de hecho, ha sido destruido y reconstruido infinidad de veces, y su historia vuelve a empezar con cada nueva dinastía de emperadores y emperatrices.', 'image/Kalpa-imperial.jpg'),
      ('En las cimas de la desesperación', 8, 'Tusquets Editores', 24100, 3, 'El genial autor rumano reflexiona aquí, con su apasionado estilo, sobre la melancolía y el éxtasis, la soledad y el sufrimiento, el instante y la eternidad, la miseria de la sabiduría o el entusiasmo como forma de amor.', 'image/En-las-cimas-de-la-desesperacion.jpg'),
      ('La dispersión de la idiotez', 8, 'Tusquets Editores', 18600, 3, 'Axel Cherniavsky enfrenta en su libro las diﬁcultades de deﬁnir la idiotez hasta las últimas consecuencias. Descubre así que esta ﬁgura apa-rentemente trivial tiene la fuerza para desaﬁar nuestros hábitos intelectuales más arraigados, para cuestionar los valores más evidentes: es rápida, escurridiza, mucho más ágil que quienes buscamos pensarla.', 'image/La-dispersión-de-la-idiotez.jpg'),
      ('30 días, la trama del atentado a la AMIA', 1, 'Editorial Planeta', 24900, 3, '30 DÍAS relata un fragmento de la historia, un capítulo de la década de 1990 que marcó la Argentina para siempre: el atentado a la Asociación Mutual Isarelita Argentina (AMIA).', 'image/30-dias-la-trama-del-atentado-a-la-amia.jpg'),
      ('Malvinas', 1, 'Editorial Ariel', 22000, 2, 'Mucho se ha escrito sobre Malvinas y casi todos los ciudadanos de este país tienen una opinión sobre qué postura debe sostener la Argentina frente a Gran Bretaña y el gobierno de las islas. Estas páginas reveladoras cuentan eso: cómo es ese territorio utópico e ignorado.', 'image/Malvinas.jpg'),
      ('El espía que surgió del frío', 7, 'Editorial Planeta', 15000, 5, 'A la sombra del reciente Muro de Berlín, Alec Leamas asiste al asesinato de su último agente, muerto de un disparo a manos de los guardias de la RDA. Para Leamas, antiguo responsable del espionaje inglés en Alemania Oriental, la guerra fría se ha acabado. Mientras se enfrenta a la perspectiva de retirarse, o aún peor, de trabajar en una oficina, Control le ofrece una oportunidad única para vengarse.', 'image/El-espia-que-surgio-del-frio.jpg'),
      ('Las memorias de Sherlock Holmes', 7, 'Booket', 18000, 4, 'El ingenioso Sherlock Holmes, con la ayuda del Dr. Watson, se enfrenta a algunos de sus casos más endiabladamente intrincados. Holmes y Watson se ven envueltos en diversos sucesos en Inglaterra, que van desde un misterio que involucra a un caballo de carreras perdido hasta su encuentro en la Cataratas de Reichenbach con el archienemigo de Sherlock, el malvado profesor Moriarty.', 'image/Las-memorias-de-Sherlock-Holmes.jpg'),
      ('La psicología del dinero', 2, 'Editorial Planeta', 27400, 3, 'Este libro, llamado a convertirse en un clásico de las finanzas personales, nos provee del conocimiento esencial para entender la psicología del dinero y nos invita a hacernos una pregunta fundamental que raramente nos hacemos, cuál es nuestra relación con el dinero y qué queremos realmente de él.', 'image/La-psicologia-del-dinero.jpg'),
      ('La realidad por sorpresa', 2, 'Ediciones Paidós', 21900, 2, 'Este trabajo de José Luis Juresa, un apasionado recorrido por la historia, las herramientas y las preguntas (más que las respuestas) que el psicoanálisis ha sido capaz de generar. “¿Cuál es la razón por la que la fe en las palabras resulta ser eficaz para aliviar el padecimiento?”, se pregunta de modo pertinente el autor de este libro “escrito por un lector, no por un especialista; escrito por alguien que está pensando, mientras escribe, la pulsión, el amor, el cuerpo, el deseo, la erótica de la vida”.', 'image/La-realidad-por-sorpresa.jpg'),
      ('Te espero en el fin del mundo', 4, 'Crossbooks', 34900, 4, 'Violet y Levi se conocen desde niños. Él sueña con crear un hogar, ella, con escapar del suyo. Son mejores amigos, siempre están el uno para el otro y, cuando empiezan a crecer, se dan cuenta de que sus sentimientos también lo hacen. Intensos. Imparables. Únicos.', 'image/Te-espero-en-el-fin-del-mundo.jpg'),
      ('Todos los lugares que mantuvimos en secreto', 4, 'Editorial Planeta', 34900, 3, 'Maeve no sabe mucho sobre sí misma. Solo que no deja de pensar en si su madre cumplió todos sus sueños antes de morir, que la relación con su novio va cada vez peor y que está cansada de que todos sus días sean iguales.', 'image/Todos-los-lugares-que-mantuvimos-en-secreto.jpg'),
      ('El exorcismo de mi mejor amiga', 5, 'Minotauro', 25200, 3, 'Dos jóvenes estudiantes de secundaria, Abby y Gretchen, son mejores amigas desde la infancia. Pero después de una noche de fiesta en la que todo les sale espantosamente mal, Gretchen comienza a cambiar... Está siempre de mal humor, irritable. Y empiezan a sucederse extraños incidentes en los que, invariablemente, Gretchen está implicada.', 'image/El-exorcismo-de-mi-mejor-amiga.jpg'),
      ('Un legado de sangre', 5, 'Minotauro', 22000, 2, 'Cuando un misterioso desconocido la salva de las garras de la muerte, Constanta se ve transformada de una campesina medieval a una novia digna de un rey eterno. Pero cuando Drácula atrae a una aristócrata ingeniosa y a un artista famélico hacia su red de pasión y mentiras, Constanta comprende que su amado es capaz de lo peor.', 'image/Un-legado-de-sangre.jpg');
      

select * from libros;

-- -----------------------------------------------------
-- Table ceij_libros`.`detalle_carrito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ceij_libros`.`detalle_carrito` (
  `carrito_id_carrito` INT NOT NULL,
  `libros_id` INT NOT NULL,
  `cantidad_producto` INT NOT NULL,
  PRIMARY KEY (`carrito_id_carrito`, `libros_id`),
  CONSTRAINT `fk_carrito_has_libros_carrito1`
    FOREIGN KEY (`carrito_id_carrito`)
    REFERENCES `ceij_libros`.`carrito` (`id_carrito`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_carrito_has_libros_libros1`
    FOREIGN KEY (`libros_id`)
    REFERENCES `ceij_libros`.`libros` (`id_libros`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_carrito_has_libros_libros1_idx` ON `ceij_libros`.`detalle_carrito` (`libros_id` ASC) VISIBLE;

CREATE INDEX `fk_carrito_has_libros_carrito1_idx` ON `ceij_libros`.`detalle_carrito` (`carrito_id_carrito` ASC) VISIBLE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
