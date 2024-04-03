import express from "express";
import {
  obtenerEstadoEntrega,
  obtenerEstadoEntregaPorId,
  crearEstadoEntrega,
  actualizarEstadoEntrega,
  eliminarEstadoEntrega,
} from "../controllers/estadoEntregaController.js";

const router = express.Router();

router.get("/estadoentrega", obtenerEstadoEntrega);
router.get("/estadoentrega/:id", obtenerEstadoEntregaPorId);
router.post("/estadoentrega", crearEstadoEntrega);
router.put("/estadoentrega/:id", actualizarEstadoEntrega);
router.delete("/estadoentrega/:id", eliminarEstadoEntrega);

export default router;
