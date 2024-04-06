import { useState } from "react";
import video from "../assets/transcribe-video.png";
import ChatComponent from "../components/ChatComponent";
import ChatBar from "../components/ChatBar";
import { FaArrowRight } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const TranscribeVideoPage = () => {
  const [isTranscriptionVisible, setIsTranscriptionVisible] =
    useState<boolean>(true);

  const [isSummaryVisible, setIsSummaryVisible] = useState<boolean>(true);

  return (
    <div className="flex h-screen w-full flex-col justify-between overflow-x-hidden bg-[#F0F0F0]">
      {/* Transcribe Video Heading and Thumbnail */}
      <div className="m-4 flex flex-col gap-y-2">
        <h2 className="font-semibold">Transcribe Video</h2>
        <div className="flex h-fit w-fit cursor-pointer items-center justify-center rounded-lg bg-[#FFFFFF] p-[64px]">
          <img src={video} alt="" className="h-[32px] w-[32px]" />
        </div>
      </div>

      {/* Transcription */}
      <div className="m-4 flex flex-col gap-y-2">
        <div
          className="flex cursor-pointer items-center justify-between"
          onClick={() => setIsTranscriptionVisible(!isTranscriptionVisible)}
        >
          <h2 className="font-semibold">Transcription</h2>
          {isTranscriptionVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
        <h2
          className={`text-justify ${isTranscriptionVisible ? "" : "hidden"}`}
        >
          This passage provides a brief biography of Steven Paul Jobs,
          highlighting key aspects of his life and contributions to the
          technology industry. Born in 1955, Jobs co-founded Apple Inc.
          alongside Steve Wozniak, playing a pivotal role in the personal
          computer revolution of the 1970s and 1980s.{" "}
        </h2>
      </div>

      {/* Summary */}
      <div className="m-4 flex flex-col gap-y-2">
        <div
          className="flex cursor-pointer items-center justify-between"
          onClick={() => setIsSummaryVisible(!isSummaryVisible)}
        >
          <h2 className="font-semibold">Summary</h2>
          {isSummaryVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
        <h2 className={`text-justify ${isSummaryVisible ? "" : "hidden"}`}>
          This passage provides a brief biography of Steven Paul Jobs,
          highlighting key aspects of his life and contributions to the
          technology industry. Born in 1955, Jobs co-founded Apple Inc.
          alongside Steve Wozniak, playing a pivotal role in the personal
          computer revolution of the 1970s and 1980s.{" "}
        </h2>
      </div>

      <div className="m-2">
        <hr className="my-8 h-px border-0 bg-[#BEBEBE]" />
      </div>

      {/* Chat */}
      <ChatComponent />

      {/* Chatbar */}
      <div className="m-4 flex gap-x-2 py-2">
        <ChatBar />
        <div className="flex w-fit cursor-pointer items-center justify-center rounded-lg bg-[#0A5463] px-3 py-1">
          <FaArrowRight className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default TranscribeVideoPage;
