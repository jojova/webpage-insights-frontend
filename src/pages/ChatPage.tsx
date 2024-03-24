import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import './ChatPage.css';

const ChatPage = () => {
  return (
    <div className="w-full bg-[#F0F0F0] p-4">
      {/* Webpage URL */}
      <div className="mb-4 black-box">
        <a href="your-webpage-url" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          Your Webpage URL
        </a>
      </div>

      {/* Summary Section */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Summary</h2>
        <p>Your summary text goes here...</p>
      </div>

      {/* Recommendation Section */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Recommendations</h2>
        <div className="flex flex-wrap gap-4">
          {/* Recommendation Boxes */}
          <div className="w-1/2 md:w-1/3 lg:w-1/4 bg-white p-4 shadow rounded">
            Steve - wiki
            www.wikipedia.com
          </div>
          <div className="w-1/2 md:w-1/3 lg:w-1/4 bg-white p-4 shadow rounded">
            Steve - wiki
            www.wikipedia.com
          </div>
          {/* Add more recommendation boxes as needed */}
        </div>
      </div>

      {/* Chat Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Chat</h2>
        <div className="chat-box">
          {/* Chat messages */}
          <div className="chat-message">User: Hi there!</div>
          <div className="chat-message chat-reply">Bot: Hello! How can I assist you today?</div>
          {/* Add more chat messages as needed */}
        </div>

        {/* Chat input */}
        <div className="flex w-full gap-x-2">
          {/* WebPage Link Input Field */}
          <input
            type="text"
            className="w-full border-2 border-[#000000] bg-transparent p-2"
            placeholder="WebPage Link"
          />
          {/* Arrow Button */}
          <div className="flex w-fit cursor-pointer items-center justify-center rounded-lg bg-[#0B606D] px-4 py-1">
            <FaArrowRight className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
