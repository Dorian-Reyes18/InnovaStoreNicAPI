DROP DATABASE IF EXISTS innovastorenicdb;

CREATE SCHEMA IF NOT EXISTS `innovastorenicdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `innovastorenicdb` ;

CREATE TABLE IF NOT EXISTS `innovastorenicdb`.`Roles` (
  `idRoles` INT NOT NULL AUTO_INCREMENT,
  `Rol` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idRoles`))
ENGINE = InnoDB;

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

CREATE TABLE IF NOT EXISTS `innovastorenicdb`.`Info_cliente` (
  `idCliente` INT NOT NULL AUTO_INCREMENT,
  `Nombre completo` VARCHAR(500) NOT NULL,
  `celular` VARCHAR(8) NOT NULL,
  `domicilio` VARCHAR(800) NOT NULL,
  `gps` POINT NULL,
  PRIMARY KEY (`idCliente`),
  UNIQUE INDEX `celular_UNIQUE` (`celular` ASC) VISIBLE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `innovastorenicdb`.`Productos` (
  `idProductos` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(200) NOT NULL,
  `descripcion` VARCHAR(1000) NULL,
  `precio` INT NOT NULL,
  `cantidad` INT NOT NULL,
  PRIMARY KEY (`idProductos`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `innovastorenicdb`.`Estado_venta` (
  `idEstado_venta` INT NOT NULL AUTO_INCREMENT,
  `estado` VARCHAR(45) NOT NULL,
  `control_de_cambios` DATE NULL,
  PRIMARY KEY (`idEstado_venta`))
ENGINE = InnoDB;

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
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `innovastorenicdb`.`Entrega` (
  `idEntrega` INT NOT NULL AUTO_INCREMENT,
  `Usuarios_idUsuarios` INT NOT NULL,
  `fecha_de_carga` DATE NULL,
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
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `innovastorenicdb`.`Pago_por_ventas` (
  `idPago_por_ventas` INT NOT NULL AUTO_INCREMENT,
  `cantidad_pago` INT NULL,
  `Orden_venta_idVentas` INT NOT NULL,
  PRIMARY KEY (`idPago_por_ventas`),
  INDEX `fk_Pago_por_ventas_Orden_venta1_idx` (`Orden_venta_idVentas` ASC) VISIBLE,
  CONSTRAINT `fk_Pago_por_ventas_Orden_venta1`
    FOREIGN KEY (`Orden_venta_idVentas`)
    REFERENCES `innovastorenicdb`.`Orden_venta` (`idVentas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

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
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `innovastorenicapp`.`Mes_y_año` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Año` INT NULL,
  `Mes` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

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

CREATE TABLE IF NOT EXISTS `innovastorenicdb`.`Ventas_entregadas` (
  `idVentas_entregadas` INT NOT NULL AUTO_INCREMENT,
  `fecha_de_entrega` DATE NULL,
  `Orden_venta_idVentas` INT NOT NULL,
  `Total_dinero_recogido_idTotal_dinero_recogido` INT NOT NULL,
  PRIMARY KEY (`idVentas_entregadas`),
  INDEX `fk_Ventas_entregadas_Orden_venta1_idx` (`Orden_venta_idVentas` ASC) VISIBLE,
  INDEX `fk_Ventas_entregadas_Total_dinero_recogido1_idx` (`Total_dinero_recogido_idTotal_dinero_recogido` ASC) VISIBLE,
  CONSTRAINT `fk_Ventas_entregadas_Orden_venta1`
    FOREIGN KEY (`Orden_venta_idVentas`)
    REFERENCES `innovastorenicdb`.`Orden_venta` (`idVentas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Ventas_entregadas_Total_dinero_recogido1`
    FOREIGN KEY (`Total_dinero_recogido_idTotal_dinero_recogido`)
    REFERENCES `innovastorenicapp`.`Total_dinero_recogido` (`idTotal_dinero_recogido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `innovastorenicapp` ;

CREATE TABLE IF NOT EXISTS `innovastorenicapp`.`Historial_entregas` (
  `idHistorial_entregas` INT NOT NULL AUTO_INCREMENT,
  `total_entrega` INT NULL,
  PRIMARY KEY (`idHistorial_entregas`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `innovastorenicapp`.`entrega_finalizada` (
  `identrega_finalizada` INT NOT NULL,
  `Entrega_idEntrega` INT NOT NULL,
  `Historial_entregas_idHistorial_entregas` INT NOT NULL,
  `fecha_entregada` DATE NULL,
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
    REFERENCES `innovastorenicapp`.`Historial_entregas` (`idHistorial_entregas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

INSERT INTO Roles ( Rol ) VALUES
('Administrador'), ('Inventarista'), ('Vendedor'), ('Delivery');

INSERT INTO Productos (nombre, descripcion, precio, cantidad ) VALUES ('Hidrolavadora', 'Ideal para lavar tus vehículos', 1000,5);

SELECT * FROM Roles;
SELECT * FROM Productos;