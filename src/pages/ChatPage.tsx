import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { GiMagicBroom } from "react-icons/gi";
import ChatBar from "../components/ChatBar";
import TextBox from "../components/TextBox";
import "./ChatPage.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface ChatPageProps {
  webpageURL: string;
  summaryData: string;
}

interface Message {
  text: string;
  isSender: boolean;
}

const ChatPage: React.FC<ChatPageProps> = (props: ChatPageProps) => {
  const [history, setHistory] = useState<Message[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [resetInputTrigger, setResetInputTrigger] = useState(false);
  const [isSummaryVisible, setIsSummaryVisible] = useState(true);

  const sendRequest = (question = currentQuestion) => {
    // Only send request if question is not empty
    if (question === null || question.trim() === "") return;

    // Make the request to fetch the response
    fetch("http://127.0.0.1:8000/webchat/query/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: props.webpageURL,
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
  }, [props.webpageURL]);

  return (
    <div className="flex h-screen w-full flex-col justify-between overflow-x-hidden bg-[#F0F0F0] p-4">
      {/* Webpage URL */}
      <div className="m-4 rounded-lg bg-[#DCDDDE] py-2 text-center font-medium text-[#62646B]">
        {props.webpageURL ? props.webpageURL : "No WebPage Link Found"}
      </div>

      {/* Summary Section */}
      <div className="items-around mb-4 flex flex-col justify-center gap-y-2 rounded-lg bg-[#DCDDDE] px-2 py-1">
        <div
          className="flex cursor-pointer items-center justify-between"
          onClick={() => setIsSummaryVisible(!isSummaryVisible)}
        >
          <h2 className="mb-2 font-semibold">Summary</h2>
          {isSummaryVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
        <p className={`text-justify ${isSummaryVisible ? "" : "hidden"}`}>
          {props.summaryData}
        </p>
      </div>

      <h2 className="mb-2 font-semibold">Chat</h2>
      <div className={`flex flex-col gap-y-4 rounded-lg p-2`}>
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
            title="Send Request"
            className="flex w-fit cursor-pointer items-center justify-center rounded-lg bg-[#0A5463] px-3 py-1"
          >
            <FaArrowRight className="text-white" />
          </div>
          <div
            title="Clear Context"
            className="flex w-fit cursor-pointer items-center justify-center rounded-lg border-2 border-[#0A5463] bg-[#CEEBF1] p-2"
          >
            <GiMagicBroom className="h-[24px] w-[24px] text-[#0A5463]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
