import axios, { AxiosResponse } from "axios";
import { MouseEvent, useEffect, useState } from "react";
import { useNavigate, NavigateOptions } from "react-router-dom";
import { User } from "../helpers/User.interface";

let userInfo: User;
const UsersList = () => {
  const navigate = useNavigate();

  const [usersList, setUsers] = useState<User[]>([]);

  // fetching user from local storage

  useEffect(() => {
    userInfo = JSON.parse(localStorage.getItem("user") as string);
    console.log("userinfo", userInfo);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/users")
      .then((d: AxiosResponse<{ users: User[]; error: String }>) =>
        setUsers(d.data.users)
      )
      .catch((err) => console.log(err));
  }, []);

  const handleChatOnClick = (name: String, status: String) => {
    //update navigation options
    const options: NavigateOptions = {
      state: { from: userInfo.username, to: name, stat: status },
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
          {usersList !== null &&
            usersList.map((u) => (
              <div className="user-card" key={u.id}>
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
                    onClick={() => handleChatOnClick(u.username, u.status)}
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
