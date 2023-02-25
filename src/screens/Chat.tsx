import React, { MouseEvent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Chat = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(state);
  }, []);
  
  const handleSendMessage = () => {

  }

  const handleCloseOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    navigate("/users");
  };

  return (
    <div className="container chat">
      <div className="chat-header">
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
          <button className="close" onClick={handleCloseOnClick}>
            CLOSE
          </button>
        </div>
      </div>
      <div className="chat-area">
        {/* <div className="received-message message">
          Hi, iits a from message
        </div> */}

        <div className="send-message message">
          Hi its a to message
        </div>
        {/*<div className="received-message message">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit hic enim quibusdam? Neque temporibus, assumenda vero quisquam molestias suscipit officiis?
        </div>
        <div className="received-message message">
          Hi, iits a from message
        </div>
        <div className="send-message message">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam molestiae beatae officiis eum ullam impedit. Quidem consequatur explicabo sapiente at esse fugiat iste corporis eum nulla odio, fuga officia praesentium soluta officiis, suscipit ut quos natus velit incidunt. Natus nulla placeat nesciunt, quae modi delectus quas temporibus qui laborum itaque deserunt iure veritatis sed cum dolorum inventore illum suscipit dolorem ducimus quo voluptates. Aperiam dolorum placeat perspiciatis ipsam? Unde facere, beatae culpa harum nihil delectus similique natus nam asperiores, quis, id dolorem quam quibusdam dolores enim autem. Dolore accusamus id rerum eos voluptate, est sapiente ducimus, iure facilis voluptatem suscipit!
        </div> */}
      </div>
      <div className="send">
        <input type="text" placeholder="Type your message here..." />
        <button className="send-btn" onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
