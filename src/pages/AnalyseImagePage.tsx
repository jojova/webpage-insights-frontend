import React from "react";
import { FaArrowRight } from "react-icons/fa6";

const AnalyseImagePage = () => {
  return (
    <div className="w-full bg-[#F0F0F0] p-4">
      {/* Webpage URL */}
      <div className="black-box mb-4">
        <a
          href="your-webpage-url"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Your Webpage URL
        </a>
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
        <div className="flex w-full gap-x-2">
          {/* WebPage Link Input Field */}
          <input
            type="text"
            className="w-full border-2 border-[#000000] bg-transparent p-2"
            placeholder="WebPage Link"
          />
          {/* Arrow Button */}
          <div className="flex w-fit cursor-pointer items-center justify-center rounded-lg bg-[#0B606D] px-4 py-1">
            <FaArrowRight className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyseImagePage;
