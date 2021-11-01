import React, { useEffect, useState } from "react";
import useSendMessage from "../CustomHooks/useSendMessage";

const Chatbox = ({ accessToken, chatBotUrl, sessionToken, loadingSession }) => {
  const [userMessage, setUserMessage] = useState("");
  const { getAnswer, yodaAnswer, loadingAnswer } = useSendMessage(
    accessToken,
    chatBotUrl,
    sessionToken,
    userMessage
  );
  const [chat, setChat] = useState([]);
  const sendMessage = () => {
    setChat((list) => [...list, userMessage]);
    getAnswer();
    setChat((list) => [...list, yodaAnswer]);
  };

  return (
    <div className="Chatbox">
      <p>{loadingAnswer ? "writing ..." : ""}</p>
      <div className="Chat-container">
        {chat.map((m, i) => (
          <div key={i}>{m}</div>
        ))}
      </div>
      <input type="text" onChange={(e) => setUserMessage(e.target.value)} />
      <button onClick={sendMessage}>SEND MESSAGE</button>
    </div>
  );
};

export default Chatbox;
