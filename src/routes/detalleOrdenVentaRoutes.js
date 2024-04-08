import { Router } from "express";
import {
    obtenerDetallesOrdenVenta,
    obtenerDetalleOrdenVenta,
    agregarDetalleOrdenVenta,
    actualizarDetalleOrdenVenta,
    eliminarDetalleOrdenVenta,
} from "../controllers/detalleOrdenVentaController.js";

const router = Router();

router.get("/detalle-orden/:idOrdenVenta", obtenerDetallesOrdenVenta);
router.get(
    "/detalle-orden/:idOrdenVenta/:idProducto",
    obtenerDetalleOrdenVenta
);
router.post("/detalle-orden/:idOrdenVenta", agregarDetalleOrdenVenta);
router.put(
    "/detalle-orden/:idOrdenVenta/:idProducto",
    actualizarDetalleOrdenVenta
);
router.delete(
    "/detalle-orden/:idOrdenVenta/:idProducto",
    eliminarDetalleOrdenVenta
);

export default router;
