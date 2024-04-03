import { Router } from "express";
import {
  createPago,
  getAllPagos,
  getPagoById,
  updatePago,
  deletePago,
} from "../controllers/pagoPorVentaController.js";

const router = Router();

router.post("/pagos", createPago);
router.get("/pagos", getAllPagos);
router.get("/pagos/:id", getPagoById);
router.put("/pagos/:id", updatePago);
router.delete("/pagos/:id", deletePago);

export default router;
