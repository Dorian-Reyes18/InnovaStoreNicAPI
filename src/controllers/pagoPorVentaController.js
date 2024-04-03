// controllers/pagosController.js

import { pool } from "../db.js";

export const createPago = async (req, res) => {
  try {
    const { fecha_de_pago, monto, Orden_venta_idVentas } = req.body;
    const sql =
      "INSERT INTO Pago_por_ventas (fecha_de_pago, monto, Orden_venta_idVentas) VALUES (?, ?, ?)";
    const result = await pool.query(sql, [
      fecha_de_pago,
      monto,
      Orden_venta_idVentas,
    ]);
    res.json({
      mensaje: "Pago creado exitosamente",
      idPago_por_ventas: result.insertId,
    });
  } catch (error) {
    console.error("Error al crear el pago:", error);
    res.status(500).json({ mensaje: "Hubo un error al crear el pago" });
  }
};

export const getAllPagos = async (req, res) => {
  try {
    const sql = "SELECT * FROM Pago_por_ventas";
    const [rows, fields] = await pool.query(sql);
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener los pagos:", error);
    res.status(500).json({ mensaje: "Hubo un error al obtener los pagos" });
  }
};

export const getPagoById = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = "SELECT * FROM Pago_por_ventas WHERE idPago_por_ventas = ?";
    const [rows, fields] = await pool.query(sql, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ mensaje: "Pago no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener el pago:", error);
    res.status(500).json({ mensaje: "Hubo un error al obtener el pago" });
  }
};

export const updatePago = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha_de_pago, monto, Orden_venta_idVentas } = req.body;
    const sql =
      "UPDATE Pago_por_ventas SET fecha_de_pago = ?, monto = ?, Orden_venta_idVentas = ? WHERE idPago_por_ventas = ?";
    await pool.query(sql, [fecha_de_pago, monto, Orden_venta_idVentas, id]);
    res.json({ mensaje: `Pago con ID ${id} actualizado correctamente` });
  } catch (error) {
    console.error("Error al actualizar el pago:", error);
    res.status(500).json({ mensaje: "Hubo un error al actualizar el pago" });
  }
};

export const deletePago = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = "DELETE FROM Pago_por_ventas WHERE idPago_por_ventas = ?";
    await pool.query(sql, [id]);
    res.json({ mensaje: `Pago con ID ${id} eliminado correctamente` });
  } catch (error) {
    console.error("Error al eliminar el pago:", error);
    res.status(500).json({ mensaje: "Hubo un error al eliminar el pago" });
  }
};
