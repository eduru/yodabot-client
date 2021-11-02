import { useState } from "react";
import useSwapi from "../CustomHooks/useSwapi";
import DetectWord from "../Helpers/DetectWord";
import useSendMessage from "../CustomHooks/useSendMessage";

const useChatConversation = ({
  accessToken,
  chatBotUrl,
  sessionToken,
  setInputValue,
  userMessage,
}) => {
  const { characters, films } = useSwapi();
  const [chat, setChat] = useState([]);
  const { getAnswer, yodaAnswer, loadingAnswer } = useSendMessage(
    accessToken,
    chatBotUrl,
    sessionToken,
    userMessage
  );

  const sendMessage = () => {
    // if (DetectWord("force", userMessage)) {
    //   const str = `This is a list of Star Wars movies: `;
    //   const movies = films.join(",");
    //   setChat((list) => [...list, userMessage]);
    //   return setChat((list) => [...list, str + movies]);
    // }
    setChat((list) => [...list, `You: ${userMessage}.`]);
    getAnswer();

    // if (DetectWord("sorry", yodaAnswer)) {
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
  return { sendMessage, chat, loadingAnswer };
};

export default useChatConversation;
