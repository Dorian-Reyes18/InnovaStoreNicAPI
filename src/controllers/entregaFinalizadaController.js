import { pool } from "../db.js";

export const obtenerEntregasFinalizadas = async (req, res) => {
    try {
        const sql = "SELECT * FROM entrega_finalizada";
        const [rows, fields] = await pool.query(sql);
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener las entregas finalizadas:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const obtenerEntregaFinalizadaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = "SELECT * FROM entrega_finalizada WHERE id = ?";
        const [rows, fields] = await pool.query(sql, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Entrega finalizada no encontrada" });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error("Error al obtener la entrega finalizada:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const crearEntregaFinalizada = async (req, res) => {
    const { id, fecha_finalizada, Entrega_idEntrega } = req.body;

    try {
        await pool.query(
            "INSERT INTO entrega_finalizada (id, fecha_finalizada, Entrega_idEntrega) VALUES (?, ?, ?)",
            [id, fecha_finalizada, Entrega_idEntrega]
        );
        res.status(201).json({ message: "Entrega finalizada creada correctamente" });
    } catch (error) {
        console.error("Error al crear la entrega finalizada:", error);
        res.status(500).json({
            message: "Error interno del servidor al crear la entrega finalizada",
        });
    }
};

export const actualizarEntregaFinalizada = async (req, res) => {
    const idEntregaFinalizada = req.params.id;
    const { fecha_finalizada, Entrega_idEntrega } = req.body;

    try {
        await pool.query(
            "UPDATE entrega_finalizada SET fecha_finalizada = ?, Entrega_idEntrega = ? WHERE id = ?",
            [fecha_finalizada, Entrega_idEntrega, idEntregaFinalizada]
        );
        res.json({ message: "Entrega finalizada actualizada correctamente" });
    } catch (error) {
        console.error("Error al actualizar la entrega finalizada:", error);
        res.status(500).json({
            message: "Error interno del servidor al actualizar la entrega finalizada",
        });
    }
};

export const eliminarEntregaFinalizada = async (req, res) => {
    const idEntregaFinalizada = req.params.id;
    try {
        await pool.query(
            "DELETE FROM entrega_finalizada WHERE id = ?",
            [idEntregaFinalizada]
        );
        res.json({ message: "Entrega finalizada eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar la entrega finalizada:", error);
        res.status(500).json({
            message: "Error interno del servidor al eliminar la entrega finalizada",
        });
    }
};
