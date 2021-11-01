import { useState } from "react";

const useChatMessage = ({
  userMessage,
  getAnswer,
  yodaAnswer,
  films,
  characters,
  accessToken,
  sessionToken,
}) => {
  const [chat, setChat] = useState([]);

  function detectWord(word, str) {
    return RegExp("\\b" + word + "\\b").test(str.toLowerCase());
  }
  const sendMessage = () => {
    // if (detectWord("force", userMessage)) {
    //   const str = `This is a list of Star Wars movies:`;
    //   const movies = films.join(",");
    //   setChat((list) => [...list, userMessage]);
    //   return setChat((list) => [...list, str + movies]);
    // }
    setChat((list) => [...list, `You: ${userMessage}`]);
    getAnswer(accessToken, sessionToken);
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
  return { sendMessage, chat };
};

export default useChatMessage;
