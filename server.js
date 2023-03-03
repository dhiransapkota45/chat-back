const express = require("express");
const app = express();
require("./database/db");
const cors = require("cors");
require("dotenv").config();
const user = require("./routes/userRoute");
const chat = require("./routes/chatRoute");
const message = require("./routes/messageRoute");
app.use(cors());
app.use(express.json());

app.use("/api", user);
app.use("/api", chat);
app.use("/api", message);

const server = app.listen(process.env.PORT, () => {
  console.log("listening at port ", process.env.PORT);
});

const io = require("socket.io")(server, {
  pingTimeout: 6000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  // console.log("connected to socket", socket.id);

  // socket.on("setup", (userData) => {
  //   socket.join(userData._id);
  //   socket.emit("connected")
  // });

  socket.on("join chat", (room) => {
    let i = 1;
    console.log(`user${i++} has joined the chat`, room);
    socket.join(room);
  });

  socket.on("new message", (newMessagereceived) => {
    console.log(newMessagereceived, "this is from socket");

    // socket.emit("random", "this is random information");
    io.in(newMessagereceived.chat._id).emit(
      "message received",
      newMessagereceived
    );
  });
});
