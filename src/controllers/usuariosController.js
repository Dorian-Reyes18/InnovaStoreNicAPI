import { pool } from "../db.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const obtenerUsuarios = async (req, res) => {
  try {
    const sql = "SELECT * FROM Usuarios";
    const [rows, fields] = await pool.query(sql);
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = "SELECT * FROM Usuarios WHERE idUsuarios = ?";
    const [rows, fields] = await pool.query(sql, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const agregarUsuario = async (req, res) => {
  try {
    const {
      celular,
      nombre,
      Apellido,
      contraseña,
      domicilio,
      fecha_nacimiento,
      Roles_idRoles,
    } = req.body;

    // Verificar que los datos requeridos estén presentes
    if (!celular || !contraseña) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    // Encriptar la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

    const sql =
      "INSERT INTO Usuarios (celular, nombre, Apellido, contraseña, domicilio, fecha_nacimiento, Roles_idRoles) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const result = await pool.query(sql, [
      celular,
      nombre,
      Apellido,
      hashedPassword,
      domicilio,
      fecha_nacimiento,
      Roles_idRoles,
    ]);

    res.json({
      message: "Usuario agregado correctamente",
      idUsuario: result.insertId,
    });
  } catch (error) {
    console.error("Error al agregar un nuevo usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      celular,
      nombre,
      Apellido,
      contraseña,
      domicilio,
      fecha_nacimiento,
      Roles_idRoles,
    } = req.body;

    // Verificar que los datos requeridos estén presentes
    if (!celular || !contraseña) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    // Encriptar la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

    const sql =
      "UPDATE Usuarios SET celular = ?, nombre = ?, Apellido = ?, contraseña = ?, domicilio = ?, fecha_nacimiento = ?, Roles_idRoles = ? WHERE idUsuarios = ?";
    await pool.query(sql, [
      celular,
      nombre,
      Apellido,
      hashedPassword,
      domicilio,
      fecha_nacimiento,
      Roles_idRoles,
      id,
    ]);

    res.json({ message: `Usuario con ID ${id} actualizado correctamente` });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = "DELETE FROM Usuarios WHERE idUsuarios = ?";
    await pool.query(sql, [id]);
    res.json({ message: `Usuario con ID ${id} eliminado correctamente` });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
