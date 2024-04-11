import { pool } from "../db.js";
import bcrypt from "bcrypt";

const saltRounds = 12; // Aumentamos el número de rondas para mayor seguridad
const REQUIRED_FIELDS = ["celular", "contraseña"]; // Campos requeridos para agregar o actualizar usuarios
const ERROR_MESSAGES = {
  missingFields: "Faltan datos obligatorios",
  userNotFound: "Usuario no encontrado",
  internalServerError: "Error interno del servidor",
};

export const obtenerUsuarios = async (req, res) => {
  try {
    const sql = "SELECT * FROM Usuarios";
    const [rows, fields] = await pool.query(sql);
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    res.status(500).json({ error: ERROR_MESSAGES.internalServerError });
  }
};

export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = "SELECT * FROM Usuarios WHERE idUsuarios = ?";
    const [rows, fields] = await pool.query(sql, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: ERROR_MESSAGES.userNotFound });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).json({ error: ERROR_MESSAGES.internalServerError });
  }
};

export const agregarUsuario = async (req, res) => {
  try {
    const userData = req.body;

    // Verificar que los datos requeridos estén presentes
    const missingFields = REQUIRED_FIELDS.filter(
      (field) => !userData.hasOwnProperty(field)
    );
    if (missingFields.length > 0) {
      return res.status(400).json({ message: ERROR_MESSAGES.missingFields });
    }

    // Encriptar la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(userData.contraseña, saltRounds);

    const sql =
      "INSERT INTO Usuarios (celular, nombre, Apellido, contraseña, domicilio, fecha_nacimiento, Roles_idRoles) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const result = await pool.query(sql, [
      userData.celular,
      userData.nombre || null,
      userData.Apellido || null,
      hashedPassword, // Guardamos el hash en lugar de la contraseña en texto plano
      userData.domicilio || null,
      userData.fecha_nacimiento || null,
      userData.Roles_idRoles || null,
    ]);

    res.json({
      message: "Usuario agregado correctamente",
      idUsuario: result.insertId,
    });
  } catch (error) {
    console.error("Error al agregar un nuevo usuario:", error);
    res.status(500).json({ error: ERROR_MESSAGES.internalServerError });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;

    // Verificar que los datos requeridos estén presentes
    const missingFields = REQUIRED_FIELDS.filter(
      (field) => !userData.hasOwnProperty(field)
    );
    if (missingFields.length > 0) {
      return res.status(400).json({ message: ERROR_MESSAGES.missingFields });
    }

    // Encriptar la nueva contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(userData.contraseña, saltRounds);

    const sql =
      "UPDATE Usuarios SET celular = ?, nombre = ?, Apellido = ?, contraseña = ?, domicilio = ?, fecha_nacimiento = ?, Roles_idRoles = ? WHERE idUsuarios = ?";
    await pool.query(sql, [
      userData.celular,
      userData.nombre || null,
      userData.Apellido || null,
      hashedPassword, // Guardamos el hash en lugar de la contraseña en texto plano
      userData.domicilio || null,
      userData.fecha_nacimiento || null,
      userData.Roles_idRoles || null,
      id,
    ]);

    res.json({ message: `Usuario con ID ${id} actualizado correctamente` });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).json({ error: ERROR_MESSAGES.internalServerError });
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
    res.status(500).json({ error: ERROR_MESSAGES.internalServerError });
  }
};
