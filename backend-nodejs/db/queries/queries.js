const INSERT_USER = "INSERT INTO users(username, password, status) VALUES($1, $2, $3) RETURNING *";
const FETCH_USERS = "SELECT * FROM users";
const FETCH_SINGLE_USER = "SELECT * FROM users WHERE id = $1";

const CREATE_MESSAGE = "INSERT INTO messages(from, to) VALUES($1, $2)";
const FETCH_MESSAGES = "SELECT * FROM messages WHERE from = $1 AND to = $2";


module.exports = { INSERT_USER, FETCH_USERS, FETCH_SINGLE_USER, CREATE_MESSAGE, FETCH_MESSAGES}