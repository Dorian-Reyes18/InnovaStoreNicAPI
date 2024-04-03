import { Router } from "express";
import {
  getAllEstadosVentas,
  getEstadoVentaById,
  createEstadoVenta,
  updateEstadoVenta,
  deleteEstadoVenta,
} from "../controllers/estadoVentaController.js";

const router = Router();

router.get("/estadosventas", getAllEstadosVentas);
router.get("/estadosventas/:id", getEstadoVentaById);
router.post("/estadosventas", createEstadoVenta);
router.put("/estadosventas/:id", updateEstadoVenta);
router.delete("/estadosventas/:id", deleteEstadoVenta);

export default router;
