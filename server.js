const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  transports: ["websocket"],
});
app.use(
  cors({
    origin: "online-coding-web-app-pi.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

let mentorConnected = false;
let studentConnected = false;
let numOfStudentsConnected = 0;
let mentorSocket = null;

io.on("connection", (socket) => {
  if (!mentorConnected) {
    mentorConnected = true;
    mentorSocket = socket;
    socket.emit("mentor-connected");
    console.log("A Mentor connected");
  } else {
    studentConnected = true;
    numOfStudentsConnected++;
    socket.emit("student-connected");
    console.log("A Student connected");
  }
  socket.on("check-mentor-status", () => {
    console.log(
      "checking mentor status. mentorConnected %d :: studentConnected %d",
      mentorConnected,
      numOfStudentsConnected
    );
    if (numOfStudentsConnected > 0) {
      socket.emit("mentor-status", false);
    } else {
      socket.emit("mentor-status", true);
    }
  });

  socket.on("code-change", (newCode) => {
    socket.broadcast.emit("code-change", newCode);
  });

  socket.on("disconnect", () => {
    if (socket === mentorSocket) {
      console.log("A Mentor disconnected");
      mentorConnected = false;
      mentorSocket = null;
    } else {
      console.log("A student disconnected");
      numOfStudentsConnected--;
      if (numOfStudentsConnected == 0) {
        studentConnected = false;
      }
    }
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
