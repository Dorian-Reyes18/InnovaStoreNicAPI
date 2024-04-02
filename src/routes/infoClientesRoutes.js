import { Router } from "express";
import {
  obtenerClientes,
  obtenerClientePorId,
  agregarCliente,
  actualizarCliente,
  eliminarCliente,
} from "../controllers/infoClientesController.js";

const router = Router();

router.get("/clientes", obtenerClientes);
router.get("/clientes/:id", obtenerClientePorId);
router.post("/clientes", agregarCliente);
router.put("/clientes/:id", actualizarCliente);
router.delete("/clientes/:id", eliminarCliente);

export default router;
