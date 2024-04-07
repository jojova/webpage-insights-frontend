import ChatBar from "../components/ChatBar";
import { FaArrowRight } from "react-icons/fa6";
import { GiMagicBroom } from "react-icons/gi";

const AnalyseImagePage = () => {
  return (
    <div className="flex w-full flex-col justify-between bg-[#F0F0F0] p-4">
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
        <div className="py-100 m-3 flex gap-x-2">
          <ChatBar />
          <div className="flex w-fit cursor-pointer items-center justify-center rounded-lg bg-[#0A5463] px-3 py-1">
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

export default AnalyseImagePage;
