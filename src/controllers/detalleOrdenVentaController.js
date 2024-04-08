import { pool } from "../db.js";

// Controlador para obtener todos los detalles de una orden de venta
export const obtenerDetallesOrdenVenta = async (req, res) => {
    const idOrdenVenta = req.params.idOrdenVenta;

    // Verificar si la orden de venta existe
    const ordenVenta = await pool.query(
        "SELECT * FROM Orden_venta WHERE idVentas = ?",
        [idOrdenVenta]
    );

    if (ordenVenta.length === 0) {
        return res.status(404).json({
            message: "La orden de venta no existe",
        });
    }

    try {
        let detalles;
        if (req.params.idProducto) {
            // Si se proporciona también el id del producto
            detalles = await pool.query(
                "SELECT Productos_idProductos, Orden_venta_idVentas, Cantidad FROM `Detalle-orden-venta` WHERE Orden_venta_idVentas = ? AND Productos_idProductos = ?",
                [idOrdenVenta, req.params.idProducto]
            );
        } else {
            // Si solo se proporciona el id de la orden de venta
            detalles = await pool.query(
                "SELECT Productos_idProductos, Orden_venta_idVentas, Cantidad FROM `Detalle-orden-venta` WHERE Orden_venta_idVentas = ?",
                [idOrdenVenta]
            );
        }
        res.json(detalles);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener los detalles de la orden de venta",
            error: error.message,
        });
    }
};



// Controlador para obtener un detalle específico de una orden de venta
export const obtenerDetalleOrdenVenta = async (req, res) => {
    const idOrdenVenta = req.params.idOrdenVenta;
    const idProducto = req.params.idProducto;
    try {
        const detalle = await pool.query(
            "SELECT * FROM `Detalle-orden-venta` WHERE Orden_venta_idVentas = ? AND Productos_idProductos = ?",
            [idOrdenVenta, idProducto]
        );
        if (detalle.length > 0) {
            res.json(detalle[0]);
        } else {
            res.status(404).json({ message: "Detalle de orden de venta no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener el detalle de la orden de venta:", error);
        res.status(500).json({
            message: "Error interno del servidor al obtener el detalle de la orden de venta",
            error: error.message,
        });
    }
};

// Controlador para agregar un nuevo detalle a una orden de venta
export const agregarDetalleOrdenVenta = async (req, res) => {
    const idOrdenVenta = req.params.idOrdenVenta;
    const { idProducto, cantidad } = req.body;

    try {
        // Verificar si la orden de venta existe
        const [ordenVenta] = await pool.query(
            "SELECT * FROM Orden_venta WHERE idVentas = ?",
            [idOrdenVenta]
        );

        if (!ordenVenta) {
            return res.status(404).json({ message: "La orden de venta no existe" });
        }

        // Verificar si el producto existe
        const [producto] = await pool.query(
            "SELECT * FROM Productos WHERE idProductos = ?",
            [idProducto]
        );

        if (!producto) {
            return res.status(404).json({ message: "El producto no existe" });
        }

        // Si la orden de venta y el producto existen, intentar agregar el detalle de orden de venta
        await pool.query(
            "INSERT INTO `Detalle-orden-venta` (Productos_idProductos, Orden_venta_idVentas, Cantidad) VALUES (?, ?, ?)",
            [idProducto, idOrdenVenta, cantidad]
        );

        res.status(201).json({ message: "Detalle de orden de venta agregado correctamente" });
    } catch (error) {
        // Si ocurre un error, devolver un mensaje genérico de error interno del servidor
        console.error("Error al agregar el detalle de la orden de venta:", error);
        res.status(500).json({ message: "Error interno del servidor al agregar el detalle de la orden de venta" });
    }
};



// Controlador para actualizar un detalle específico de una orden de venta
export const actualizarDetalleOrdenVenta = async (req, res) => {
    const idOrdenVenta = req.params.idOrdenVenta;
    const idProducto = req.params.idProducto;
    const { cantidad } = req.body;

    // Verificar si la orden de venta existe
    const ordenVenta = await pool.query(
        "SELECT * FROM Orden_venta WHERE idVentas = ?",
        [idOrdenVenta]
    );

    if (ordenVenta.length === 0) {
        return res.status(404).json({
            message: "La orden de venta no existe",
        });
    }

    try {
        await pool.query(
            "UPDATE `Detalle-orden-venta` SET Cantidad = ? WHERE Orden_venta_idVentas = ? AND Productos_idProductos = ?",
            [cantidad, idOrdenVenta, idProducto]
        );
        res.json({
            message: "Detalle de orden de venta actualizado correctamente",
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el detalle de la orden de venta",
            error: error.message,
        });
    }
};



// Controlador para eliminar un detalle específico de una orden de venta
export const eliminarDetalleOrdenVenta = async (req, res) => {
    const idOrdenVenta = req.params.idOrdenVenta;
    const idProducto = req.params.idProducto;

    // Verificar si la orden de venta existe
    const ordenVenta = await pool.query(
        "SELECT * FROM Orden_venta WHERE idVentas = ?",
        [idOrdenVenta]
    );

    if (ordenVenta.length === 0) {
        return res.status(404).json({
            message: "La orden de venta no existe",
        });
    }

    try {
        await pool.query(
            "DELETE FROM `Detalle-orden-venta` WHERE Orden_venta_idVentas = ? AND Productos_idProductos = ?",
            [idOrdenVenta, idProducto]
        );
        res.json({ message: "Detalle de orden de venta eliminado correctamente" });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el detalle de la orden de venta",
            error: error.message,
        });
    }
};

