import React, { useState } from "react";
import video from "../assets/transcribe-video.png";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

interface TranscribeVideoPageProps {
  transcriptionData: string;
  summaryData: string;
}

const TranscribeVideoPage: React.FC<TranscribeVideoPageProps> = ({
  transcriptionData,
  summaryData,
}) => {
  const [isTranscriptionVisible, setIsTranscriptionVisible] = useState(true);

  return (
    <div className="flex h-screen w-full flex-col justify-between overflow-x-hidden bg-[#F0F0F0]">
      {/* Transcribe Video Heading and Thumbnail */}
      <div className="m-4 flex flex-col gap-y-2">
        <h2 className="font-semibold">Transcribe Video</h2>
        <div className="flex h-fit w-fit cursor-pointer items-center justify-center rounded-lg bg-[#FFFFFF] p-[64px]">
          <img src={video} alt="" className="h-[32px] w-[32px]" />
        </div>
      </div>

      {/* Summary */}
      <div className="m-4 flex flex-col gap-y-2">
        <h2 className="font-semibold">Summary</h2>
        <p className="text-justify">{summaryData || "Loading summary..."}</p>
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
          {transcriptionData || "Loading transcription..."}
        </h2>
      </div>

      {/* Add chat components here.. */}
    </div>
  );
};

export default TranscribeVideoPage;
