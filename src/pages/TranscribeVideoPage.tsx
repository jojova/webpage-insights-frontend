import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { GiMagicBroom } from "react-icons/gi";
import ChatBar from "../components/ChatBar";
import TextBox from "../components/TextBox";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface TranscribeVideoPageProps {
  videoURL: string;
  transcriptionData: string;
  summaryData: string;
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

  const sendRequest = async () => {
    if (!currentQuestion.trim()) return; // Prevent sending empty questions

    const url = new URL("http://localhost:8000/summarize/query/");
    url.searchParams.append("query", currentQuestion);
    url.searchParams.append("paragraph", props.transcriptionData);

    try {
      const response = await fetch(url.toString(), {
        method: "POST", // Using POST as specified
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data); // For debugging

      // Add the current question to the history
      setHistory((prev) => [
        ...prev,
        { text: currentQuestion, isSender: true },
      ]);
      // Add the received response to the history
      setHistory((prev) => [
        ...prev,
        { text: data.response.result, isSender: false },
      ]);

      // Optionally, reset the current question and input field
      setCurrentQuestion("");
      setResetInputTrigger((prev) => !prev); // Toggle to trigger reset in child component
    } catch (error) {
      console.error("Failed to send request:", error);
      // Handle error by displaying it in the chat, or another appropriate action
      setHistory((prev) => [
        ...prev,
        { text: "Error fetching the response.", isSender: false },
      ]);
    }
  };

  const handleQuestionChange = (newQuestion: string) => {
    setCurrentQuestion(newQuestion);
  };

  useEffect(() => {
    return () => {
      setHistory([]);
      setCurrentQuestion("");
    };
  }, [props.videoURL]);

  return (
    <div className="flex h-screen w-full flex-col justify-between overflow-x-hidden bg-[#F0F0F0] p-4">
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
      <div className="items-around m-4 flex flex-col justify-center gap-y-2 rounded-lg bg-[#DCDDDE] px-2 py-1">
        <div
          className="flex cursor-pointer items-center justify-between"
          onClick={() => setIsSummaryVisible(!isSummaryVisible)}
        >
          <h2 className="font-semibold">Summary</h2>
          {isSummaryVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
        <p className={`text-justify ${isSummaryVisible ? "" : "hidden"}`}>
          {props.summaryData || ""}
        </p>
      </div>

      {/* Transcription */}
      <div className="items-around m-4 flex flex-col justify-center gap-y-2 rounded-lg bg-[#DCDDDE] px-2 py-1">
        <div
          className="flex cursor-pointer items-center justify-between"
          onClick={() => setIsTranscriptionVisible(!isTranscriptionVisible)}
        >
          <h2 className="font-semibold">Transcription</h2>
          {isTranscriptionVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
        <p className={`text-justify ${isTranscriptionVisible ? "" : "hidden"}`}>
          {props.transcriptionData || ""}
        </p>
      </div>

      <div className="m-4 flex flex-col gap-y-4">
        <h2 className="font-semibold">Chat</h2>
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
        <div className="m-3 flex gap-x-2">
          <ChatBar
            resetTrigger={resetInputTrigger}
            onTextChange={handleQuestionChange}
            sendRequest={sendRequest} // Pass the sendRequest function directly
          />
          <div
            onClick={() => sendRequest()} // Call sendRequest directly
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

export default TranscribeVideoPage;
