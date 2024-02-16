const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user_routes");
const messagesRoutes = require("./routes/messages_routes");
const moongoose = require("mongoose");
const socket = require("socket.io");
const socketHandlers = require("./sockets/socketHandlers");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoutes);

moongoose
  .connect(process.env.MONGO_TEST)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error.message);
  });

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port: ${server.address().port}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

socketHandlers(io);
