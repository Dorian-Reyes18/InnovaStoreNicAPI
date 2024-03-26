import { pool } from "../db.js";

export const obtenerProductosDisponibles = async (req, res) => {
  try {
    const sql = "SELECT * FROM Productos WHERE cantidad > 0";
    const [rows, fields] = await pool.query(sql);
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const obtenerProductoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const sql = "SELECT * FROM Productos WHERE idProductos = ?";
    const [rows, fields] = await pool.query(sql, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const agregarProducto = async (req, res) => {
  const { nombre, descripcion, precio, cantidad } = req.body;
  try {
    const sql =
      "INSERT INTO Productos (nombre, descripcion, precio, cantidad) VALUES (?, ?, ?, ?)";
    const result = await pool.query(sql, [
      nombre,
      descripcion,
      precio,
      cantidad,
    ]);
    res.json({
      message: "Producto agregado correctamente",
      idProducto: result.insertId,
    });
  } catch (error) {
    console.error("Error al agregar un nuevo producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const editarProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, cantidad } = req.body;
  try {
    const sql =
      "UPDATE Productos SET nombre = ?, descripcion = ?, precio = ?, cantidad = ? WHERE idProductos = ?";
    await pool.query(sql, [nombre, descripcion, precio, cantidad, id]);
    res.json({ message: `Producto con ID ${id} actualizado correctamente` });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const eliminarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const sql = "DELETE FROM Productos WHERE idProductos = ?";
    await pool.query(sql, [id]);
    res.json({ message: `Producto con ID ${id} eliminado correctamente` });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
