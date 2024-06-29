import express from "express";
import cors from "cors";
import rolesRoutes from "./routes/rolesRoutes.js";
import productosRoutes from "./routes/productosRoutes.js";
import infoClientesRoutes from "./routes/infoClientesRoutes.js";
import usuariosRoutes from "./routes/usuariosRoutes.js";
import login from "./routes/loginRoutes.js";
import estadoEntrega from "./routes/estadoEntregaRoutes.js";
import pagoPorVenta from "./routes/pagoPorVentaRoutes.js";
import ordenesVenta from "./routes/ordenVentaRoute.js";
import detalleOrdenVenta from "./routes/detalleOrdenVentaRoutes.js";
import entrega from "./routes/entregaRoutes.js";
import entregaFinalizada from "./routes/entregaFinalizadaRoutes.js";
import { requestLogger } from "./requestLogger.js";

const app = express();

app.use(cors()); // Permite CORS desde cualquier origen

app.use(express.json());

app.use(requestLogger);

app.use("/api", rolesRoutes);
app.use("/api", productosRoutes);
app.use("/api", infoClientesRoutes);
app.use("/api", usuariosRoutes);
app.use("/api", login);
app.use("/api", estadoEntrega);
app.use("/api", pagoPorVenta);
app.use("/api", ordenesVenta);
app.use("/api", detalleOrdenVenta);
app.use("/api", entrega);
app.use("/api", entregaFinalizada);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint no encontrado",
  });
});

export default app;
