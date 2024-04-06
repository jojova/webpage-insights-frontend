import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { AiOutlinePieChart } from "react-icons/ai";
import ChatBar from "../components/ChatBar";
import "./ChatPage.css";
import TextBox from "../components/TextBox";

interface ChatPageProps {
  webpageURL: string;
}

const ChatPage: React.FC<ChatPageProps> = ({ webpageURL }) => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("...");

  const sendRequest = () => {
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
        // Update the response state with the fetched result
        setResponse(data.response.result);
      })
      .catch((error) => console.error("Error fetching response:", error));
  };

  const handleQuestionChange = (newQuestion: string) => {
    setQuestion(newQuestion);
  };

  return (
    <div className="flex h-screen w-full flex-col justify-between overflow-x-hidden bg-[#F0F0F0] p-4">
      {/* Webpage URL */}
      <div className="m-4 rounded-lg bg-[#DCDDDE] py-2 text-center font-medium text-[#62646B]">
        {webpageURL}
      </div>

      {/* Summary Section */}
      <div className="mb-4">
        <h2 className="mb-2 text-xl font-semibold">Summary</h2>
        <p>Your summary text goes here...</p>
      </div>

      <div className="m-4 flex flex-col gap-y-4">
        <h2 className="font-bold">Chat</h2>
        <TextBox text={question} isSender={true} />
        <TextBox text={response} isSender={false} />
      </div>

      {/* Chat Section */}
      <div>
        <div className="py-100 m-3 flex gap-x-2">
          <ChatBar onTextChange={handleQuestionChange} />
          <div
            onClick={sendRequest} // Call sendRequest function when the button is clicked
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
