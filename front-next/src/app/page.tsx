"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
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
            </div>
          </div>
          <div className="menu-action min-h-full w-[88%] h-full overflow-y-auto overflow-x-hidden">
            <h1 className="header uppercase font-semibold">{title}</h1>
            {10 < 1 && (
              <div className="no-msgs h-full w-full flex flex-col items-center justify-center">
                <span className="text-gray-500">No previous chats</span>
                <button className="btn px-4 py-2 rounded-xl shadow-innerneu1 text-gray-600">
                  Make Friends
                </button>
              </div>
            )}
            {10 > 1 &&
              [1, 2, 3, 4, 5].map((n) => (
                <div
                  className="user-item border-b-2 flex justify-start items-center w-full p-2 cursor-pointer"
                  key={`${n}`}
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
                      Johnnnie
                    </p>
                    <small className="fullname text-gray-500">John Doe</small>
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
                <p className="username font-medium text-gray-800">Johnnnie</p>
                <small className="fullname text-gray-500">Online</small>
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
            {1 > 10 && (
              <div className="no-msgs h-full w-full flex flex-col items-center justify-center">
                <span className="text-gray-500">
                  No previos communication with Johnnie
                </span>
                <button className="btn px-4 py-2 rounded-xl shadow-innerneu1 text-gray-600">
                  Start conversation
                </button>
              </div>
            )}
            {10 > 1 && (
              <>
                <div className="chat chat-start">
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
                    Obi-Wan Kenobi
                    <time className="text-xs opacity-50">12:45</time>
                  </div>
                  <div className="chat-bubble">You were the Chosen One!</div>
                  <div className="chat-footer opacity-50">Delivered</div>
                </div>
                <div className="chat chat-end">
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
                    Anakin
                    <time className="text-xs opacity-50">12:46</time>
                  </div>
                  <div className="chat-bubble">I hate you!</div>
                  <div className="chat-footer opacity-50">Seen at 12:46</div>
                </div>
                <div className="chat chat-end">
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
                    Anakin
                    <time className="text-xs opacity-50">12:46</time>
                  </div>
                  <div className="chat-bubble">Mother fucker!</div>
                  <div className="chat-footer opacity-50">Seen at 12:46</div>
                </div>
                <div className="chat chat-end">
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
                    Anakin
                    <time className="text-xs opacity-50">12:46</time>
                  </div>
                  <div className="chat-bubble">
                    Na ukaage ukijua we n fala sana!
                  </div>
                  <div className="chat-footer opacity-50">Seen at 12:46</div>
                </div>
                <div className="chat chat-start">
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
                    Obi-Wan Kenobi
                    <time className="text-xs opacity-50">12:48</time>
                  </div>
                  <div className="chat-bubble">
                    I'm going to repeat again,You were the Chosen One!
                  </div>
                  <div className="chat-footer opacity-50">Delivered</div>
                </div>
                <div className="chat chat-start">
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
                    Obi-Wan Kenobi
                    <time className="text-xs opacity-50">12:48</time>
                  </div>
                  <div className="chat-bubble">
                    And once more, You were the Chosen One!
                  </div>
                  <div className="chat-footer opacity-50">Delivered</div>
                </div>
              </>
            )}
          </div>
          <div className="send w-full flex justify-between items-center p-4">
            <Input
              placeholder="Type your message here ...."
              styles="w-full mr-3 border-2"
              type="text"
            />
            <Button label="Send" styles="w-24" />
          </div>
        </div>
      </div>
      <div className="footer flex justify-center items-start md:items-center">
        <small>
          Built by Alexander Muli / +254702051060 / alexandermuli234@gmail.com
        </small>
      </div>
    </main>
  );
}
