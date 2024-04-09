import { pool } from "../db.js";

// Obtener todos los pagos
export const obtenerPagos = async (req, res) => {
  try {
    const sql = "SELECT * FROM Pago_por_ventas";
    const [rows, fields] = await pool.query(sql);
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener los pagos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Obtener un pago por su ID
export const obtenerPagoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const sql = "SELECT * FROM Pago_por_ventas WHERE idPago_por_ventas = ?";
    const [rows, fields] = await pool.query(sql, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "El pago no existe" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener el pago:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const crearPago = async (req, res) => {
  const { fecha_de_pago, monto, Orden_venta_idVentas } = req.body;

  // Verificar si la orden de venta existe
  const ordenVenta = await pool.query(
    "SELECT * FROM Orden_venta WHERE idVentas = ?",
    [Orden_venta_idVentas]
  );

  if (ordenVenta.length === 0) {
    return res.status(404).json({
      message: "La orden de venta especificada no existe",
    });
  }

  try {
    const sql =
      "INSERT INTO Pago_por_ventas (fecha_de_pago, monto, Orden_venta_idVentas) VALUES (?, ?, ?)";
    await pool.query(sql, [fecha_de_pago, monto, Orden_venta_idVentas]);
    res.json({
      message: "Pago agregado correctamente",
    });
  } catch (error) {
    console.error("Error al agregar un nuevo pago:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const actualizarPago = async (req, res) => {
  const { id } = req.params;
  const { fecha_de_pago, monto, Orden_venta_idVentas } = req.body;

  console.log("ID del pago a actualizar:", id);
  console.log("Datos recibidos en el cuerpo de la solicitud:", req.body);

  try {
    // Verificar si el pago existe antes de intentar actualizarlo
    const pagoExistente = await pool.query(
      "SELECT * FROM Pago_por_ventas WHERE idPago_por_ventas = ?",
      [id]
    );

    console.log("Resultado de la consulta de pago existente:", pagoExistente);

    // Si el pago no existe, devolver un mensaje de error
    if (pagoExistente.length === 0) {
      return res.status(404).json({
        error: "El pago especificado no existe",
      });
    }

    const sql =
      "UPDATE Pago_por_ventas SET fecha_de_pago = ?, monto = ?, Orden_venta_idVentas = ? WHERE idPago_por_ventas = ?";
    const [result] = await pool.query(sql, [
      fecha_de_pago,
      monto,
      Orden_venta_idVentas,
      id,
    ]);

    console.log("Resultado de la consulta de actualización:", result);

    // Verificar si se realizó alguna actualización en la base de datos
    if (result.affectedRows === 0) {
      console.error("No se pudo actualizar el pago: No se realizaron cambios en la base de datos");
      return res.status(404).json({
        error: "Orden de venta no encontrada",
      });
    }

    res.json({
      message: `Pago con ID ${id} actualizado correctamente`,
    });
  } catch (error) {
    console.error("Error al actualizar el pago:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};




// Eliminar un pago
export const eliminarPago = async (req, res) => {
  const { id } = req.params;
  try {
    const sql = "DELETE FROM Pago_por_ventas WHERE idPago_por_ventas = ?";
    await pool.query(sql, [id]);
    res.json({ message: `Pago con ID ${id} eliminado correctamente` });
  } catch (error) {
    console.error("Error al eliminar el pago:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
