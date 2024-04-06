import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa6";
import ChatBar from "../components/ChatBar";
import TextBox from "../components/TextBox"; // Import the TextBox component

interface Message {
  text: string;
  isSender: boolean;
}

const CSVAnalysisPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [history, setHistory] = useState<Message[]>([]);
  const [currentQuery, setCurrentQuery] = useState("");
  const [resetInputTrigger, setResetInputTrigger] = useState(false);

  const sendRequest = async () => {
    // Check if both a file is selected and a query is entered
    if (!selectedFile || !currentQuery) {
      console.error("No file selected or query entered");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    // Assuming your backend expects the query as part of the formData
    formData.append("query", currentQuery);

    try {
      const response = await axios.post(
        "http://localhost:8000/csv/query/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      // Assuming response.data contains the answer to the query
      const serverResponse = response.data.response;

      // Update the chat history with the query and the response
      setHistory((prevHistory) => [
        ...prevHistory,
        { text: currentQuery, isSender: true },
        { text: serverResponse, isSender: false },
      ]);

      // Clear the current query and reset input trigger for ChatBar component
      setCurrentQuery("");
      setResetInputTrigger((prev) => !prev);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleQueryChange = (newQuery: string) => {
    setCurrentQuery(newQuery);
  };

  return (
    <div className="flex h-screen w-full flex-col justify-between overflow-x-hidden bg-[#F0F0F0]">
      <div className="m-4 rounded-lg bg-[#DCDDDE] py-2 text-center font-medium text-[#62646B]">
        {selectedFile ? selectedFile.name : "No File Selected"}
      </div>

      <h2 className="mb-2 text-xl font-semibold">Chat</h2>
      <div className="m-4 flex flex-col gap-y-4">
        {/* Displaying history of queries and responses */}
        {history.map((message, index) => (
          <TextBox
            key={index}
            text={message.text}
            isSender={message.isSender}
          />
        ))}
      </div>

      <div className="m-4 flex gap-x-2 py-2">
        <div onClick={sendRequest}>
          <div className="flex w-fit cursor-pointer items-center justify-center rounded-lg bg-[#0A5463] px-3 py-1">
            <FaArrowRight className="text-white" />
          </div>
        </div>

        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <label htmlFor="fileInput" className="cursor-pointer">
          Select CSV File
        </label>

        {/* ChatBar component */}
        <ChatBar
          onTextChange={handleQueryChange}
          resetTrigger={resetInputTrigger}
          sendRequest={() => sendRequest()}
        />
      </div>
    </div>
  );
};

export default CSVAnalysisPage;
