import { pool } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;
const secretKey = "clave_secreta";

export const login = async (req, res) => {
  const { celular, contraseña } = req.body;

  try {
    // Verificar si el usuario existe en la base de datos
    const [user] = await pool.query(
      "SELECT * FROM Usuarios WHERE celular = ?",
      [celular]
    );

    if (!user || !user[0] || !user[0].contraseña) {
      return res.status(401).json({ error: "El usuario no existe" });
    }

    // Verificar la contraseña
    const contraseñaValida = await bcrypt.compare(
      contraseña,
      user[0].contraseña
    );

    if (!contraseñaValida) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user[0].idUsuarios }, secretKey, {
      expiresIn: "1h",
      algorithm: "HS256", // Agregamos el algoritmo de firma
    });

    res.json({ token });
  } catch (error) {
    console.error("Error en el proceso de login:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
