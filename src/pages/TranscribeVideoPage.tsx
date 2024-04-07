import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { AiOutlinePieChart } from "react-icons/ai";
import ChatBar from "../components/ChatBar";
import TextBox from "../components/TextBox";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface TranscribeVideoPageProps {
  videoURL: string;
  transcriptionData: string;
  summaryData: string;
  // Add the webpageURL prop for chat context
  webpageURL: string;
}

interface Message {
  text: string;
  isSender: boolean;
}

const TranscribeVideoPage: React.FC<TranscribeVideoPageProps> = (props) => {
  const [isTranscriptionVisible, setIsTranscriptionVisible] = useState(true);
  const [isSummaryVisible, setIsSummaryVisible] = useState(true);
  const [history, setHistory] = useState<Message[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [resetInputTrigger, setResetInputTrigger] = useState(false);
  const videoID = props.videoURL.split("=")[1];
  const sendRequest = (question = currentQuestion) => {
    console.log("Request initiated ==>> ", question);
    // Only send request if question is not empty
    if (!question) return;
  
    // Make the request to fetch the response
    fetch("http://127.0.0.1:8000/summarize/query/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: question,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Check if data.response.result is available
        const result = data.response && data.response.result ? data.response.result : "No result found";
        
        // Update the history with the new question and response
        setHistory((prevHistory) => [
          ...prevHistory,
          { text: question, isSender: true },
          { text: result, isSender: false },
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
  }, [props.webpageURL]);

  return (
    <div className="flex h-screen w-full flex-col justify-between overflow-x-hidden bg-[#F0F0F0]">
      {/* Transcribe Video Heading and Thumbnail */}
      <div className="m-4 flex flex-col gap-y-2">
        <h2 className="font-semibold">Transcribe Video</h2>
        <div className="flex h-fit w-fit cursor-pointer items-center justify-center self-center rounded-lg bg-[#FFFFFF]">
          <img
            src={`http://img.youtube.com/vi/${videoID}/0.jpg`}
            alt="Thumbnail"
            className=""
          />
        </div>
      </div>

      {/* Summary */}
      <div className="m-4 flex flex-col gap-y-2">
        <div
          className="flex cursor-pointer items-center justify-between"
          onClick={() => setIsSummaryVisible(!isSummaryVisible)}
        >
          <h2 className="font-semibold">Summary</h2>
          {isSummaryVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
        <p className={`text-justify ${isSummaryVisible ? "" : "hidden"}`}>
          {props.summaryData || "Loading summary..."}
        </p>
      </div>

      {/* Transcription */}
      <div className="m-4 flex flex-col gap-y-2">
        <div
          className="flex cursor-pointer items-center justify-between"
          onClick={() => setIsTranscriptionVisible(!isTranscriptionVisible)}
        >
          <h2 className="font-semibold">Transcription</h2>
          {isTranscriptionVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
        <p className={`text-justify ${isTranscriptionVisible ? "" : "hidden"}`}>
          {props.transcriptionData || "Loading transcription..."}
        </p>
      </div>

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
        <div className="py-3 m-3 flex gap-x-2">
          <ChatBar
            resetTrigger={resetInputTrigger}
            onTextChange={handleQuestionChange}
            sendRequest={sendRequest} // Pass the sendRequest function directly
          />
<div
  onClick={() => sendRequest()} // Call sendRequest directly
  className="flex w-fit cursor-pointer items-center justify-center rounded-lg bg-[#0A5463] px-3 py-1"
>
            <FaArrowRight  className="text-white" />
          </div>
          <div className="flex w-fit cursor-pointer items-center justify-center rounded-lg border-2 border-[#0A5463] bg-[#CEEBF1] px-2 py-1">
            <AiOutlinePieChart className="h-[24px] w-[24px] text-[#0A5463]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranscribeVideoPage;
