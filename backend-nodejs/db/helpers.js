const InsertUser = (client, query, values) => {
  let user;

  client.query(query, values, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      user = res.rows[0];
    }
  });

  return user;
};

const FetchUser = (client, query, values) => {
  let user;
  client.query(query, values, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      user = res.rows[0];
    }
  });
  return user;
};

const GetAllUsers = (client, query, values) => {
  let users = [];
  client.query(query, values, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      users = res.rows;
    }
  });
  return users;
};

const CreateMessage = (client, query, values) => {
  client.query(query, values, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
    console.log(res.rows[0]);
    }
  });
};

const GetAllMessages = (client, query, values) => {
  let messages = [];
  client.query(query, values, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      messages = res.rows;
    }
  });
  
  return messages;
};

module.exports = { InsertUser, FetchUser, GetAllUsers, GetAllMessages, CreateMessage}