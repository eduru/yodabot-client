import React, { useState } from "react";
import Chatbox from "./Chatbox";
import useFetchSession from "../CustomHooks/useFetchSession";

const OpenChat = ({ accessToken, chatBotUrl }) => {
  const [toggleChat, setToggleChat] = useState(false);
  const { sessionToken, loadingSession } = useFetchSession(
    accessToken,
    chatBotUrl,
    toggleChat
  );

  if (!toggleChat) {
    return (
      <div>
        <button
          onClick={() => {
            setToggleChat(!toggleChat);
          }}
        >
          Open Chat
        </button>
      </div>
    );
  } else {
    if (loadingSession) return <p>Loading...</p>;
    return (
      <div>
        <Chatbox
          accessToken={accessToken}
          chatBotUrl={chatBotUrl}
          sessionToken={sessionToken}
          loadingSession={loadingSession}
        />
      </div>
    );
  }
};

export default OpenChat;
