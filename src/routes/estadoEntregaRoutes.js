import express from "express";
import {
  obtenerEstadoEntrega,
  obtenerEstadoEntregaPorId,
  crearEstadoEntrega,
  actualizarEstadoEntrega,
  eliminarEstadoEntrega,
} from "../controllers/estadoEntregaController.js";

const router = express.Router();

router.get("/estadoEntrega", obtenerEstadoEntrega);
router.get("/estadoEntrega/:id", obtenerEstadoEntregaPorId);
router.post("/estadoEntrega", crearEstadoEntrega);
router.put("/estadoEntrega/:id", actualizarEstadoEntrega);
router.delete("/estadoEntrega/:id", eliminarEstadoEntrega);

export default router;
