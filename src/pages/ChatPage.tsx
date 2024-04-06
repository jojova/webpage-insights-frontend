import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { AiOutlinePieChart } from "react-icons/ai";
import ChatBar from "../components/ChatBar";
import TextBox from "../components/TextBox";
import "./ChatPage.css";

interface ChatPageProps {
  webpageURL: string;
}

interface Message {
  text: string;
  isSender: boolean;
}

const ChatPage: React.FC<ChatPageProps> = ({ webpageURL }) => {
  const [history, setHistory] = useState<Message[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [resetInputTrigger, setResetInputTrigger] = useState(false);

  const sendRequest = (question = currentQuestion) => {
    console.log("Request initiated ==>> ", question);
    // Only send request if question is not empty
    if (!question) return;

    // Make the request to fetch the response
    fetch("http://127.0.0.1:8000/webchat/query/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: webpageURL,
        question: question,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the history with the new question and response
        setHistory((prevHistory) => [
          ...prevHistory,
          { text: question, isSender: true },
          { text: data.response.result, isSender: false },
        ]);
        setCurrentQuestion(""); // Clear the current question after sending request
        setResetInputTrigger((prev) => !prev);
        console.log("Response ==>> ", data);
        console.log("History ==>> ", history);
      })
      .catch((error) => console.error("Error fetching response:", error));
  };

  const handleQuestionChange = (newQuestion: string) => {
    setCurrentQuestion(newQuestion);
  };

  useEffect(() => {
    return () => {
      setHistory([]);
      setCurrentQuestion("");
    };
  }, [webpageURL]);

  return (
    <div className="flex h-screen w-full flex-col justify-between overflow-x-hidden bg-[#F0F0F0] p-4">
      {/* Webpage URL */}
      <div className="m-4 rounded-lg bg-[#DCDDDE] py-2 text-center font-medium text-[#62646B]">
        {webpageURL ? webpageURL : "No WebPage Link Found"}
      </div>
      {/* Summary Section */}
      <div className="mb-4">
        <h2 className="mb-2 text-xl font-semibold">Summary</h2>
        <p>Your summary text goes here...</p>
      </div>
      <h2 className="mb-2 text-xl font-semibold">Chat</h2>
      <div className="m-4 flex flex-col gap-y-4">
        {/* Displaying history of questions and responses */}
        {history.map((message, index) => (
          <TextBox
            key={index}
            text={message.text}
            isSender={message.isSender}
          />
        ))}
      </div>
      {/* Chat Section */}
      <div>
        <div className="py-100 m-3 flex gap-x-2">
          <ChatBar
            resetTrigger={resetInputTrigger}
            onTextChange={handleQuestionChange}
            sendRequest={() => sendRequest()}
          />
          <div
            onClick={() => sendRequest()}
            className="flex w-fit cursor-pointer items-center justify-center rounded-lg bg-[#0A5463] px-3 py-1"
          >
            <FaArrowRight className="text-white" />
          </div>
          <div className="flex w-fit cursor-pointer items-center justify-center rounded-lg border-2 border-[#0A5463] bg-[#CEEBF1] px-2 py-1">
            <AiOutlinePieChart className="h-[24px] w-[24px] text-[#0A5463]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
