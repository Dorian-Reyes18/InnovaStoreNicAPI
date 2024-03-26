import { Router } from "express";
import {
  agregarProducto,
  editarProducto,
  eliminarProducto,
  obtenerProductosDisponibles,
  obtenerProductoPorId,
} from "../controllers/productosController.js";

const router = Router();

router.get("/productos", obtenerProductosDisponibles);
router.get("/productos/:id", obtenerProductoPorId);
router.post("/productos", agregarProducto);
router.put("/productos/:id", editarProducto);
router.delete("/productos/:id", eliminarProducto);

export default router;
