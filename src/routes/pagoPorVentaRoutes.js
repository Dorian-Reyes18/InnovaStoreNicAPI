import express from "express";
import {
  obtenerPagos,
  obtenerPagoPorId,
  crearPago,
  actualizarPago,
  eliminarPago,
} from "../controllers/pagoPorVentaController.js";

const router = express.Router();

router.get("/pago", obtenerPagos);
router.get("/pago/:id", obtenerPagoPorId);
router.post("/pago", crearPago);
router.put("/pago/:id", actualizarPago);
router.delete("/pago/:id", eliminarPago);

export default router;
