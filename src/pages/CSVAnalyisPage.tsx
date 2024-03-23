import RightArrowButton from "../components/RightArrowButton";
import ChatBar from "../components/ChatBar";
import ChatComponent from "../components/ChatComponent";
import { AiOutlinePieChart } from "react-icons/ai";

const CSVAnalyisPage = () => {
  return (
    <div className="flex h-screen w-full flex-col justify-between overflow-x-hidden bg-[#F0F0F0]">
      {/* CSV File Name Header */}
      <div className="m-4 rounded-lg bg-[#DCDDDE] py-2 text-center font-medium text-[#62646B]">
        Uploaded CSV File Name
      </div>

      {/* Chat Section */}
      <ChatComponent />

      {/* Chatbar */}
      <div className="m-4 flex gap-x-2 py-2">
        <ChatBar />
        <RightArrowButton />
        <div className="flex w-fit cursor-pointer items-center justify-center rounded-lg border-2 border-[#0A5463] bg-[#CEEBF1] px-2 py-1">
          <AiOutlinePieChart className="h-[24px] w-[24px] text-[#0A5463]" />
        </div>
      </div>
    </div>
  );
};

export default CSVAnalyisPage;
