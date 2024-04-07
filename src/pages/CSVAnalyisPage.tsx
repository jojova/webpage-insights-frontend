import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import { FaArrowRight, FaFileCsv, FaFileCircleCheck } from "react-icons/fa6";
import ChatBar from "../components/ChatBar";
import TextBox from "../components/TextBox";

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
    if (!selectedFile || !currentQuery.trim()) {
      console.error("No file selected or query entered");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    // Construct the query string
    const queryString = encodeURIComponent(currentQuery.trim());

    try {
      const response = await axios.post(
        `http://localhost:8000/csv/chart/?query=${queryString}`,
        formData, // Now only includes the file
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      const serverResponse = response.data.response;
      setHistory((prevHistory) => [
        ...prevHistory,
        { text: currentQuery, isSender: true },
        { text: serverResponse, isSender: false },
      ]);

      setCurrentQuery("");
      setResetInputTrigger((prev) => !prev);
    } catch (error) {
      // Updated error handling for TypeScript types
      if (axios.isAxiosError(error)) {
        console.error(
          "Error fetching response:",
          error.response?.data || error.message,
        );
      } else {
        console.error("An unexpected error occurred:", error);
      }
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
        {history.map((message, index) => (
          <TextBox
            key={index}
            text={message.text}
            isSender={message.isSender}
          />
        ))}
      </div>

      <div className="m-4 flex gap-x-2 py-2">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <div
          onClick={() => document.getElementById("fileInput")?.click()}
          title={
            selectedFile ? `Uploaded '${selectedFile.name}'` : "Upload CSV File"
          }
          className={`flex h-full w-fit cursor-pointer items-center justify-center rounded-lg px-3 py-1 ${selectedFile ? "bg-[#CEEBF1]" : "bg-[#0A5463]"}`}
        >
          {selectedFile ? (
            <FaFileCircleCheck className="text-[#0A5463]" />
          ) : (
            <FaFileCsv className="text-white" />
          )}
        </div>

        <ChatBar
          onTextChange={handleQueryChange}
          resetTrigger={resetInputTrigger}
          sendRequest={sendRequest}
        />

        <div onClick={sendRequest}>
          <div
            title="Send Request"
            className="flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-[#0A5463] px-3 py-1"
          >
            <FaArrowRight className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSVAnalysisPage;
