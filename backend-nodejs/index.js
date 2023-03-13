const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

//cors
const cors = require("cors");

//import db client
const client = require("./db/dbConfig");
const { CREATE_MESSAGE, FETCH_MESSAGES,
  FETCH_USER_MESSAGES, FETCH_USERS } = require("./db/queries/queries");
const { CreateMessage, GetAllMessages, GetAllUsers } = require("./db/helpers");

//connecting to db
client.connect();

const app = express();

//setting default cors configs
app.use(cors());

// json middleware
app.use(express.json());

// adding auth routes middleware
app.use(require("./routes"));

// Test endpoint
app.get("/test", (req, res) => {
  res.json({ message: "Connected successfully" });
});

// App listening PORT
const PORT = 4000;

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

//test messages 
io.on("connection", async (socket) => {
  console.log("New User");
 
  socket.on("user-messages", async ({ from, to}) => {

    // fetch all messages from the database
    let allMessages = []
    let { messages, error } = await GetAllMessages(client, FETCH_USER_MESSAGES, [from, to]);
    allMessages.push(...messages);

    let response = await GetAllMessages(
      client,
      FETCH_USER_MESSAGES, [to, from]
    );
    allMessages.push(...response.messages)

    socket.emit("messages", { messages: allMessages });
  });

  socket.on("message", async ({ from, to, message }) => {
   // push the message into the database
    let {msg, error} = await CreateMessage(client, CREATE_MESSAGE, [from, to, message]);

    // fetch all messages from the database
     let allMessages = []
    let { messages, error: err } = await GetAllMessages(
      client,
      FETCH_USER_MESSAGES, [from, to]
    );
    allMessages.push(...messages)

    let response = await GetAllMessages(
      client,
      FETCH_USER_MESSAGES, [to, from]
    );
    allMessages.push(...response.messages)

    socket.broadcast.emit("messages", { messages: allMessages });
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

httpServer.listen(PORT, () => console.log(`Listening on port ${PORT}`));
