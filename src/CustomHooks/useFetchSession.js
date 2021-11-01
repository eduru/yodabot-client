/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";

const useFetchSession = (accessToken, chatBotUrl, toggleChat) => {
  const [sessionToken, setSessionToken] = useState();
  const [loadingSession, setLoadingSession] = useState(false);
  const getSessionToken = async (x, y) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/yodabot/conversation",
        {
          token: `Bearer ${x}`,
          baseUrl: y,
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
