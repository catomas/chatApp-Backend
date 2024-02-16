module.exports = function (io) {
  global.onlineUsers = new Map();

  io.on("connection", (socket) => {
    global.chatSocket = socket;

    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
      io.emit("users-online", Array.from(onlineUsers.keys()));
    });

    socket.on("disconnect", () => {
      const userDisconnected = Array.from(onlineUsers.entries()).find(
        ([userId, socketId]) => socketId === socket.id
      )?.[0];

      if (userDisconnected) {
        onlineUsers.delete(userDisconnected);
      }

      io.emit("users-online", Array.from(onlineUsers.keys()));
    });

    socket.on("get-users-online", () => {
      const usersOnline = Array.from(onlineUsers.keys());
      socket.emit("users-online", usersOnline);
    });

    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);

      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data);
        console.log(data);
      }
    });
  });
};
