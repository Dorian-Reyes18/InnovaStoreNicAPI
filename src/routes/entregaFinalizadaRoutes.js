import express from "express";
import {
    obtenerEntregasFinalizadas,
    obtenerEntregaFinalizadaPorId,
    crearEntregaFinalizada,
    actualizarEntregaFinalizada,
    eliminarEntregaFinalizada
} from "../controllers/entregaFinalizadaController.js";

const router = express.Router();

router.get("/entrega-finalizada", obtenerEntregasFinalizadas);
router.get("/entrega-finalizada/:id", obtenerEntregaFinalizadaPorId);
router.post("/entrega-finalizada", crearEntregaFinalizada);
router.put("/entrega-finalizada/:id", actualizarEntregaFinalizada);
router.delete("/entrega-finalizada/:id", eliminarEntregaFinalizada);

export default router;
