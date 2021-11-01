import React, { useState } from "react";
import useSendMessage from "../CustomHooks/useSendMessage";

const Chatbox = ({ accessToken, chatBotUrl, sessionToken, loadingSession }) => {
  const [userMessage, setUserMessage] = useState("");
  const { getAnswer, yodaAnswer, loadingAnswer } = useSendMessage(
    accessToken,
    chatBotUrl,
    sessionToken
  );
  const [chat, setChat] = useState([]);
  const sendMessage = async () => {
    setChat((list) => [...list, userMessage]);
    await getAnswer();
    setChat((list) => [...list, yodaAnswer]);
  };
  return (
    <div className="Chatbox">
      <div className="Chat-container">
        {chat.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
      </div>
      <input type="text" onChange={(e) => setUserMessage(e.target.value)} />
      <button onClick={sendMessage}>TEST SEND MESSAGE</button>
    </div>
  );
};

export default Chatbox;
