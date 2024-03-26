SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `innovastorenicdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;

CREATE TABLE IF NOT EXISTS `innovastorenicdb`.`Roles` (
  `idRoles` INT NOT NULL AUTO_INCREMENT,
  `Rol` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idRoles`)
) ENGINE = InnoDB;

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
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `innovastorenicdb`.`Info_cliente` (
  `idCliente` INT NOT NULL AUTO_INCREMENT,
  `Nombre completo` VARCHAR(500) NOT NULL,
  `celular` VARCHAR(8) NOT NULL,
  `domicilio` VARCHAR(800) NOT NULL,
  `gps` POINT NULL,
  PRIMARY KEY (`idCliente`),
  UNIQUE INDEX `celular_UNIQUE` (`celular` ASC) VISIBLE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `innovastorenicdb`.`Productos` (
  `idProductos` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(200) NOT NULL,
  `descripcion` VARCHAR(1000) NULL,
  `precio` INT NOT NULL,
  `cantidad` INT NOT NULL,
  PRIMARY KEY (`idProductos`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `innovastorenicdb`.`Estado_venta` (
  `idEstado_venta` INT NOT NULL AUTO_INCREMENT,
  `estado` VARCHAR(45) NOT NULL,
  `fecha` DATE NOT NULL,
  PRIMARY KEY (`idEstado_venta`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `innovastorenicdb`.`Orden_venta` (
  `idVentas` INT NOT NULL AUTO_INCREMENT,
  `pago_de_delivery` INT NOT NULL,
  `fecha_de_registro` DATE NOT NULL,
  `Info_cliente_idCliente` INT NOT NULL,
  `Estado_venta_idEstado_venta` INT NOT NULL,
  PRIMARY KEY (`idVentas`),
  INDEX `fk_Orden_venta_Info_cliente1_idx` (`Info_cliente_idCliente` ASC) VISIBLE,
  INDEX `fk_Orden_venta_Estado_venta1_idx` (`Estado_venta_idEstado_venta` ASC) VISIBLE,
  CONSTRAINT `fk_Orden_venta_Info_cliente1`
    FOREIGN KEY (`Info_cliente_idCliente`)
    REFERENCES `innovastorenicdb`.`Info_cliente` (`idCliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Orden_venta_Estado_venta1`
    FOREIGN KEY (`Estado_venta_idEstado_venta`)
    REFERENCES `innovastorenicdb`.`Estado_venta` (`idEstado_venta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `innovastorenicdb`.`Entrega` (
  `idEntrega` INT NOT NULL AUTO_INCREMENT,
  `Usuarios_idUsuarios` INT NOT NULL,
  `fecha_entrega` DATE NULL,
  `hora_entrega` TIME NULL,
  `Orden_venta_idVentas` INT NOT NULL,
  PRIMARY KEY (`idEntrega`),
  INDEX `fk_Entrega_Usuarios1_idx` (`Usuarios_idUsuarios` ASC) VISIBLE,
  INDEX `fk_Entrega_Orden_venta1_idx` (`Orden_venta_idVentas` ASC) VISIBLE,
  CONSTRAINT `fk_Entrega_Usuarios1`
    FOREIGN KEY (`Usuarios_idUsuarios`)
    REFERENCES `innovastorenicdb`.`Usuarios` (`idUsuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Entrega_Orden_venta1`
    FOREIGN KEY (`Orden_venta_idVentas`)
    REFERENCES `innovastorenicdb`.`Orden_venta` (`idVentas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `innovastorenicdb`.`Pago_por_ventas` (
  `idPago_por_ventas` INT NOT NULL AUTO_INCREMENT,
  `cantidad_pago` INT NULL,
  `Orden_venta_idVentas` INT NOT NULL,
  PRIMARY KEY (`idPago_por_ventas`, `Orden_venta_idVentas`),
  INDEX `fk_Pago_por_ventas_Orden_venta1_idx` (`Orden_venta_idVentas` ASC) VISIBLE,
  CONSTRAINT `fk_Pago_por_ventas_Orden_venta1`
    FOREIGN KEY (`Orden_venta_idVentas`)
    REFERENCES `innovastorenicdb`.`Orden_venta` (`idVentas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `innovastorenicdb`.`productos_asociados` (
  `Productos_idProductos` INT NOT NULL,
  `Orden_venta_idVentas` INT NOT NULL,
  INDEX `fk_productos_asociados_Productos1_idx` (`Productos_idProductos` ASC) VISIBLE,
  INDEX `fk_productos_asociados_Orden_venta1_idx` (`Orden_venta_idVentas` ASC) VISIBLE,
  CONSTRAINT `fk_productos_asociados_Productos1`
    FOREIGN KEY (`Productos_idProductos`)
    REFERENCES `innovastorenicdb`.`Productos` (`idProductos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_productos_asociados_Orden_venta1`
    FOREIGN KEY (`Orden_venta_idVentas`)
    REFERENCES `innovastorenicdb`.`Orden_venta` (`idVentas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `innovastorenicapp`.`Total_dinero_recogido` (
  `idTotal_dinero_recogido` INT NOT NULL,
  `cantidad` INT NULL,
  PRIMARY KEY (`idTotal_dinero_recogido`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `innovastorenicdb`.`Ventas_entregadas` (
  `Orden_venta_idVentas` INT NOT NULL,
  `Historial_de_ventas_idHistorial_de_ventas` INT NOT NULL,
  `Total_dinero_recogido_idTotal_dinero_recogido` INT NOT NULL,
  PRIMARY KEY (`Orden_venta_idVentas`, `Historial_de_ventas_idHistorial_de_ventas`),
  INDEX `fk_Orden_venta_has_Historial_de_ventas_Orden_venta1_idx` (`Orden_venta_idVentas` ASC) VISIBLE,
  INDEX `fk_Ventas_entregadas_Total_dinero_recogido1_idx` (`Total_dinero_recogido_idTotal_dinero_recogido` ASC) VISIBLE,
  CONSTRAINT `fk_Orden_venta_has_Historial_de_ventas_Orden_venta1`
    FOREIGN KEY (`Orden_venta_idVentas`)
    REFERENCES `innovastorenicdb`.`Orden_venta` (`idVentas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Ventas_entregadas_Total_dinero_recogido1`
    FOREIGN KEY (`Total_dinero_recogido_idTotal_dinero_recogido`)
    REFERENCES `innovastorenicdb`.`Total_dinero_recogido` (`idTotal_dinero_recogido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `innovastorenicdb`.`Usuarios_con_sesión` (
  `idUsuarios_con_sesión` INT NOT NULL AUTO_INCREMENT,
  `ip_usuario` VARCHAR(100) NOT NULL,
  `Usuarios_idUsuarios` INT NOT NULL,
  PRIMARY KEY (`idUsuarios_con_sesión`),
  INDEX `fk_Usuarios_con_sesión_Usuarios_idx` (`Usuarios_idUsuarios` ASC) VISIBLE,
  CONSTRAINT `fk_Usuarios_con_sesión_Usuarios`
    FOREIGN KEY (`Usuarios_idUsuarios`)
    REFERENCES `innovastorenicdb`.`Usuarios` (`idUsuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `innovastorenicdb`.`Historial_entregas` (
  `idHistorial_entregas` INT NOT NULL AUTO_INCREMENT,
  `total_entrega` INT NULL,
  PRIMARY KEY (`idHistorial_entregas`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `innovastorenicdb`.`entrega_finalizada` (
  `identrega_finalizada` INT NOT NULL,
  `Entrega_idEntrega` INT NOT NULL,
  `Historial_entregas_idHistorial_entregas` INT NOT NULL,
  PRIMARY KEY (`identrega_finalizada`),
  INDEX `fk_entrega_finalizada_Entrega1_idx` (`Entrega_idEntrega` ASC) VISIBLE,
  INDEX `fk_entrega_finalizada_Historial_entregas1_idx` (`Historial_entregas_idHistorial_entregas` ASC) VISIBLE,
  CONSTRAINT `fk_entrega_finalizada_Entrega1`
    FOREIGN KEY (`Entrega_idEntrega`)
    REFERENCES `innovastorenicdb`.`Entrega` (`idEntrega`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_entrega_finalizada_Historial_entregas1`
    FOREIGN KEY (`Historial_entregas_idHistorial_entregas`)
    REFERENCES `innovastorenicdb`.`Historial_entregas` (`idHistorial_entregas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

