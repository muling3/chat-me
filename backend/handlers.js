const client = require("./db/dbConfig");
const {
  FetchUser,
  InsertUser,
  FetchUserByUsername,
  GetAllUsers,
  UpdateUserStatus,
} = require("./db/helpers");

const {
  FETCH_SINGLE_USER,
  FETCH_USERS,
  FIND_USERNAME,
  INSERT_USER,
  UPDATE_STATUS,
} = require("./db/queries/queries");

const AddUser = async (req, res) => {
  const { username, password, firstname, lastname, email, img } = req.body;

  //check whether username already exists in db
  const result1 = await FetchUserByUsername(client, FIND_USERNAME, [username]);
  if (result1.user != undefined) {
    res.status(400).json({ error: "User already exists" });
    return;
  }

  if (result1.error) {
    res.status(400).json({ error: error });
    return;
  }

  //save the user in db
  const { user, error } = await InsertUser(client, INSERT_USER, [
    firstname ? firstname : null,
    lastname ? lastname : null,
    email ? email : null,
    img ? img : null,
    username,
    password,
    "Offline",
  ]);

  if (error) {
    res.status(500).json({ error });
    return;
  }

  res.status(201).json({ message: "Successfully Registered" });
};

const LoginUser = async (req, res) => {
  const { username, password } = req.body;

  //check whether username already exists in db
  const { user, error } = await FetchUser(client, FETCH_SINGLE_USER, [
    username,
    password,
  ]);

  if (!user) {
    res
      .status(401)
      .json({ error: "Bad Credentials or Account Does Not Exist!" });
    return;
  }

  if (error) {
    res.status(500).json({ error });
    return;
  }

  // update the user online status
  const { rows, error: err } = await UpdateUserStatus(client, UPDATE_STATUS, [
    "Online",
    username,
  ]);

  // throw internal server error
  if (err) {
    res.status(500).json({ error: err });
    return;
  }

  // respond with a success status
  res.status(200).json({ message: "Login successful" });
};

const FetchAllUsers = async (req, res) => {
  const { users, error } = await GetAllUsers(client, FETCH_USERS);

  if (error) {
    res.status(500).json({ error });
    return;
  }

  res.status(200).json({ users });
};

const UpdateStatus = async (req, res) => {
  const { rows, error } = await UpdateUserStatus(client, UPDATE_STATUS, [
    req.body.status,
    req.body.username,
  ]);

  if (error) {
    res.status(500).json({ error });
    return;
  }

  res.status(200).json({ rows });
};

module.exports = { AddUser, LoginUser, FetchAllUsers, UpdateStatus };
