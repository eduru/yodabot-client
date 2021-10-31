import { useState } from "react";
import axios from "axios";

const useFetchSession = (token, baseUrl) => {
  const [sessionToken, setSessionToken] = useState();
  const [loadingSession, setLoadingSession] = useState(false);
  const getSessionToken = async () => {
    setLoadingSession(true);
    try {
      const res = await axios.post(
        "http://localhost:4000/yodabot/conversation",
        {
          token: `Bearer ${token}`,
          baseUrl: baseUrl,
        }
      );
      setSessionToken(res.data.sessionToken);
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingSession(false);
    }
  };

  return { getSessionToken, sessionToken, loadingSession };
};

export default useFetchSession;
