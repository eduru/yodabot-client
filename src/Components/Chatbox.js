import React, { useEffect, useState } from "react";
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
      const str = `This is a list of Star Wars movies: `;
      const movies = films.join(",");
      setChat((list) => [...list, userMessage]);
      return setChat((list) => [...list, str + movies]);
    }
    setChat((list) => [...list, `You: ${userMessage}.`]);
    getAnswer();

    // if (detectWord("sorry", yodaAnswer)) {
    //   const str = `This is a list of Star Wars characters:`;
    //   const people = characters.join(",");
    //   setChat((list) => [...list, userMessage]);
    //   return setChat((list) => [...list, str + people]);
    // }
    if (yodaAnswer === undefined) {
      return setChat((list) => [
        ...list,
        "Yoda: Always pass on what you have learned. What would you like to know?",
      ]);
    }
    setChat((list) => [...list, `Yoda: ${yodaAnswer}`]);
  };

  useEffect(() => {
    const chatHistory = window.localStorage.getItem("chat-history");
    setChat((list) => [...list, ...JSON.parse(chatHistory)]);
    console.log(JSON.parse(chatHistory));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("chat-history", JSON.stringify(chat));
  });

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
        <button onClick={sendMessage}>SEND</button>
      </div>
    </div>
  );
};

export default Chatbox;
