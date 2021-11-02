/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";

const useFetchSession = (accessToken, chatBotUrl, toggleChat) => {
  const [sessionToken, setSessionToken] = useState();
  const [loadingSession, setLoadingSession] = useState(false);
  const getSessionToken = async (token, url) => {
    try {
      const res = await axios.post(
        "https://yodabot-server-prod.herokuapp.com/yodabot/conversation",
        {
          token: `Bearer ${token}`,
          baseUrl: url,
        }
      );
      setSessionToken(res.data.sessionToken);
      console.log("SessionToken: ", sessionToken);
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingSession(false);
    }
  };
  useEffect(() => {
    setLoadingSession(true);
    getSessionToken(accessToken, chatBotUrl);
  }, [accessToken, toggleChat]);

  return { getSessionToken, sessionToken, loadingSession };
};

export default useFetchSession;
