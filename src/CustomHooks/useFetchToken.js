import { useState, useEffect } from "react";
import axios from "axios";

const useFetchToken = () => {
  const [accessToken, setAccessToken] = useState();
  const [chatBotUrl, setChatBotUrl] = useState();
  const [loadingApp, setLoadingApp] = useState(false);

  const getToken = async () => {
    try {
      const res = await axios.post("http://localhost:4000/yodabot/auth");
      setAccessToken(res.data.accessToken);
      setChatBotUrl(res.data.apis.chatbot);
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingApp(false);
    }
  };

  useEffect(() => {
    setLoadingApp(true);
    if (!accessToken) getToken();
  }, []);

  return { accessToken, chatBotUrl, loadingApp };
};

export default useFetchToken;
