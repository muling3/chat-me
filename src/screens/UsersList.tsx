import React, { MouseEvent, useEffect } from "react";
import { useLocation, useNavigate, NavigateOptions } from "react-router-dom";
import { User } from "../helpers/User.interface";

//scoket io client
import { io } from "socket.io-client";

const UsersList = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  //define global socket io client
  let client;

  // chat mate
  let receiver_name: String = "";

  const usersList: User[] = [
    { username: "alexam", password: "1234", id: 1, status: "Offline" },
    { username: "johnte", password: "1234", id: 2, status: "Online" },
    { username: "chris", password: "1234", id: 3, status: "Online" },
    { username: "jackson", password: "1234", id: 4, status: "Offline" },
  ];

  useEffect(() => {
    console.log(state);
  }, [state]);

  useEffect(() => {
    client = io("http://localhost:4000")
    console.log(client)
  }, []);

  const handleChatOnClick = (name: String) => {
    receiver_name = name;

    //update navigation options
    const options: NavigateOptions = {
      state: { user: state.username, receiver_name },
    };

    navigate("/chat", options);
  };

  const logoutHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    navigate("/");
  };

  return (
    <>
      <div className="container users">
        <div className="users-top">
          <div>
            <p className="title">Available Users</p>
          </div>
          <div>
            <button onClick={logoutHandler} className="logout">
              Logout
            </button>
          </div>
        </div>
        <div className="users-list">
          {usersList.map((u) => (
            <div className="user-card">
              <div className="user-info">
                <div className="profile-pic">
                  {u.username.substring(0, 1).toUpperCase()}
                  {/* <img src="" alt="" /> */}
                </div>
                <div className="about">
                  <p className="name">{u.username}</p>
                  <p className="status">{u.status}</p>
                </div>
              </div>
              <div>
                <div
                  className="chat-button"
                  onClick={() => handleChatOnClick(u.username)}
                >
                  Chat
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UsersList;
