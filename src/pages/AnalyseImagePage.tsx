import React from "react";
import ChatBar from "../components/ChatBar";
import RightArrowButton from "../components/RightArrowButton";
import { AiOutlinePieChart } from "react-icons/ai";

const AnalyseImagePage = () => {
  return (
    <div className="w-full bg-[#F0F0F0] p-4 flex flex-col justify-between">
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

          {/* Add more recommendation boxes as needed */}
        </div>
      </div>

      {/* Chat Section */}
      <div>
        <h2 className="mb-2 text-xl font-semibold">Analysis Image </h2>
        <p>
          This passage provides a brief biography of Steven Paul Jobs,
          highlighting key aspects of his life and contributions to the
          technology industry. Born in 1955, Jobs co-founded Apple Inc.
          alongside Steve Wozniak, playing a pivotal role in the personal
          computer revolution of the 1970s and 1980s.{" "}
        </p>
        <br></br>

        {/* Chat input */}
        <div className="m-3 flex gap-x-2 py-100">
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

export default AnalyseImagePage;
