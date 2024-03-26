import { pool } from "../db.js";

export const obtenerRoles = async (req, res) => {
  try {
    const sql = "SELECT idRoles, Rol FROM Roles";
    const [rows, fields] = await pool.query(sql);
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener los roles:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const obtenerRolPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = "SELECT * FROM Roles WHERE idRoles = ?";
    const [rows, fields] = await pool.query(sql, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener el rol:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const agregarRol = async (req, res) => {
  try {
    const { Rol } = req.body;
    const sql = "INSERT INTO Roles (Rol) VALUES (?)";
    const result = await pool.query(sql, [Rol]);
    res.json({
      message: "Rol agregado correctamente",
      idRol: result.insertId,
    });
  } catch (error) {
    console.error("Error al agregar un nuevo rol: ", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const actualizarRol = async (req, res) => {
  try {
    const { id } = req.params;
    const { Rol } = req.body;
    const sql = "UPDATE Roles SET Rol = ? WHERE idRoles = ?";
    await pool.query(sql, [Rol, id]);
    res.json({ message: `Rol con ID ${id} actualizado correctamente` });
  } catch (error) {
    console.error("Error al actualizar el rol: ", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const eliminarRol = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = "DELETE FROM Roles WHERE idRoles = ?";
    await pool.query(sql, [id]);
    res.json({ message: `Rol con ID ${id} eliminado correctamente` });
  } catch (error) {
    console.error("Error al eliminar el rol: ", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
