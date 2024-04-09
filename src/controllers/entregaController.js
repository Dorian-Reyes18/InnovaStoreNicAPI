import { pool } from "../db.js";

// Obtener todas las entregas
export const obtenerEntregas = async (req, res) => {
    try {
        const sql = "SELECT * FROM Entrega";
        const [rows, fields] = await pool.query(sql);
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener las entregas:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Obtener una entrega por su ID
export const obtenerEntregaPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const sql = "SELECT * FROM Entrega WHERE idEntrega = ?";
        const [rows, fields] = await pool.query(sql, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "La entrega no existe" });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error("Error al obtener la entrega:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Crear una nueva entrega
export const crearEntrega = async (req, res) => {
    const { Usuarios_idUsuarios, fecha_cambio_estado, fecha_de_carga, Orden_venta_idVentas, Estado_entrega_idEstado_entrega } = req.body;

    // Verificar si el usuario existe
    const usuarioExistente = await pool.query(
        "SELECT * FROM Usuarios WHERE idUsuarios = ?",
        [Usuarios_idUsuarios]
    );

    if (usuarioExistente.length === 0) {
        return res.status(404).json({
            message: "El usuario especificado no existe",
        });
    }

    // Verificar si la orden de venta existe
    const ordenVentaExistente = await pool.query(
        "SELECT * FROM Orden_venta WHERE idVentas = ?",
        [Orden_venta_idVentas]
    );

    if (ordenVentaExistente.length === 0) {
        return res.status(404).json({
            message: "La orden de venta especificada no existe",
        });
    }

    // Verificar si el estado de entrega existe
    const estadoEntregaExistente = await pool.query(
        "SELECT * FROM Estado_entrega WHERE idEstado_entrega = ?",
        [Estado_entrega_idEstado_entrega]
    );

    if (estadoEntregaExistente.length === 0) {
        return res.status(404).json({
            message: "El estado de entrega especificado no existe",
        });
    }

    try {
        const sql =
            "INSERT INTO Entrega (Usuarios_idUsuarios, fecha_cambio_estado, fecha_de_carga, Orden_venta_idVentas, Estado_entrega_idEstado_entrega) VALUES (?, ?, ?, ?, ?)";
        await pool.query(sql, [Usuarios_idUsuarios, fecha_cambio_estado, fecha_de_carga, Orden_venta_idVentas, Estado_entrega_idEstado_entrega]);
        res.json({
            message: "Entrega agregada correctamente",
        });
    } catch (error) {
        console.error("Error al agregar una nueva entrega:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Actualizar una entrega
export const actualizarEntrega = async (req, res) => {
    const { id } = req.params;
    const { Usuarios_idUsuarios, fecha_cambio_estado, fecha_de_carga, Orden_venta_idVentas, Estado_entrega_idEstado_entrega } = req.body;

    try {
        // Verificar si la entrega existe antes de intentar actualizarla
        const entregaExistente = await pool.query(
            "SELECT * FROM Entrega WHERE idEntrega = ?",
            [id]
        );

        // Si la entrega no existe, devolver un mensaje de error
        if (entregaExistente.length === 0) {
            return res.status(404).json({
                error: "La entrega especificada no existe",
            });
        }

        // Verificar si el usuario existe
        const usuarioExistente = await pool.query(
            "SELECT * FROM Usuarios WHERE idUsuarios = ?",
            [Usuarios_idUsuarios]
        );

        if (usuarioExistente.length === 0) {
            return res.status(404).json({
                message: "El usuario especificado no existe",
            });
        }

        // Verificar si la orden de venta existe
        const ordenVentaExistente = await pool.query(
            "SELECT * FROM Orden_venta WHERE idVentas = ?",
            [Orden_venta_idVentas]
        );

        if (ordenVentaExistente.length === 0) {
            return res.status(404).json({
                message: "La orden de venta especificada no existe",
            });
        }

        // Verificar si el estado de entrega existe
        const estadoEntregaExistente = await pool.query(
            "SELECT * FROM Estado_entrega WHERE idEstado_entrega = ?",
            [Estado_entrega_idEstado_entrega]
        );

        if (estadoEntregaExistente.length === 0) {
            return res.status(404).json({
                message: "El estado de entrega especificado no existe",
            });
        }

        const sql =
            "UPDATE Entrega SET Usuarios_idUsuarios = ?, fecha_cambio_estado = ?, fecha_de_carga = ?, Orden_venta_idVentas = ?, Estado_entrega_idEstado_entrega = ? WHERE idEntrega = ?";
        const [result] = await pool.query(sql, [
            Usuarios_idUsuarios,
            fecha_cambio_estado,
            fecha_de_carga,
            Orden_venta_idVentas,
            Estado_entrega_idEstado_entrega,
            id,
        ]);

        // Verificar si se realizó alguna actualización en la base de datos
        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Error al realizar los cambios, la entrega no existe",
            });
        }

        res.json({
            message: `Entrega con ID ${id} actualizada correctamente`,
        });
    } catch (error) {
        console.error("Error al actualizar la entrega:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Eliminar una entrega
export const eliminarEntrega = async (req, res) => {
    const { id } = req.params;
    try {
        const sql = "DELETE FROM Entrega WHERE idEntrega = ?";
        await pool.query(sql, [id]);
        res.json({ message: `Entrega con ID ${id} eliminada correctamente` });
    } catch (error) {
        console.error("Error al eliminar la entrega:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
