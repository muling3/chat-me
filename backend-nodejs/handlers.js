const client = require("./db/dbConfig");
const { FetchUser, InsertUser, FetchUserByUsername, GetAllUsers } = require("./db/helpers");

const {
  FETCH_SINGLE_USER,
  FETCH_USERS,
  FIND_USERNAME,
  INSERT_USER,
} = require("./db/queries/queries");

const AddUser = async (req, res) => {
  const { username, password } = req.body;

  //check whether username already exists in db
  const result1 = await FetchUserByUsername(client, FIND_USERNAME, [username]);
  if (result1.user != undefined) {
    res.json({ error: "User already exists" }).status(400);
    return;
  }
  if (result1.error) {
    res.json({ error: error }).status(400);
    return;
  }

  //save the user in db
  const { user, error } = await InsertUser(client, INSERT_USER, [
    username,
    password,
    "Online",
  ]);

  if (error) {
    res.json({ error }).status(500);
    return;
  }

  res.json({ message: "Successfully Registered" }).status(201);
};

const LoginUser = async (req, res) => {
  const { username, password } = req.body;

  //check whether username already exists in db
  const { user, error } = await FetchUser(client, FETCH_SINGLE_USER, [
    username,
    password,
  ]);
  if (!user) {
    res.json({ error: "Bad Credentials" }).status(401);
    return;
  }

  if (error) {
    res.json({ error }).status(500);
    return;
  }

  //save the user in db
  res.json({ message: "Login successful" }).status(200);
};

const FetchAllUsers = async (req, res) => {
  const { users, error } = await GetAllUsers(client, FETCH_USERS);

  if (error) {
    res.json({ error }).status(500);
    return;
  }

  res.json({ users }).status(200);
};

module.exports = { AddUser, LoginUser, FetchAllUsers };
