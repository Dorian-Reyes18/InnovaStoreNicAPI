DROP DATABASE IF EXISTS innovastorenicdb;

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema innovastorenicapp
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema innovastorenicapp
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `innovastorenicapp` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Roles` (
  `idRoles` INT NOT NULL AUTO_INCREMENT,
  `Rol` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idRoles`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Usuarios` (
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
    REFERENCES `mydb`.`Roles` (`idRoles`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Info_cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Info_cliente` (
  `idCliente` INT NOT NULL AUTO_INCREMENT,
  `Nombre completo` VARCHAR(500) NOT NULL,
  `celular` VARCHAR(8) NOT NULL,
  `domicilio` VARCHAR(800) NOT NULL,
  `gps` POINT NULL,
  PRIMARY KEY (`idCliente`),
  UNIQUE INDEX `celular_UNIQUE` (`celular` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Productos` (
  `idProductos` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(200) NOT NULL,
  `descripcion` VARCHAR(1000) NULL,
  `precio` INT NOT NULL,
  `cantidad` INT NOT NULL,
  PRIMARY KEY (`idProductos`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Estado_entrega`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Estado_entrega` (
  `idEstado_entrega` INT NOT NULL AUTO_INCREMENT,
  `estado` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idEstado_entrega`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Orden_venta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Orden_venta` (
  `idVentas` INT NOT NULL AUTO_INCREMENT,
  `pago_de_delivery` DECIMAL(10,2) NOT NULL,
  `fecha_de_registro` DATE NOT NULL,
  `Info_cliente_idCliente` INT NOT NULL,
  PRIMARY KEY (`idVentas`),
  INDEX `fk_Orden_venta_Info_cliente1_idx` (`Info_cliente_idCliente` ASC) VISIBLE,
  CONSTRAINT `fk_Orden_venta_Info_cliente1`
    FOREIGN KEY (`Info_cliente_idCliente`)
    REFERENCES `mydb`.`Info_cliente` (`idCliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Entrega`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Entrega` (
  `idEntrega` INT NOT NULL AUTO_INCREMENT,
  `Usuarios_idUsuarios` INT NOT NULL,
  `fecha_cambio_estado` DATETIME NULL,
  `fecha_de_carga` DATE NULL,
  `Orden_venta_idVentas` INT NOT NULL,
  `Estado_entrega_idEstado_entrega` INT NOT NULL,
  PRIMARY KEY (`idEntrega`),
  INDEX `fk_Entrega_Usuarios1_idx` (`Usuarios_idUsuarios` ASC) VISIBLE,
  INDEX `fk_Entrega_Orden_venta1_idx` (`Orden_venta_idVentas` ASC) VISIBLE,
  INDEX `fk_Entrega_Estado_entrega1_idx` (`Estado_entrega_idEstado_entrega` ASC) VISIBLE,
  CONSTRAINT `fk_Entrega_Usuarios1`
    FOREIGN KEY (`Usuarios_idUsuarios`)
    REFERENCES `mydb`.`Usuarios` (`idUsuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Entrega_Orden_venta1`
    FOREIGN KEY (`Orden_venta_idVentas`)
    REFERENCES `mydb`.`Orden_venta` (`idVentas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Entrega_Estado_entrega1`
    FOREIGN KEY (`Estado_entrega_idEstado_entrega`)
    REFERENCES `mydb`.`Estado_entrega` (`idEstado_entrega`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Pago_por_ventas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Pago_por_ventas` (
  `idPago_por_ventas` INT NOT NULL AUTO_INCREMENT,
  `fecha_de_pago` DATE NULL,
  `monto` DECIMAL(10,2) NULL,
  `Orden_venta_idVentas` INT NOT NULL,
  PRIMARY KEY (`idPago_por_ventas`),
  INDEX `fk_Pago_por_ventas_Orden_venta1_idx` (`Orden_venta_idVentas` ASC) VISIBLE,
  CONSTRAINT `fk_Pago_por_ventas_Orden_venta1`
    FOREIGN KEY (`Orden_venta_idVentas`)
    REFERENCES `mydb`.`Orden_venta` (`idVentas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`productos_asociados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`productos_asociados` (
  `Productos_idProductos` INT NOT NULL,
  `Orden_venta_idVentas` INT NOT NULL,
  INDEX `fk_productos_asociados_Productos1_idx` (`Productos_idProductos` ASC) VISIBLE,
  INDEX `fk_productos_asociados_Orden_venta1_idx` (`Orden_venta_idVentas` ASC) VISIBLE,
  CONSTRAINT `fk_productos_asociados_Productos1`
    FOREIGN KEY (`Productos_idProductos`)
    REFERENCES `mydb`.`Productos` (`idProductos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_productos_asociados_Orden_venta1`
    FOREIGN KEY (`Orden_venta_idVentas`)
    REFERENCES `mydb`.`Orden_venta` (`idVentas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `innovastorenicapp`.`Mes_y_año`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `innovastorenicapp`.`Mes_y_año` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Año` INT NULL,
  `Mes` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `innovastorenicapp`.`Total_dinero_recogido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `innovastorenicapp`.`Total_dinero_recogido` (
  `idTotal_dinero_recogido` INT NOT NULL AUTO_INCREMENT,
  `cantidad` INT NULL,
  `Mes_y_año_id` INT NOT NULL,
  PRIMARY KEY (`idTotal_dinero_recogido`),
  INDEX `fk_Total_dinero_recogido_Mes_y_año1_idx` (`Mes_y_año_id` ASC) VISIBLE,
  CONSTRAINT `fk_Total_dinero_recogido_Mes_y_año1`
    FOREIGN KEY (`Mes_y_año_id`)
    REFERENCES `innovastorenicapp`.`Mes_y_año` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Ventas_entregadas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Ventas_entregadas` (
  `idVentas_entregadas` INT NOT NULL AUTO_INCREMENT,
  `fecha_de_entrega` DATE NULL,
  `Orden_venta_idVentas` INT NOT NULL,
  `Total_dinero_recogido_idTotal_dinero_recogido` INT NOT NULL,
  PRIMARY KEY (`idVentas_entregadas`),
  INDEX `fk_Ventas_entregadas_Orden_venta1_idx` (`Orden_venta_idVentas` ASC) VISIBLE,
  INDEX `fk_Ventas_entregadas_Total_dinero_recogido1_idx` (`Total_dinero_recogido_idTotal_dinero_recogido` ASC) VISIBLE,
  CONSTRAINT `fk_Ventas_entregadas_Orden_venta1`
    FOREIGN KEY (`Orden_venta_idVentas`)
    REFERENCES `mydb`.`Orden_venta` (`idVentas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Ventas_entregadas_Total_dinero_recogido1`
    FOREIGN KEY (`Total_dinero_recogido_idTotal_dinero_recogido`)
    REFERENCES `innovastorenicapp`.`Total_dinero_recogido` (`idTotal_dinero_recogido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `innovastorenicapp` ;

-- -----------------------------------------------------
-- Table `innovastorenicapp`.`Historial_entregas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `innovastorenicapp`.`Historial_entregas` (
  `idHistorial_entregas` INT NOT NULL AUTO_INCREMENT,
  `total_entrega` INT NULL,
  PRIMARY KEY (`idHistorial_entregas`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `innovastorenicapp`.`entrega_finalizada`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `innovastorenicapp`.`entrega_finalizada` (
  `identrega_finalizada` INT NOT NULL,
  `Historial_entregas_idHistorial_entregas` INT NOT NULL,
  `fecha_entregada` DATE NULL,
  PRIMARY KEY (`identrega_finalizada`),
  INDEX `fk_entrega_finalizada_Historial_entregas1_idx` (`Historial_entregas_idHistorial_entregas` ASC) VISIBLE,
  CONSTRAINT `fk_entrega_finalizada_Historial_entregas1`
    FOREIGN KEY (`Historial_entregas_idHistorial_entregas`)
    REFERENCES `innovastorenicapp`.`Historial_entregas` (`idHistorial_entregas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `innovastorenicapp`.`entrega_finalizada_has_Entrega`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `innovastorenicapp`.`entrega_finalizada_has_Entrega` (
  `entrega_finalizada_identrega_finalizada` INT NOT NULL,
  `Entrega_idEntrega` INT NOT NULL,
  PRIMARY KEY (`entrega_finalizada_identrega_finalizada`, `Entrega_idEntrega`),
  INDEX `fk_entrega_finalizada_has_Entrega_Entrega1_idx` (`Entrega_idEntrega` ASC) VISIBLE,
  INDEX `fk_entrega_finalizada_has_Entrega_entrega_finalizada1_idx` (`entrega_finalizada_identrega_finalizada` ASC) VISIBLE,
  CONSTRAINT `fk_entrega_finalizada_has_Entrega_entrega_finalizada1`
    FOREIGN KEY (`entrega_finalizada_identrega_finalizada`)
    REFERENCES `innovastorenicapp`.`entrega_finalizada` (`identrega_finalizada`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_entrega_finalizada_has_Entrega_Entrega1`
    FOREIGN KEY (`Entrega_idEntrega`)
    REFERENCES `mydb`.`Entrega` (`idEntrega`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


INSERT INTO Roles ( Rol ) VALUES ('Administrador'), ('Inventarista'), ('Vendedor'), ('Delivery');

INSERT INTO Productos (nombre, descripcion, precio, cantidad ) VALUES ('Hidrolavadora', 'Ideal para lavar tus vehículos', 1000,5);

INSERT INTO Estado_entrega ( estado ) VALUES ('En proceso'),('Entregado'),('Recibido'),('Rechazado por cliente'),('Información erronea');

SELECT * FROM Estado_entrega;
SELECT * FROM Roles;
SELECT * FROM Productos;