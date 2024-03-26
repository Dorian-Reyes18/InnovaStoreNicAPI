import { Router } from "express";
import {
  agregarRol,
  obtenerRoles,
  obtenerRolPorId,
  actualizarRol,
  eliminarRol,
} from "../controllers/rolesController.js";

const router = Router();

router.get("/roles", obtenerRoles);
router.get("/roles/:id", obtenerRolPorId);
router.post("/roles", agregarRol);
router.put("/roles/:id", actualizarRol);
router.delete("/roles/:id", eliminarRol);

export default router;
