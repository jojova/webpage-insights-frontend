import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

interface TranscribeVideoPageProps {
  videoURL: string;
  transcriptionData: string;
  summaryData: string;
}

const TranscribeVideoPage = (props: TranscribeVideoPageProps) => {
  const [isTranscriptionVisible, setIsTranscriptionVisible] = useState(true);
  const [isSummaryVisible, setIsSummaryVisible] = useState(true);
  const videoID = props.videoURL.split("=")[1];

  return (
    <div className="flex h-screen w-full flex-col justify-between overflow-x-hidden bg-[#F0F0F0]">
      {/* Transcribe Video Heading and Thumbnail */}
      <div className="m-4 flex flex-col gap-y-2">
        <h2 className="font-semibold">Transcribe Video</h2>
        <div className="flex h-fit w-fit cursor-pointer items-center justify-center self-center rounded-lg bg-[#FFFFFF]">
          <img
            src={`http://img.youtube.com/vi/${videoID}/0.jpg`}
            alt="Thumbnail"
            className=""
          />
        </div>
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
        <p className={`text-justify ${isSummaryVisible ? "" : "hidden"}`}>
          {props.summaryData || "Loading summary..."}
        </p>
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
        <p className={`text-justify ${isTranscriptionVisible ? "" : "hidden"}`}>
          {props.transcriptionData || "Loading transcription..."}
        </p>
      </div>

      {/* Add chat components here.. */}
    </div>
  );
};

export default TranscribeVideoPage;
