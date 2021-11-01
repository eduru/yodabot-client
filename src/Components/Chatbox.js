import React, { useState } from "react";
import useSendMessage from "../CustomHooks/useSendMessage";

const Chatbox = ({ accessToken, chatBotUrl, sessionToken, loadingSession }) => {
  const [userMessage, setUserMessage] = useState("");
  const { getAnswer, loadingAnswer } = useSendMessage(
    accessToken,
    chatBotUrl,
    userMessage
  );
  const [chat, setChat] = useState([]);

  return (
    <div className="Chatbox">
      <div className="Chat-container">
        {chat.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
      </div>
      <input type="text" onChange={(e) => setUserMessage(e.target.value)} />
      <button>TEST SEND MESSAGE</button>
    </div>
  );
};

export default Chatbox;
