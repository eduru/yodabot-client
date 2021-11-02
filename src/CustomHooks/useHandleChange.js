import { useState } from "react";

const useHandleChange = () => {
  const [userMessage, setUserMessage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const handleChange = (e) => {
    setInputValue(e.target.value);
    setUserMessage(e.target.value);
  };
  return { handleChange, inputValue, setInputValue, userMessage };
};

export default useHandleChange;
