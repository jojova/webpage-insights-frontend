import { useState } from "react";

interface ChatBarProps {
  onTextChange: (newQuestion: string) => void;
}

const ChatBar = (props: ChatBarProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      // Call the function passed from the parent component to update the question state
      props.onTextChange(inputValue);
      setInputValue(""); // Clear the input after updating the question
    }
  };

  return (
    <input
      type="text"
      placeholder="Ask"
      className="w-full rounded-lg bg-[#FFFFFF] p-2"
      value={inputValue}
      onChange={handleInputChange}
      onKeyPress={handleEnterKeyPress}
    />
  );
};

export default ChatBar;
