import React, { useState } from "react";
import useSendMessage from "../CustomHooks/useSendMessage";
import useSwapi from "../CustomHooks/useSwapi";
import ScrollToBottom from "react-scroll-to-bottom";

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
    setChat((list) => [...list, `You: ${userMessage}`]);
    getAnswer();
    setChat((list) => [...list, `Yoda: ${yodaAnswer}`]);
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>{loadingAnswer ? "writing ..." : "Yoda Chat"}</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {chat.map((message, i) => (
            <div className="message" key={i}>
              <div className="message-content">{message}</div>
            </div>
          ))}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input type="text" onChange={(e) => setUserMessage(e.target.value)} />
        <button onClick={sendMessage}>SEND </button>
      </div>
    </div>
  );
};

export default Chatbox;
