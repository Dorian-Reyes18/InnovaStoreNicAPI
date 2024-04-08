import { Router } from "express";
import {
  obtenerOrdenesVenta,
  obtenerOrdenVentaPorId,
  crearOrdenVenta,
  actualizarOrdenVenta,
  eliminarOrdenVenta,
} from "../controllers/ordenVentaController.js";

const router = Router();

router.get("/ordenes-venta", obtenerOrdenesVenta);
router.get("/ordenes-venta/:id", obtenerOrdenVentaPorId);
router.post("/ordenes-venta", crearOrdenVenta);
router.put("/ordenes-venta/:id", actualizarOrdenVenta);
router.delete("/ordenes-venta/:id", eliminarOrdenVenta);

export default router;
