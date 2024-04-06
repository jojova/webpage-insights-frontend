import RightArrowButton from "../components/RightArrowButton";
import { AiOutlinePieChart } from "react-icons/ai";
import ChatBar from "../components/ChatBar";
import ChatComponent from "../components/ChatComponent";
import "./ChatPage.css";

const ChatPage = () => {
  return (
    <div className="flex h-screen w-full flex-col justify-between overflow-x-hidden bg-[#F0F0F0] p-4">
      {/* Webpage URL */}
      <div className="m-4 rounded-lg bg-[#DCDDDE] py-2 text-center font-medium text-[#62646B]">
        Webpage URL
      </div>

      {/* Summary Section */}
      <div className="mb-4">
        <h2 className="mb-2 text-xl font-semibold">Summary</h2>
        <p>Your summary text goes here...</p>
      </div>

      {/* Recommendation Section */}
      <div className="mb-4">
        <h2 className="mb-2 text-xl font-semibold">Recommendations</h2>
        <div className="flex flex-wrap gap-4">
          {/* Recommendation Boxes */}
          <div className="w-1/2 rounded bg-white p-4 shadow md:w-1/3 lg:w-1/4">
            Steve - wiki www.wikipedia.com
          </div>
          <div className="w-1/2 rounded bg-white p-4 shadow md:w-1/3 lg:w-1/4">
            Steve - wiki www.wikipedia.com
          </div>
          {/* Add more recommendation boxes as needed */}
        </div>
      </div>

      {/* Chat Section */}
      <div>
        <ChatComponent />
        <div className="py-100 m-3 flex gap-x-2">
          <ChatBar />
          <RightArrowButton />
          <div className="flex w-fit cursor-pointer items-center justify-center rounded-lg border-2 border-[#0A5463] bg-[#CEEBF1] px-2 py-1">
            <AiOutlinePieChart className="h-[24px] w-[24px] text-[#0A5463]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
