import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import RightArrowButton from "../components/RightArrowButton";
// import ChatComponent from "../components/ChatComponent";
import ChatBar from "../components/ChatBar";
import TextBox from "../components/TextBox"; // Import the TextBox component

const CSVAnalysisPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [query, setQuery] = useState<string>(""); // State for user input query
  const [responseText, setResponseText] = useState<string>(""); // State for response text

  const handleSubmit = async () => {
    try {
      if (!selectedFile) {
        console.error("No file selected");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post<{ response: string }>( // Specify the response type
      `http://localhost:8000/csv/query/?query=${encodeURIComponent(query)}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    
    setResponseText(response.data.response); // Access the response property
    
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

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div className="flex h-screen w-full flex-col justify-between overflow-x-hidden bg-[#F0F0F0]">
      <div className="m-4 rounded-lg bg-[#DCDDDE] py-2 text-center font-medium text-[#62646B]">
        Uploaded CSV File Name
      </div>
            {/* Display the response using TextBox component */}
            <div className="m-4 flex flex-col gap-y-4">
      <h2 className="font-bold">Chat</h2>
      <TextBox text={responseText} isSender={false} />
      </div>

      <div className="m-4 flex gap-x-2 py-2">
        <div onClick={handleSubmit}>
          <RightArrowButton />
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
        <ChatBar value={query} onChange={handleQueryChange} />
      </div>


    </div>
  );
};

export default CSVAnalysisPage;
