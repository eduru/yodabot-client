import React, { useState } from "react";
import useSendMessage from "../CustomHooks/useSendMessage";
import useSwapi from "../CustomHooks/useSwapi";

const Chatbox = ({ accessToken, chatBotUrl, sessionToken, loadingSession }) => {
  const [userMessage, setUserMessage] = useState("");
  const { characters, films } = useSwapi();
  const { getAnswer, yodaAnswer, loadingAnswer } = useSendMessage(
    accessToken,
    chatBotUrl,
    sessionToken,
    userMessage
  );
  const [chat, setChat] = useState([]);
  const [count, setCount] = useState(0);

  function detectWord(word, str) {
    return RegExp("\\b" + word + "\\b").test(str.toLowerCase());
  }

  const sendMessage = () => {
    if (detectWord("force", userMessage)) {
      const str = `This is a list of Star Wars movies:`;
      const movies = films.join(",");
      setChat((list) => [...list, userMessage]);
      return setChat((list) => [...list, str + movies]);
    }
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
