import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import FeatureButton from "../components/FeatureButton";
import aestheticBuildings from "../assets/aesthetic-buildings.png";
import ChatPage from "./ChatPage";
import AnalyseImagePage from "./AnalyseImagePage";
import CSVAnalyisPage from "./CSVAnalyisPage";
import TranscribeVideoPage from "./TranscribeVideoPage";
import { CgTranscript } from "react-icons/cg";

const HomePage = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [webpageURL, setWebpageURL] = useState<string>("");
  const [transcriptionData, setTranscriptionData] = useState("");
  const [summaryData, setSummaryData] = useState("");

  const handleFeatureClick = (featureLabel: string) => {
    setWebpageURL("");
    setSelectedFeature(featureLabel);
  };

  const handleURLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWebpageURL(event.target.value);
  };

  const fetchTranscriptionData = useCallback(async () => {
    if (selectedFeature === "Transcribe Video" && webpageURL !== "") {
      try {
        setTranscriptionData("Loading Transcription...");
        setSummaryData("Loading Summary...");
        const encodedUrl = encodeURIComponent(webpageURL);
        // Fetch transcription data
        const response1 = await axios.post(
          `http://127.0.0.1:8000/summarize/youtube/text/?url=${encodedUrl}`,
          {},
        );
        const data1 = response1.data;
        setTranscriptionData(data1.response[0]);

        // Fetch summarized data using the transcription
        const encodedTranscription = encodeURIComponent(data1.response[0]);
        const response2 = await axios.post(
          `http://127.0.0.1:8000/summarize/text/?text=${encodedTranscription}`,
          {},
        );
        const data2 = response2.data;
        setSummaryData(data2.response);
      } catch (error) {
        setTranscriptionData("Please enter a valid YouTube URL!");
        setSummaryData("Please enter a valid YouTube URL!");
        console.error("Error fetching data:", error);
      }
    }
  }, [selectedFeature, webpageURL]);

  useEffect(() => {
    return () => {
      setSummaryData("");
      setTranscriptionData("");
    };
  }, [webpageURL]);

  return (
    <div className="flex w-full">
      <div
        className={`no-scrollbar flex h-screen overflow-hidden ${
          selectedFeature ? "w-[40%]" : ""
        } w-screen select-none flex-col items-center justify-between bg-gradient-to-t from-[#ADC8CD] to-[#FFFFFF] to-50%`}
      >
        {/* Title */}
        <div className="flex w-full items-center justify-between px-[4rem] py-[2rem]">
          <div className="flex w-full items-center gap-x-4">
            {" "}
            <div
              onClick={() => {
                setSelectedFeature("");
                setWebpageURL("");
                setSummaryData("");
                setTranscriptionData("");
              }}
              className="cursor-pointer"
            >
              <h2 className="text-4xl font-bold text-[#0A5463]">WPI</h2>
            </div>
            <h2
              className={`text-sm font-medium lg:text-lg ${
                selectedFeature ? "hidden" : ""
              }`}
            >
              Revolutionize Your Browsing Experience
            </h2>
          </div>
          {/* Install Extension Button */}
          <div className="hidden w-fit cursor-pointer whitespace-nowrap rounded-lg bg-[#ADC8CD] px-4 py-2 font-semibold text-[#000000] lg:inline">
            Install Extension
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-y-4 px-4">
          {/* Features Grid */}
          <div
            className={`grid grid-cols-4 gap-x-2 gap-y-2 lg:gap-x-4 ${
              selectedFeature ? "grid-cols-2" : ""
            }`}
          >
            <FeatureButton
              featureLabel="Chat"
              isSelected={selectedFeature === "Chat"}
              onClick={() => handleFeatureClick("Chat")}
            />
            <FeatureButton
              featureLabel="Analyse Image"
              isSelected={selectedFeature === "Analyse Image"}
              onClick={() => handleFeatureClick("Analyse Image")}
            />
            <FeatureButton
              featureLabel="CSV Analysis"
              isSelected={selectedFeature === "CSV Analysis"}
              onClick={() => handleFeatureClick("CSV Analysis")}
            />
            <FeatureButton
              featureLabel="Transcribe Video"
              isSelected={selectedFeature === "Transcribe Video"}
              onClick={() => handleFeatureClick("Transcribe Video")}
            />
          </div>
          <div
            className={`flex w-full gap-x-2 ${selectedFeature === "CSV Analysis" ? "invisible" : ""}`}
          >
            {/* WebPage Link Input Field */}
            <input
              type="text"
              className="w-full border-2 border-[#000000] bg-transparent p-2"
              placeholder={
                selectedFeature === "Transcribe Video"
                  ? "YouTube Video Link"
                  : "WebPage Link"
              }
              value={webpageURL}
              onChange={handleURLChange}
            />
            {/* Arrow Button */}
            <div
              onClick={() => {
                if (selectedFeature === "Transcribe Video") {
                  setTranscriptionData("");
                  setSummaryData("");
                  fetchTranscriptionData();
                }
              }}
              title="Transcribe Video"
              className={`flex w-fit cursor-pointer items-center justify-center rounded-lg bg-[#0A5463] px-3 py-1 ${selectedFeature === "Transcribe Video" ? "" : "hidden"}`}
            >
              <CgTranscript className="text-white" />
            </div>
          </div>
        </div>

        {/* Image */}
        <img
          src={aestheticBuildings}
          alt="Aesthetic Buildings Image"
          className="pointer-events-none -mb-[0.3rem]"
        />
      </div>

      {selectedFeature === "Chat" ? (
        <ChatPage webpageURL={webpageURL} />
      ) : selectedFeature === "Analyse Image" ? (
        <AnalyseImagePage />
      ) : selectedFeature === "CSV Analysis" ? (
        <CSVAnalyisPage />
      ) : selectedFeature === "Transcribe Video" ? (
        <TranscribeVideoPage
          videoURL={webpageURL}
          transcriptionData={transcriptionData}
          summaryData={summaryData}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default HomePage;
