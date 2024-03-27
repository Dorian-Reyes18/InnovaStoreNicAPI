import express from "express";
import rolesRoutes from "./routes/rolesRoutes.js";
import productosRoutes from "./routes/productosRoutes.js";
import infoClientesRoutes from "./routes/infoClientesRoutes.js";
import usuariosRoutes from "./routes/usuariosRoutes.js";

const app = express();

app.use(express.json());
app.use("/api", rolesRoutes);
app.use("/api", productosRoutes);
app.use("/api", infoClientesRoutes);
app.use("/api", usuariosRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
