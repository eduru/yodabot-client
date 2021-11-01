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
          message: "",
        }
      );
      setYodaAnswer(res.data[0].message);
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingAnswer(false);
    }
  };
  return { getAnswer, yodaAnswer, loadingAnswer };
};

export default useSendMessage;
