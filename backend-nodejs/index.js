const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

//cors
const cors = require("cors")

//import db client
const client = require("./db/dbConfig")

//connecting to db
client.connect()

const app = express();

//setting default cors configs
app.use(cors())

app.get("/test", (req, res)=>{
  res.json({ message: "Connected successfully"})
})

const PORT = 4000;

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("New User");
  // console.log(socket)
  
  client.query("SELECT * FROM users WHERE id = $1",[1], (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(res.rows);
    }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

httpServer.listen(PORT, () => console.log(`Listening on port ${4000}`));