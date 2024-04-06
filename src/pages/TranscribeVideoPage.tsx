import React, { useState, useEffect } from "react";
import axios from "axios";
import video from "../assets/transcribe-video.png";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const TranscribeVideoPage: React.FC = () => {
  const [isTranscriptionVisible, setIsTranscriptionVisible] = useState(true);
  const [transcriptionData, setTranscriptionData] = useState("");
  const [summaryData, setSummaryData] = useState("");

  const url_rec = "https://www.youtube.com/watch?v=zhWDdy_5v2w";
  const encodedUrl = encodeURIComponent(url_rec);
  const video_id = url_rec.split("=")[1];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch transcription data
        const response1 = await axios.post(
          `http://127.0.0.1:8000/summarize/youtube/text/?url=${encodedUrl}`,
          {}
        );
        const data1 = await response1.data;
        setTranscriptionData(data1.response[0]);

        // Encode transcription data for the next request
        const encodedTranscription = encodeURIComponent(data1.response[0]);

        // Fetch summarized data using the encoded transcription
        const response2 = await axios.post(
          `http://127.0.0.1:8000/summarize/text/?text=${encodedTranscription}`,
          {}
        );
        const data2 = await response2.data;
        setSummaryData(data2.response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [encodedUrl]);

  return (
    <div className="flex h-screen w-full flex-col justify-between overflow-x-hidden bg-[#F0F0F0]">
      {/* Transcribe Video Heading and Thumbnail */}
      <div className="m-4 flex flex-col gap-y-2">
        <h2 className="font-semibold">Transcribe Video</h2>
        <div className="flex h-fit w-fit cursor-pointer items-center justify-center rounded-lg bg-[#FFFFFF] p-[64px]">
          <img src={`http://img.youtube.com/vi/${video_id}/0.jpg`} alt="Thumbnail" className="h-[300px] w-[300px]" />
        </div>
      </div>

      {/* Summary */}
      <div className="m-4 flex flex-col gap-y-2">
        <h2 className="font-semibold">Summary</h2>
        <p className="text-justify">
          {summaryData || "Loading summary..."}
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
        <h2 className={`text-justify ${isTranscriptionVisible ? "" : "hidden"}`}>
          {transcriptionData || "Loading transcription..."}
        </h2>
      </div>
      
      {/* Add chat components here.. */}
    </div>
  );
};

export default TranscribeVideoPage;
