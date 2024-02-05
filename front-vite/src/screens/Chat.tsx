import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { Location, useLocation, useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { Message } from "../helpers/message.interface";

//scroll to bottom
import ScrollToBottom from "react-scroll-to-bottom";

let client: Socket;
const Chat = () => {
  const { state }: Location = useLocation();
  const { from, to, stat } = state;

  const navigate = useNavigate();

  const [messagesList, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    client = io("http://localhost:4000");
    client.emit("user-messages", { from, to });

    client.on("messages", (arg: { messages: Message[] }) => {
      // sorting the messages by id so that they can be logged as they were sent
      arg.messages.sort(function (a, b) {
        return a.id - b.id;
      });

      setMessages(arg.messages);
    });
  }, []);

  const handleSendMessage = () => {
    let userInput: HTMLInputElement = document.getElementById(
      "message"
    ) as HTMLInputElement;
    client.emit("message", { from, to, message: userInput.value });

    // clearing the message input
    userInput.value = "";
  };

  const handleCloseOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    navigate("/users");
  };

  return (
    <div className="container chat">
      <div className="chat-header">
        <div className="user-info">
          <div className="profile-pic">
            {to.substring(0, 1).toUpperCase()}
            {/* <img src="" alt="" /> */}
          </div>
          <div className="about">
            <p className="name">{to}</p>
            <p className="status">{stat}</p>
          </div>
        </div>
        <div>
          <button className="close" onClick={handleCloseOnClick}>
            CLOSE
          </button>
        </div>
      </div>
      <ScrollToBottom className="scroll-area" scrollViewClassName="chat-area">
        {messagesList &&
          messagesList.map((m) => (
            <>
              {m.send_to == from && (
                <div className="received-message message" key={m.id}>
                  {m.message}
                </div>
              )}

              {m.send_from == from && (
                <div className="send-message message" key={m.id}>
                  {m.message}
                </div>
              )}
            </>
          ))}
      </ScrollToBottom>
      <div className="send">
        <input
          type="text"
          name="message"
          id="message"
          placeholder="Type your message here..."
        />
        <button className="send-btn" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
