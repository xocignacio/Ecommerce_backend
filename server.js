/* const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("public"));

let mensajes = [];

io.on("connection", (socket) => {
  console.log(`Nuevo cliente conectado ${socket.id}`);

  socket.emit("mensajes", mensajes);

  socket.on("mensajeNuevo", (data) => {
    mensajes.push(data);

    io.sockets.emit("mensajes", mensajes);
  });
  socket.on("borrarMensajes", (autor) => {
    mensajes = mensajes.filter((m) => m.autor != autor);
    io.sockets.emit("mensajes", mensajes);
  });
});

const PORT = 8080;
const server = httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
server.on("error", (error) => {
  console.error(`Error en el servidor ${error}`);
}); */