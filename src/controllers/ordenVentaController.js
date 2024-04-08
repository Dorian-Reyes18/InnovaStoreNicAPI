import { pool } from "../db.js";

export const obtenerOrdenesVenta = async (req, res) => {
  try {
    const sql = "SELECT * FROM Orden_venta";
    const [rows, fields] = await pool.query(sql);
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener las órdenes de venta:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const obtenerOrdenVentaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = "SELECT * FROM Orden_venta WHERE idVentas = ?";
    const [rows, fields] = await pool.query(sql, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Orden de venta no encontrada" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener la orden de venta:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const crearOrdenVenta = async (req, res) => {
  try {
    const {
      pago_de_delivery,
      fecha_de_registro,
      Info_cliente_idCliente,
      Usuarios_idUsuarios,
    } = req.body;

    // Insertar la orden de venta en la base de datos
    const sqlInsertOrdenVenta =
      "INSERT INTO Orden_venta (pago_de_delivery, fecha_de_registro, Info_cliente_idCliente, Usuarios_idUsuarios) VALUES (?, ?, ?, ?)";
    const resultOrdenVenta = await pool.query(sqlInsertOrdenVenta, [
      pago_de_delivery,
      fecha_de_registro,
      Info_cliente_idCliente,
      Usuarios_idUsuarios,
    ]);
    const idOrdenVenta = resultOrdenVenta.insertId; // Obtener el ID de la orden de venta recién creada

    res.json({
      message: "Orden de venta creada correctamente",
      idVentas: idOrdenVenta,
    });
  } catch (error) {
    console.error("Error al agregar una nueva orden de venta:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const actualizarOrdenVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      pago_de_delivery,
      fecha_de_registro,
      Info_cliente_idCliente,
      Usuarios_idUsuarios,
    } = req.body;

    // Actualizar los datos básicos de la orden de venta
    const sqlUpdateOrdenVenta =
      "UPDATE Orden_venta SET pago_de_delivery = ?, fecha_de_registro = ?, Info_cliente_idCliente = ?, Usuarios_idUsuarios = ? WHERE idVentas = ?";
    await pool.query(sqlUpdateOrdenVenta, [
      pago_de_delivery,
      fecha_de_registro,
      Info_cliente_idCliente,
      Usuarios_idUsuarios,
      id,
    ]);

    res.json({
      message: `Orden de venta con ID ${id} actualizada correctamente`,
    });
  } catch (error) {
    console.error("Error al actualizar la orden de venta:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const eliminarOrdenVenta = async (req, res) => {
  try {
    const { id } = req.params;

    // Eliminar la orden de venta de la base de datos
    const sqlDeleteOrdenVenta = "DELETE FROM Orden_venta WHERE idVentas = ?";
    await pool.query(sqlDeleteOrdenVenta, [id]);

    res.json({
      message: `Orden de venta con ID ${id} eliminada correctamente`,
    });
  } catch (error) {
    console.error("Error al eliminar la orden de venta:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
