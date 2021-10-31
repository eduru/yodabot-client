import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import useFetchToken from "./CustomHooks/useFetchToken";
import useFetchSession from "./CustomHooks/useFetchSession";

function App() {
  const { accessToken, chatBotUrl, loadingApp } = useFetchToken();
  const { getSessionToken, sessionToken } = useFetchSession(
    accessToken,
    chatBotUrl
  );
  const [userMessage, setUserMessage] = useState("");
  const [yodaAnswer, setYodaAnswer] = useState("");
  const [chat, setChat] = useState([]);

  //send a message to the chatbot and get the answer
  const getAnswer = async () => {
    setChat([...chat, userMessage]);
    try {
      const res = await axios.post(
        "http://localhost:4000/yodabot/conversation/message",
        {
          token: `Bearer ${accessToken}`,
          baseUrl: chatBotUrl,
          sessionToken: `Bearer ${sessionToken}`,
          message: userMessage,
        }
      );
      setYodaAnswer(res.data[0].message);
      setChat([...chat, yodaAnswer]);
    } catch (e) {
      console.log(e);
    }
  };
  if (loadingApp) return <h1>LOADING...</h1>;
  return (
    <div className="App">
      <header className="App-header">
        <h1>Yodabot!</h1>
        <h2>Token:{accessToken ? accessToken : ""}</h2>
        <p>{sessionToken ? sessionToken : ""}</p>
        <p>User: {userMessage}</p>
        <div>
          {chat.map((m, i) => (
            <p key={i}>{m}</p>
          ))}
        </div>
        <input type="text" onChange={(e) => setUserMessage(e.target.value)} />
        <button onClick={getSessionToken}>Get session id!</button>
        <button onClick={getAnswer}>Send message!</button>
      </header>
    </div>
  );
}

export default App;
