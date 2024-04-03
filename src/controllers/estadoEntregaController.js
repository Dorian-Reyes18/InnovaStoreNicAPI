import { pool } from "../db.js";

export const obtenerEstadoEntrega = async (req, res) => {
  try {
    const sql = "SELECT * FROM Estado_entrega";
    const [rows, fields] = await pool.query(sql);
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener los estados de entrega:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const obtenerEstadoEntregaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = "SELECT * FROM Estado_entrega WHERE idEstado_entrega = ?";
    const [rows, fields] = await pool.query(sql, [id]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Estado de entrega no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener el estado de entrega:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const crearEstadoEntrega = async (req, res) => {
  try {
    const { estado } = req.body;

    if (!estado) {
      return res
        .status(400)
        .json({ message: "Falta el estado en la solicitud" });
    }

    const fechaCambio = new Date().toISOString().slice(0, 19).replace("T", " ");

    const sql =
      "INSERT INTO Estado_entrega (estado, fecha_cambio) VALUES (?, ?)";
    const result = await pool.query(sql, [estado, fechaCambio]);

    res.json({
      message: "Estado de entrega creado correctamente",
      idEstadoEntrega: result.insertId,
    });
  } catch (error) {
    console.error("Error al agregar un nuevo estado de entrega:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const actualizarEstadoEntrega = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    if (!estado) {
      return res
        .status(400)
        .json({ message: "Falta el estado en la solicitud" });
    }

    const fechaCambio = new Date().toISOString().slice(0, 19).replace("T", " ");

    const sql =
      "UPDATE Estado_entrega SET estado = ?, fecha_cambio = ? WHERE idEstado_entrega = ?";
    await pool.query(sql, [estado, fechaCambio, id]);

    res.json({
      message: `Estado de entrega con ID ${id} actualizado correctamente`,
    });
  } catch (error) {
    console.error("Error al actualizar el estado de entrega:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const eliminarEstadoEntrega = async (req, res) => {
  try {
    const { id } = req.params;

    const sql = "DELETE FROM Estado_entrega WHERE idEstado_entrega = ?";
    await pool.query(sql, [id]);

    res.json({
      message: `Estado de entrega con ID ${id} eliminado correctamente`,
    });
  } catch (error) {
    console.error("Error al eliminar el estado de entrega:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
