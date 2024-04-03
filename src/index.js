import express from "express";
import rolesRoutes from "./routes/rolesRoutes.js";
import productosRoutes from "./routes/productosRoutes.js";
import infoClientesRoutes from "./routes/infoClientesRoutes.js";
import usuariosRoutes from "./routes/usuariosRoutes.js";
import login from "./routes/loginRoutes.js";
import estadoEntrega from "./routes/estadoEntregaRoutes.js";
import pagoPorVenta from "./routes/pagoPorVentaRoutes.js";

const app = express();

app.use(express.json());
app.use("/api", rolesRoutes);
app.use("/api", productosRoutes);
app.use("/api", infoClientesRoutes);
app.use("/api", usuariosRoutes);
app.use("/api", login);
app.use("/api", estadoEntrega);
app.use("/api", pagoPorVenta);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
