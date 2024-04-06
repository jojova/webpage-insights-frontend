import React, { ChangeEvent } from "react";

interface ChatBarProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ChatBar: React.FC<ChatBarProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Ask"
      className="w-full rounded-lg bg-[#FFFFFF] p-2"
    />
  );
};

export default ChatBar;
