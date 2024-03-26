import { pool } from "../db.js";

export const obtenerClientes = async (req, res) => {
  try {
    const sql = "SELECT * FROM Info_cliente";
    const [rows, fields] = await pool.query(sql);
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener los clientes:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const obtenerClientePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = "SELECT * FROM Info_cliente WHERE idCliente = ?";
    const [rows, fields] = await pool.query(sql, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const agregarCliente = async (req, res) => {
  try {
    const { nombre, celular, domicilio, gps } = req.body;

    // Validar que los datos necesarios estén presentes
    if (!nombre || !celular || !domicilio) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    // Crear la consulta SQL para agregar el cliente
    const sql =
      "INSERT INTO Info_cliente (Nombre_completo, celular, domicilio, gps) VALUES (?, ?, ?, ?)";
    const result = await pool.query(sql, [nombre, celular, domicilio, gps]);

    res.json({
      message: "Cliente agregado correctamente",
      idCliente: result.insertId,
    });
  } catch (error) {
    console.error("Error al agregar un nuevo cliente:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const actualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, celular, domicilio, gps } = req.body;

    if (!nombre || !celular || !domicilio) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const sql =
      "UPDATE Info_cliente SET Nombre_completo = ?, celular = ?, domicilio = ?, gps = ? WHERE idCliente = ?";
    await pool.query(sql, [nombre, celular, domicilio, gps, id]);

    res.json({ message: `Cliente con ID ${id} actualizado correctamente` });
  } catch (error) {
    console.error("Error al actualizar el cliente:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const eliminarCliente = async (req, res) => {
  try {
    const { id } = req.params;

    const sql = "DELETE FROM Info_cliente WHERE idCliente = ?";
    await pool.query(sql, [id]);

    res.json({ message: `Cliente con ID ${id} eliminado correctamente` });
  } catch (error) {
    console.error("Error al eliminar el cliente:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
