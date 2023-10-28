const { Client } = require("pg");

const connectionString = "postgresql://root:password@localhost:5432/chatme"

const client = new Client({ connectionString });

module.exports = client