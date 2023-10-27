const InsertUser = async (client, queryString, values) => {
  try {
    const res = await client.query(queryString, values);
    return { user: res.rows[0] };
  } catch (error) {
    return { error };
  }
};

const FetchUser = async (client, queryString, values) => {
  try {
    const res = await client.query(queryString, values);
    return { user: res.rows[0] };
  } catch (error) {
    return { error };
  }
};

const FetchUserByUsername = async (client, queryString, values) => {
  try {
    const res = await client.query(queryString, values);
    return { user: res.rows[0] };
  } catch (error) {
    return { error };
  }
};

const GetAllUsers = async (client, queryString) => {
  try {
    const res = await client.query(queryString);
    return { users: res.rows };
  } catch (error) {
    return { error };
  }
};

const UpdateUserStatus = async (client, queryString, values) => {
  try {
    const res = await client.query(queryString, values);
    return { rows: res.rows[0] };
  } catch (error) {
    return { error };
  }
};

const CreateMessage = async (client, queryString, values) => {
  try {
    const result = await client.query(queryString, values);
    return { msg: result.rows[0] };
  } catch (error) {
    return { error };
  }
};

const GetAllMessages = async (client, queryString, values) => {
  try {
    const res = await client.query(queryString, values);
    return { messages: res.rows };
  } catch (error) {
    return { error };
  }
};

module.exports = {
  InsertUser,
  FetchUser,
  FetchUserByUsername,
  GetAllUsers,
  GetAllMessages,
  CreateMessage,
  UpdateUserStatus,
};
