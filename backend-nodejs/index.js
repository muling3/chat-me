const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

//cors
const cors = require("cors");

//import db client
const client = require("./db/dbConfig");
const { CREATE_MESSAGE, FETCH_MESSAGES, FETCH_USERS } = require("./db/queries/queries");
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
  
let testMessages = [
  { id: 1, send_from: "Alex", send_to: "Test User", message: "Hello" },
  { id: 2, send_from: "Test User", send_to: "Alex", message: "Hi Alex" },
  { id: 3, send_from: "Alex", send_to: "Test User", message: "Hello" },
  { id: 4, send_from: "Test User", send_to: "Alex", message: "Yeeeess" },
  { id: 5, send_from: "Test User", send_to: "Alex", message: "How is the going nigga?" },
  {
    id: 6,
    send_from: "Alex",
    send_to: "Faith",
    message: "Acha madharau madogodogo bana",
  },
  {
    id: 7,
    send_from: "Alex",
    send_to: "Test User",
    message: "Unaniita aje nigga??",
  },
  {
    id: 8,
    send_from: "Test User",
    send_to: "Alex",
    message: "We kwenda na uko,....unajiona sukariiii na nimezoea kukula?",
  },
  { id: 9, send_from: "Test User", send_to: "Alex", message: "Achaga maringo" },
  { id: 10, send_from: "Alex", send_to: "Test User", message: "Sema wewe" },
];

  socket.on("user-messages", async () => {
    // store the user in the database
    let {messages, error} = await GetAllMessages(client, FETCH_MESSAGES);
    console.log("messages", messages)
    // testMessages = messages;
    
    socket.emit("messages", { messages: messages });
  });

  socket.on("message", async ({ from, to, message }) => {
    console.log(from, to, message);
    // store the user in the database
    let {msg, error} = await CreateMessage(client, CREATE_MESSAGE, [from, to, message]);
    let {messages, error: err} = await GetAllMessages(client, FETCH_MESSAGES);
    console.log("messages", messages)
    // testMessages.push(msg)

    socket.broadcast.emit("messages", { messages: messages });
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

httpServer.listen(PORT, () => console.log(`Listening on port ${4000}`));
