import { useState, useEffect } from "react";

interface ChatBarProps {
  onTextChange: (newQuestion: string) => void;
  resetTrigger: boolean;
  sendRequest: () => void;
}

const ChatBar = (props: ChatBarProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    props.onTextChange(newValue); // Update currentQuestion on each change
  };

  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      // Call sendRequest prop directly
      props.sendRequest();
      setInputValue(""); // Ensure the input is cleared
    }
  };

  useEffect(() => {
    // Reset input value when resetTrigger changes
    setInputValue("");
  }, [props.resetTrigger]);

  return (
    <input
      type="text"
      placeholder="Ask"
      className="w-full rounded-lg bg-[#FFFFFF] p-2"
      title="Enter Your Query Here"
      value={inputValue}
      onChange={handleInputChange}
      onKeyPress={handleEnterKeyPress}
    />
  );
};

export default ChatBar;
