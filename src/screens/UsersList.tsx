import React, { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

const UsersList = () => {
  const navigate = useNavigate();

  const handleChatOnClick = (name: String) => {
    console.log(name);
    navigate("/chat");
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
          <div className="user-card">
            <div className="user-info">
              <div className="profile-pic">
                <img src="" alt="" />
              </div>
              <div className="about">
                <p className="name">Chris Zimenyanya</p>
                <p className="status">Online</p>
              </div>
            </div>
            <div>
              <div className="chat-button">Chat</div>
            </div>
          </div>
          <div className="user-card">
            <div className="user-info">
              <div className="profile-pic">
                CZ
                {/* <img src="" alt="" /> */}
              </div>
              <div className="about">
                <p className="name">Chris Zimenyanya</p>
                <p className="status">Online</p>
              </div>
            </div>
            <div>
              <div
                className="chat-button"
                onClick={() => handleChatOnClick("Chris Wanyanya")}
              >
                Chat
              </div>
            </div>
          </div>
          <div className="user-card">
            <div className="user-info">
              <div className="profile-pic">
                <img src="" alt="" />
              </div>
              <div className="about">
                <p className="name">Chris Zimenyanya</p>
                <p className="status">Online</p>
              </div>
            </div>
            <div>
              <div className="chat-button">Chat</div>
            </div>
          </div>
          <div className="user-card">
            <div className="user-info">
              <div className="profile-pic">
                <img src="" alt="" />
              </div>
              <div className="about">
                <p className="name">Chris Zimenyanya</p>
                <p className="status">Online</p>
              </div>
            </div>
            <div>
              <div className="chat-button">Chat</div>
            </div>
          </div>
          <div className="user-card">
            <div className="user-info">
              <div className="profile-pic">
                <img src="" alt="" />
              </div>
              <div className="about">
                <p className="name">Chris Zimenyanya</p>
                <p className="status">Online</p>
              </div>
            </div>
            <div>
              <div className="chat-button">Chat</div>
            </div>
          </div>
          <div className="user-card">
            <div className="user-info">
              <div className="profile-pic">
                <img src="" alt="" />
              </div>
              <div className="about">
                <p className="name">Chris Zimenyanya</p>
                <p className="status">Online</p>
              </div>
            </div>
            <div>
              <div className="chat-button">Chat</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersList;
