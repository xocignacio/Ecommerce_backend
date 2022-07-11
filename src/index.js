import express from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import { MemoryContainer, FilesystemContainer } from "./api/index.js";
import { DATE_UTILS } from "./utils/index.js";
import { config } from "./config/index.js";

/* import { productRouter } from "./routers/productRouter.js";
import { CarritoRouter } from "./routers/carritoRouter.js"; */
import { productsRouter, cartsRouter } from "./routers/index.js";

/* app.use(express.json());                           
app.use(express.urlencoded({ extended: true }));   */

 


const MessagesApi = new MemoryContainer();
const ProductsApi = new FilesystemContainer("products");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(config.server.routes.products, productsRouter);
app.use(config.server.routes.carts, cartsRouter);


/* app.use("/api/productos", productRouter );     
app.use("/api/carrito", CarritoRouter );    */

app.use(express.static("public"));

io.on("connection", async (socket) => {
  console.log(`Nuevo cliente conectado ${socket.id}`);

  socket.emit("mensajes", MessagesApi.getAll());

  socket.on("mensajeNuevo", ({ email, text }) => {
    const message = { email, text, timestamp: DATE_UTILS.getTimestamp() };
    MessagesApi.save(message);

    io.sockets.emit("mensajes", MessagesApi.getAll());
  });

  socket.emit("products", await ProductsApi.getAll());

  socket.on("add-product", async (data) => {
    const products = await ProductsApi.save(data);

    io.sockets.emit("products", products);
  });
});

const PORT = 8080;


const server = app.listen(config.server.PORT, () => {
  console.log(`Server running on port ${server.address().port}`);
});
server.on("error", (error) => {
  console.error(`Server error: ${error}`);
});


/* const server = httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT} Bienvenido`);
});
server.on("error", (error) => {
  console.error(`Error en el servidor ${error}`);
}); */