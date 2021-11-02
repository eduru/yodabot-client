import { useState } from "react";
import axios from "axios";

const useSendMessage = (accessToken, chatBotUrl, sessionToken, userMessage) => {
  const [yodaAnswer, setYodaAnswer] = useState();
  const [loadingAnswer, setLoadingAnswer] = useState(false);

  const getAnswer = async () => {
    setLoadingAnswer(true);
    try {
      const res = await axios.post(
        "https://yodabot-server-prod.herokuapp.com/yodabot/conversation/message",
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
  return { getAnswer, yodaAnswer, loadingAnswer };
};

export default useSendMessage;
