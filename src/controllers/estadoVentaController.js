import { pool } from "../db.js";

export const getAllEstadosVentas = async (req, res) => {
  try {
    const sql = "SELECT * FROM Estado_venta";
    const [rows, fields] = await pool.query(sql);
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener los estados de ventas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getEstadoVentaById = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = "SELECT * FROM Estado_venta WHERE idEstado_venta = ?";
    const [rows, fields] = await pool.query(sql, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Estado de venta no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener el estado de venta:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createEstadoVenta = async (req, res) => {
  try {
    const { estado, fecha } = req.body;

    const sql = "INSERT INTO Estado_venta (estado, fecha) VALUES (?, ?)";
    const result = await pool.query(sql, [estado, fecha]);

    res.json({
      message: "Estado de venta creado correctamente",
      idEstadoVenta: result.insertId,
    });
  } catch (error) {
    console.error("Error al crear un nuevo estado de venta:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const updateEstadoVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, fecha } = req.body;

    const sql =
      "UPDATE Estado_venta SET estado = ?, fecha = ? WHERE idEstado_venta = ?";
    await pool.query(sql, [estado, fecha, id]);

    res.json({
      message: `Estado de venta con ID ${id} actualizado correctamente`,
    });
  } catch (error) {
    console.error("Error al actualizar el estado de venta:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteEstadoVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = "DELETE FROM Estado_venta WHERE idEstado_venta = ?";
    await pool.query(sql, [id]);
    res.json({
      message: `Estado de venta con ID ${id} eliminado correctamente`,
    });
  } catch (error) {
    console.error("Error al eliminar el estado de venta:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
