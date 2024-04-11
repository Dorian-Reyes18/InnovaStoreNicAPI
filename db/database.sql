DROP DATABASE IF EXISTS innovastorenicdb;
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema innovastorenicdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema innovastorenicdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `innovastorenicdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
-- -----------------------------------------------------
-- Schema innovastorenicdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema innovastorenicdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `innovastorenicdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `innovastorenicdb` ;

-- -----------------------------------------------------
-- Table `innovastorenicdb`.`Roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `innovastorenicdb`.`Roles` (
  `idRoles` INT NOT NULL AUTO_INCREMENT,
  `Rol` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idRoles`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `innovastorenicdb`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `innovastorenicdb`.`Usuarios` (
  `idUsuarios` INT NOT NULL AUTO_INCREMENT,
  `celular` VARCHAR(8) NOT NULL,
  `nombre` VARCHAR(45) NULL,
  `Apellido` VARCHAR(45) NULL,
  `contraseña` VARCHAR(200) NOT NULL,
  `domicilio` VARCHAR(800) NULL,
  `fecha_nacimiento` DATE NULL,
  `Roles_idRoles` INT NOT NULL,
  PRIMARY KEY (`idUsuarios`),
  UNIQUE INDEX `celular_UNIQUE` (`celular` ASC) VISIBLE,
  INDEX `fk_Usuarios_Roles1_idx` (`Roles_idRoles` ASC) VISIBLE,
  CONSTRAINT `fk_Usuarios_Roles1`
    FOREIGN KEY (`Roles_idRoles`)
    REFERENCES `innovastorenicdb`.`Roles` (`idRoles`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `innovastorenicdb`.`Info_cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `innovastorenicdb`.`Info_cliente` (
  `idCliente` INT NOT NULL AUTO_INCREMENT,
  `Nombre completo` VARCHAR(500) NOT NULL,
  `celular` VARCHAR(8) NOT NULL,
  `domicilio` VARCHAR(800) NOT NULL,
  `gps` VARCHAR(1000) NULL,
  `fecha_creacion` DATE NULL,
  PRIMARY KEY (`idCliente`),
  UNIQUE INDEX `celular_UNIQUE` (`celular` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `innovastorenicdb`.`Productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `innovastorenicdb`.`Productos` (
  `idProductos` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(200) NOT NULL,
  `descripcion` VARCHAR(1000) NULL,
  `precio` INT NOT NULL,
  `cantidad` INT NOT NULL,
  PRIMARY KEY (`idProductos`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `innovastorenicdb`.`Estado_entrega`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `innovastorenicdb`.`Estado_entrega` (
  `idEstado_entrega` INT NOT NULL AUTO_INCREMENT,
  `estado` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idEstado_entrega`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `innovastorenicdb`.`Orden_venta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `innovastorenicdb`.`Orden_venta` (
  `idVentas` INT NOT NULL AUTO_INCREMENT,
  `pago_de_delivery` DECIMAL(10,2) NOT NULL,
  `fecha_de_registro` DATE NOT NULL,
  `Info_cliente_idCliente` INT NOT NULL,
  `Usuarios_idUsuarios` INT NOT NULL,
  PRIMARY KEY (`idVentas`),
  INDEX `fk_Orden_venta_Info_cliente1_idx` (`Info_cliente_idCliente` ASC) VISIBLE,
  INDEX `fk_Orden_venta_Usuarios1_idx` (`Usuarios_idUsuarios` ASC) VISIBLE,
  CONSTRAINT `fk_Orden_venta_Info_cliente1`
    FOREIGN KEY (`Info_cliente_idCliente`)
    REFERENCES `innovastorenicdb`.`Info_cliente` (`idCliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Orden_venta_Usuarios1`
    FOREIGN KEY (`Usuarios_idUsuarios`)
    REFERENCES `innovastorenicdb`.`Usuarios` (`idUsuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `innovastorenicdb`.`Entrega`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `innovastorenicdb`.`Entrega` (
  `idEntrega` INT NOT NULL AUTO_INCREMENT,
  `Usuarios_idUsuarios` INT NOT NULL,
  `fecha_cambio_estado` DATE NULL,
  `fecha_de_carga` DATE NULL,
  `Orden_venta_idVentas` INT NOT NULL,
  `Estado_entrega_idEstado_entrega` INT NOT NULL,
  PRIMARY KEY (`idEntrega`),
  INDEX `fk_Entrega_Usuarios1_idx` (`Usuarios_idUsuarios` ASC) VISIBLE,
  INDEX `fk_Entrega_Orden_venta1_idx` (`Orden_venta_idVentas` ASC) VISIBLE,
  INDEX `fk_Entrega_Estado_entrega1_idx` (`Estado_entrega_idEstado_entrega` ASC) VISIBLE,
  CONSTRAINT `fk_Entrega_Usuarios1`
    FOREIGN KEY (`Usuarios_idUsuarios`)
    REFERENCES `innovastorenicdb`.`Usuarios` (`idUsuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Entrega_Orden_venta1`
    FOREIGN KEY (`Orden_venta_idVentas`)
    REFERENCES `innovastorenicdb`.`Orden_venta` (`idVentas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Entrega_Estado_entrega1`
    FOREIGN KEY (`Estado_entrega_idEstado_entrega`)
    REFERENCES `innovastorenicdb`.`Estado_entrega` (`idEstado_entrega`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `innovastorenicdb`.`Pago_por_ventas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `innovastorenicdb`.`Pago_por_ventas` (
  `idPago_por_ventas` INT NOT NULL AUTO_INCREMENT,
  `fecha_de_pago` DATE NULL,
  `monto` DECIMAL(10,2) NULL,
  `Orden_venta_idVentas` INT NOT NULL,
  PRIMARY KEY (`idPago_por_ventas`),
  INDEX `fk_Pago_por_ventas_Orden_venta1_idx` (`Orden_venta_idVentas` ASC) VISIBLE,
  CONSTRAINT `fk_Pago_por_ventas_Orden_venta1`
    FOREIGN KEY (`Orden_venta_idVentas`)
    REFERENCES `innovastorenicdb`.`Orden_venta` (`idVentas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `innovastorenicdb`.`Detalle-orden-venta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `innovastorenicdb`.`Detalle-orden-venta` (
  `Productos_idProductos` INT NOT NULL,
  `Orden_venta_idVentas` INT NOT NULL,
  `Cantidad` INT NOT NULL,
  PRIMARY KEY (`Productos_idProductos`, `Orden_venta_idVentas`),
  INDEX `fk_Productos_has_Orden_venta_Orden_venta1_idx` (`Orden_venta_idVentas` ASC) VISIBLE,
  INDEX `fk_Productos_has_Orden_venta_Productos1_idx` (`Productos_idProductos` ASC) VISIBLE,
  CONSTRAINT `fk_Productos_has_Orden_venta_Productos1`
    FOREIGN KEY (`Productos_idProductos`)
    REFERENCES `innovastorenicdb`.`Productos` (`idProductos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Productos_has_Orden_venta_Orden_venta1`
    FOREIGN KEY (`Orden_venta_idVentas`)
    REFERENCES `innovastorenicdb`.`Orden_venta` (`idVentas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `innovastorenicdb` ;

-- -----------------------------------------------------
-- Table `innovastorenicdb`.`entrega_finalizada`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `innovastorenicdb`.`entrega_finalizada` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fecha_finalizada` DATE NULL,
  `Entrega_idEntrega` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_entrega_finalizada_Entrega1_idx` (`Entrega_idEntrega` ASC) VISIBLE,
  CONSTRAINT `fk_entrega_finalizada_Entrega1`
    FOREIGN KEY (`Entrega_idEntrega`)
    REFERENCES `innovastorenicdb`.`Entrega` (`idEntrega`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


USE `innovastorenicdb` ;

INSERT INTO Roles ( Rol ) VALUES ('Administrador'), ('Inventarista'), ('Vendedor'), ('Delivery');

INSERT INTO Productos (nombre, descripcion, precio, cantidad ) VALUES ('Hidrolavadora', 'Ideal para lavar tus vehículos', 1000,5);

INSERT INTO Estado_entrega ( estado ) VALUES ('Recibido'),('En proceso'), ('Entregado'), ('Rechazado por cliente'),('Información erronea');

INSERT INTO Info_cliente (`Nombre completo`, celular, domicilio, gps, fecha_creacion) 
VALUES('Dorian Francisco Reyes Garcia', '81180249', 'Antigua pepsi', 'https://maps.app.goo.gl/EYTDwMjVhqphQEaR7', '2024-04-04');


SELECT * FROM Estado_entrega;
SELECT * FROM Roles;
SELECT * FROM Productos;
SELECT * FROM Info_cliente;
