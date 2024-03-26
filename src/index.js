import express from "express";
import rolesRoutes from "./routes/rolesRoutes.js";
import productosRoutes from "./routes/productosRoutes.js";

const app = express();

app.use(express.json());
app.use("/api", rolesRoutes);
app.use("/api", productosRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
