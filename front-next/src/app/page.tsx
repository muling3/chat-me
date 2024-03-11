"use client";

import { Fragment } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { io, Socket } from "socket.io-client";
import { formatDistance } from "date-fns";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  status: string;
  img?: string;
}

interface Message {
  id: number;
  send_from: string;
  send_to: string;
  message: string;
  created_at: string;
}

let userInfo: User;
let client: Socket;

export default function Home() {
  const API_URL = process.env.API_URL || "http://localhost:4000";
  const [usersList, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [messagesList, setMessages] = useState<Message[]>([]);
  const router = useRouter();

  const [title, setTitle] = useState("friends");
  const [selected, setSelected] = useState<{
    msgs?: {
      text: string;
      bg: string;
    };
    friends?: {
      text: string;
      bg: string;
    };
    group?: {
      text: string;
      bg: string;
    };
    settings?: {
      text: string;
      bg: string;
    };
  }>({
    msgs: {
      text: "",
      bg: "",
    },
    friends: {
      text: "text-white",
      bg: "bg-blue-400",
    },
    group: {
      text: "",
      bg: "",
    },
    settings: {
      text: "",
      bg: "",
    },
  });

  // fetch currently logged in user
  useEffect(() => {
    userInfo = JSON.parse(localStorage.getItem("user") as string);
    // restrict to logged in users only
    if (!userInfo) {
      router.replace("/login");
    }
    console.log("userinfo", userInfo);
  }, []);

  // get all users
  useEffect(() => {
    axios
      .get(`${API_URL}/users`)
      .then((d: AxiosResponse<{ users: User[]; error: String }>) =>
        setUsers(d.data.users.filter((u) => u.username != userInfo.username))
      )
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    client = io(`${API_URL}`);
    console.log(
      `from - to details => ${userInfo.username}-${selectedUser?.username}`
    );

    client.on(
      `${selectedUser?.username}-${userInfo?.username}`,
      (arg: { messages: Message[] }) => {
        console.log("MESSAGES  REVERSE", arg.messages);
        // sorting the messages by id so that they can be logged as they were sent
        arg.messages.sort(function (a, b) {
          return a.id - b.id;
        });

        setMessages((prev) => {
          console.log("previous messages ", prev);
          return [...prev, ...arg.messages];
        });
      }
    );

    client.on(
      `${userInfo.username}-${selectedUser?.username}`,
      (arg: { messages: Message[] }) => {
        // sorting the messages by id so that they can be logged as they were sent
        arg.messages.sort(function (a, b) {
          return a.id - b.id;
        });

        console.log("MESSAGES ", arg.messages);
        // console.log(
        //   " message from ",
        //   arg.messages[0].send_from,
        //   " message to ",
        //   arg.messages[0].send_to
        // );
        // setMessages(arg.messages);

        // check where selected.username and userInfo.username match   :: NOT WORKING, ON PROGRESS
        // let currUsers = [selectedUser?.username, userInfo.username];
        // let foundSource = currUsers.find((u) => u == arg.messages[0].send_from);
        // let foundRecipient = currUsers.find((u) => u == arg.messages[0].send_to);
        // console.log(
        //   " FOUND SOURCE ",
        //   foundSource,
        //   " FOUND  RECIPIENT ",
        //   foundRecipient,
        //   "CURRENT USERS ",
        //   currUsers
        // );
        // console.log(
        //   "CURRENT MESSAGES ",
        //   messagesList,
        //   " FETCHED MESSAGES ",
        //   arg.messages
        // );
        // if (foundSource && foundRecipient) {
        setMessages((prev) => {
          console.log("previous messages ", prev);
          return [...prev, ...arg.messages];
        });
        // }
        // selectedUser?.username === arg.messages[0].send_from ||
        // selectedUser?.username === arg.messages[0].send_to
        //   ? setMessages(arg.messages)
        //   : null;
      }
    );
  }, [selectedUser?.id]);

  const handleSendMessage = (e: React.MouseEvent) => {
    let userInput: HTMLInputElement = document.getElementById(
      "message"
    ) as HTMLInputElement;
    client.emit("message", {
      from: userInfo?.username,
      to: selectedUser!.username,
      message: userInput.value,
    });

    // clearing the message input
    userInput.value = "";
  };

  const handleMenuItemClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    elem: string
  ) => {
    e.preventDefault();

    if (elem === "msgs") {
      setSelected({
        msgs: {
          text: "text-white",
          bg: "bg-blue-400",
        },
      });
      setTitle("chats");
    } else if (elem === "friends") {
      setSelected({
        friends: {
          text: "text-white",
          bg: "bg-blue-400",
        },
      });
      setTitle("friends");
    } else if (elem === "group") {
      setSelected({
        group: {
          text: "text-white",
          bg: "bg-blue-400",
        },
      });
      setTitle("groups");
    } else if (elem === "settings") {
      setSelected({
        settings: {
          text: "text-white",
          bg: "bg-blue-400",
        },
      });
      setTitle("settings");
    }
  };

  const handleUserSelection = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    user: User
  ) => {
    e.preventDefault();

    // change the state on chats screen
    setSelectedUser(user);

    // fetch messages
    client = io(`${API_URL}`);
    client.emit("user-messages", {
      from: userInfo?.username,
      to: user.username,
    });

    client.on("messages", (arg: { messages: Message[] }) => {
      // sorting the messages by id so that they can be logged as they were sent
      arg.messages.sort(function (a, b) {
        return a.id - b.id;
      });

      setMessages(arg.messages);
    });
  };

  const handleLogout = (e: React.MouseEvent) => {
    // prevent default
    e.preventDefault();

    //update the user status to online
    axios
      .post(`${API_URL}/users/status`, {
        username: userInfo.username,
        status: "Offline",
      })
      .then((d) => {
        //remove the user from local storage
        localStorage.removeItem("user");

        // navigate to homepage
        router.replace("/login");
      })
      .catch((err) => console.log("error logging out", err));
  };

  if (!userInfo) {
    return (
      <main className="w-screen h-screen px-24 py-10 flex justify-center items-center overflow-hidden">
        <span className="text-gray-500">
          Ooops!!! It seems you are not logged in buddy!!!!
        </span>
      </main>
    );
  }

  return (
    <main className="w-screen h-screen px-24 py-10 relative overflow-hidden">
      <div className="logo text-start sticky top-0 z-50 mb-3">
        <span className="font-extrabold text-blue-400 text-3xl">Chat</span>
        <span className="text-gray-500 font-bold text-xl">Me</span>
      </div>
      <div className="grid grid-cols-3 gap-4 h-[95%] overflow-hidden">
        <div className="col-span-1 rounded-md border-2 py-5 shadow-innerneu1 flex justify-between items-start h-[98%] overflow-hidden">
          <div className="menu-b w-[22%] h-full flex flex-col justify-between items-start">
            <div className="menu h-[40%] w-full flex flex-col justify-around items-start px-2">
              <button
                className={`btn outline-none menu-item flex justify-start items-center p-3 rounded-md border-none hover:text-white hover:bg-blue-400 shadow-innerneu1 relative ${selected.msgs?.text} ${selected.msgs?.bg}`}
                id="msgs"
                onClick={(e) => handleMenuItemClick(e, "msgs")}
              >
                <span className="material-symbols-outlined">stacked_email</span>
              </button>
              <button
                className={`btn outline-none menu-item flex justify-start items-center p-3 rounded-md border-none hover:text-white hover:bg-blue-400 shadow-innerneu1 relative ${selected.group?.text} ${selected.group?.bg}`}
                id="groups"
                onClick={(e) => handleMenuItemClick(e, "group")}
              >
                <span className="material-symbols-outlined">forum</span>
              </button>
              <button
                className={`btn outline-none menu-item flex justify-start items-center p-3 rounded-md border-none hover:text-white hover:bg-blue-400 shadow-innerneu1 relative  ${selected.friends?.text} ${selected.friends?.bg}`}
                id="friends"
                onClick={(e) => handleMenuItemClick(e, "friends")}
              >
                <span className="material-symbols-outlined">group</span>
              </button>
            </div>
            <div className="actions w-full flex flex-col justify-around items-start px-2">
              <button
                className={`btn outline-none menu-item flex justify-start items-center p-3 border-none hover:text-white hover:bg-blue-400 rounded-md shadow-innerneu1 relative ${selected.settings?.text} ${selected.settings?.bg} `}
                name="settings"
                onClick={(e) => handleMenuItemClick(e, "settings")}
              >
                <span className="material-symbols-outlined">
                  settings_heart
                </span>
              </button>
              <button
                className={`btn outline-none menu-item flex justify-start items-center p-3 border-none hover:text-white hover:bg-blue-400 rounded-md shadow-innerneu1 relative mt-6 ${selected.settings?.text} ${selected.settings?.bg}`}
                name="logout"
                onClick={handleLogout}
              >
                <span className="material-symbols-outlined">logout</span>
              </button>
            </div>
          </div>
          <div className="menu-action min-h-full w-[88%] h-full overflow-y-auto overflow-x-hidden">
            <h1 className="header uppercase font-semibold">{title}</h1>
            {title === "friends" && usersList.length == 0 && (
              <div className="no-msgs h-full w-full flex flex-col items-center justify-center">
                <span className="text-gray-500">
                  Can't locate friends nearby
                </span>
                <button className="btn px-4 py-2 rounded-xl shadow-innerneu1 text-gray-600">
                  Make Friends
                </button>
              </div>
            )}
            {title === "friends" &&
              usersList.length >= 1 &&
              usersList.map((u, i) => (
                <div
                  className="user-item border-b-2 flex justify-start items-center w-full p-2 cursor-pointer duration-500 hover:bg-blue-200 hover:text-white"
                  key={`${i}`}
                  onClick={(e) => handleUserSelection(e, u)}
                >
                  <div className="avatar mr-2">
                    <div className="w-12 mask mask-squircle">
                      <Image
                        src="profile_1.svg"
                        alt="this profile photo"
                        width={`100`}
                        height={100}
                      />
                    </div>
                  </div>
                  <div className="user-info">
                    <p className="username font-medium text-gray-800">
                      {u.username}
                    </p>
                    <small className="fullname text-gray-500">{`${u.firstname} ${u.lastname}`}</small>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="col-span-2 rounded-md border-2 shadow-innerneu1 h-[98%] w-full overflow-hidden flex flex-col justify-between items-start">
          <div className="selected-user w-full flex justify-between items-center p-4 border-b-2">
            <div className="user flex ">
              <div className="avatar mr-3">
                <div className="w-12 mask mask-squircle">
                  <Image
                    src="profile_1.svg"
                    alt="this profile photo"
                    width={`100`}
                    height={100}
                  />
                </div>
              </div>
              <div className="user-info">
                <p className="username font-medium text-gray-800">
                  {selectedUser?.username}
                </p>
                <small className="fullname text-gray-500">
                  {selectedUser?.status}
                </small>
              </div>
            </div>
            <div className="actio-items flex">
              <span className="material-symbols-outlined mx-3 cursor-pointer">
                search
              </span>
              <span className="material-symbols-outlined mx-3 cursor-pointer">
                call
              </span>
              <span className="material-symbols-outlined mx-3 cursor-pointer">
                block
              </span>
            </div>
          </div>
          <div className="conversations w-full p-4 flex-1 overflow-x-hidden overflow-y-auto">
            {messagesList && messagesList.length == 0 && (
              <div className="no-msgs h-full w-full flex flex-col items-center justify-center">
                {selectedUser && (
                  <>
                    {" "}
                    <span className="text-gray-500">
                      No previous communication with{" "}
                      <span className="bg-blue-500 text-white uppercase p-1">
                        {selectedUser?.username}
                      </span>
                    </span>
                    <button className="btn px-4 py-2 rounded-xl shadow-innerneu1 text-gray-600 my-1">
                      Start conversation
                    </button>
                  </>
                )}
                {!selectedUser && (
                  <span className="text-gray-500">
                    Please choose a friend to chat or view previous
                    conversation!!!
                    {/* <span className="bg-blue-500 text-white uppercase p-1">
                      {selectedUser?.username}
                    </span> */}
                  </span>
                )}
              </div>
            )}
            {messagesList &&
              messagesList.length >= 1 &&
              messagesList.map((m, i) => (
                <Fragment key={i}>
                  {m.send_to == userInfo.username && (
                    <div className="chat chat-start" key={i}>
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                          <Image
                            src="profile_4.svg"
                            alt="this profile photo"
                            width={`100`}
                            height={100}
                          />
                        </div>
                      </div>
                      <div className="chat-header">
                        {m.send_from}{" "}
                        <time className="text-xs opacity-50">
                          {formatDistance(m.created_at, new Date(), {
                            addSuffix: true,
                          })}
                        </time>
                      </div>
                      <div className="chat-bubble">{m.message}</div>
                      <div className="chat-footer opacity-50">Delivered</div>
                    </div>
                  )}
                  {m.send_from == userInfo.username && (
                    <div className="chat chat-end" key={i}>
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                          <Image
                            src="profile_2.svg"
                            alt="this profile photo"
                            width={`100`}
                            height={100}
                          />
                        </div>
                      </div>
                      <div className="chat-header">
                        {m.send_from}{" "}
                        <time className="text-xs opacity-50">
                          {formatDistance(m.created_at, new Date(), {
                            addSuffix: true,
                          })}
                        </time>
                      </div>
                      <div className="chat-bubble">{m.message}</div>
                      <div className="chat-footer opacity-50">
                        Seen at{" "}
                        {formatDistance(m.created_at, new Date(), {
                          addSuffix: true,
                        })}
                      </div>
                    </div>
                  )}
                </Fragment>
              ))}
          </div>
          <div className="send w-full flex justify-between items-center p-4">
            <Input
              name="message"
              placeholder="Type your message here ...."
              styles="w-full mr-3 border-2"
              type="text"
            />
            <Button
              label="Send"
              styles="w-24 hover:bg-blue-500 hover:text-white"
              onClick={handleSendMessage}
            />
          </div>
        </div>
      </div>
      <div className="footer flex justify-center items-start md:items-center">
        <small>
          Built by Alexander Muli / +254702051060 / alexandermuli234@gmail.com
          &copy; 2024
        </small>
      </div>
    </main>
  );
}
