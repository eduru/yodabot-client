import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import useSwapi from "../CustomHooks/useSwapi";
import DetectWord from "../Helpers/DetectWord";
import useSendMessage from "../CustomHooks/useSendMessage";
import useHandleChange from "../CustomHooks/useHandleChange";

const Chatbox = ({ accessToken, chatBotUrl, sessionToken }) => {
  const { handleChange, inputValue, setInputValue, userMessage } =
    useHandleChange();
  const { characters, films } = useSwapi();
  const { getAnswer, yodaAnswer, loadingAnswer } = useSendMessage(
    accessToken,
    chatBotUrl,
    sessionToken,
    userMessage
  );
  const [chat, setChat] = useState([]);
  const [count, setCount] = useState(1);
  const sendMessage = () => {
    setInputValue("");
    if (DetectWord("force", userMessage)) {
      const str = `This is a list of Star Wars movies: `;
      const movies = films.join(",");
      setChat((list) => [...list, userMessage]);
      return setChat((list) => [...list, str + movies]);
    }
    setChat((list) => [...list, `You: ${userMessage}.`]);
    getAnswer();

    if (DetectWord("sorry", yodaAnswer)) {
      if (count === 2) {
        setCount(1);
        const str = `This is a list of Star Wars characters:`;
        const people = characters.join(",");
        setChat((list) => [...list, userMessage]);
        return setChat((list) => [...list, str + people]);
      }
      setCount(count + 1);
    }
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

  const sendToChat = () => {
    setInputValue("");
    sendMessage();
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
        <input type="text" value={inputValue} onChange={handleChange} />
        <button onClick={sendToChat}>SEND</button>
      </div>
      <button onClick={() => setChat([])}>New conversation</button>
    </div>
  );
};

export default Chatbox;
