import { Router } from "express";
import {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  agregarUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from "../controllers/usuariosController.js";

const router = Router();

router.get("/usuarios", obtenerUsuarios);
router.get("/usuarios/:id", obtenerUsuarioPorId);
router.post("/usuarios", agregarUsuario);
router.put("/usuarios/:id", actualizarUsuario);
router.delete("/usuarios/:id", eliminarUsuario);

export default router;
