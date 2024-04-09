import express from "express";
import {
    obtenerEntregas,
    obtenerEntregaPorId,
    crearEntrega,
    actualizarEntrega,
    eliminarEntrega,
} from "../controllers/entregaController.js";

const router = express.Router();

router.get("/entrega", obtenerEntregas);
router.get("/entrega/:id", obtenerEntregaPorId);
router.post("/entrega", crearEntrega);
router.put("/entrega/:id", actualizarEntrega);
router.delete("/entrega/:id", eliminarEntrega);

export default router;
