import { useState } from "react";
import axios from "axios";

const useSendMessage = (accessToken, chatBotUrl, sessionToken, userMessage) => {
  const [yodaAnswer, setYodaAnswer] = useState();
  const [loadingAnswer, setLoadingAnswer] = useState(false);

  const getAnswer = async () => {
    setLoadingAnswer(true);
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
      const answer = res.data[0].message;
      setYodaAnswer(answer.replace(/(<([^>]+)>)/gi, ""));
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingAnswer(false);
    }
  };
  //console.log(yodaAnswer);
  return { getAnswer, yodaAnswer, loadingAnswer };
};

export default useSendMessage;
