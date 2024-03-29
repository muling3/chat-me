const INSERT_USER =
  "INSERT INTO users(firstname, lastname, email, img, username, password, status) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *";
const FETCH_USERS = "SELECT * FROM users";
const FETCH_SINGLE_USER =
  "SELECT * FROM users WHERE username = $1 AND password = $2";
const FIND_USERNAME = "SELECT * FROM users WHERE username = $1";
const CREATE_MESSAGE =
  "INSERT INTO messages(send_from, send_to, message) VALUES($1, $2, $3) RETURNING *";
const FETCH_MESSAGES = "SELECT * FROM messages";
const FETCH_USER_MESSAGES =
  "SELECT * FROM messages WHERE send_from = $1 and send_to = $2";
const UPDATE_STATUS =
  "UPDATE users SET status = $1 WHERE username = $2 RETURNING *";

module.exports = {
  INSERT_USER,
  FETCH_USERS,
  FETCH_SINGLE_USER,
  FIND_USERNAME,
  CREATE_MESSAGE,
  FETCH_MESSAGES,
  FETCH_USER_MESSAGES,
  UPDATE_STATUS,
};
