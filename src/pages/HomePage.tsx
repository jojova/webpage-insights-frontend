import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import FeatureButton from "../components/FeatureButton";
import aestheticBuildings from "../assets/aesthetic-buildings.png";
import ChatPage from "./ChatPage";
import AnalyseImagePage from "./AnalyseImagePage";
import CSVAnalyisPage from "./CSVAnalyisPage";
import TranscribeVideoPage from "./TranscribeVideoPage";
import { CgTranscript } from "react-icons/cg";
import { IoChatbox } from "react-icons/io5";
import { BiSolidAnalyse } from "react-icons/bi";

const HomePage = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [webpageURL, setWebpageURL] = useState<string>("");
  const [transcriptionData, setTranscriptionData] = useState("");
  const [summaryData, setSummaryData] = useState("");
  const [chatSummaryText, setChatSummaryText] = useState("");
  const [images, setImages] = useState<any[]>([]); // Initialize images state

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
          {}
        );
        const data1 = response1.data;
        setTranscriptionData(data1.response[0]);

        // Fetch summarized data using the transcription
        const encodedTranscription = encodeURIComponent(data1.response[0]);
        const response2 = await axios.post(
          `http://127.0.0.1:8000/summarize/text/?text=${encodedTranscription}`,
          {}
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

  const scrapeAndSummarizeText = () => {
    // URL encode the webpageURL for the scraping request
    const encodedPageURL = encodeURIComponent(webpageURL);

    // Make the scraping request
    fetch(`http://127.0.0.1:8000/scrape/text/?url=${encodedPageURL}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Assuming the scraped text is directly in `data` or adjust according to the actual response structure
        const scrapedText = data.response.join("\n");
        const encodedText = encodeURIComponent(scrapedText);

        // Make the summarization request
        return fetch(
          `http://127.0.0.1:8000/summarize/text/?text=${encodedText}`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
            },
          },
        );
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((summaryData) => {
        // Update your state or UI component with the summary text
        // Assuming `summaryText` is the state variable holding the summary and `setSummaryText` is the method to update it
        setChatSummaryText(summaryData.response);
      })
      .catch((error) => {
        console.error("Error processing the text:", error);
        // Handle error, maybe update state to show error to the user
        setChatSummaryText("Error loading summary.");
      });
  };

  useEffect(() => {
    return () => {
      setSummaryData("");
      setTranscriptionData("");
    };
  }, [webpageURL]);

  const fetchImagesFromBackend = async (webpageURL) => {
    console.log(`hi`);
    try {
      const response = await fetch(`http://localhost:8000/scrape/image/?url=${encodeURIComponent(webpageURL)}`, {
        method: "POST",
        headers: {
          "Accept": "application/json"
        },
        body: JSON.stringify({}) // No need to include the URL in the body
      });
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      const data = await response.json();
      // Update state with fetched images
      setImages(data.images);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };
  
  

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
            className={`flex w-full gap-x-2 ${
              selectedFeature === "CSV Analysis" ? "invisible" : ""
            }`}
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
            {selectedFeature === "Transcribe Video" ? (
              <div
                onClick={() => {
                  setTranscriptionData("");
                  setSummaryData("");
                  fetchTranscriptionData();
                }}
                title="Transcribe Video"
                className={`flex w-fit cursor-pointer items-center justify-center rounded-lg bg-[#0A5463] px-3 py-1`}
              >
                <CgTranscript className="text-xl text-white" />
              </div>
            ) : selectedFeature === "Chat" ? (
              <div
                onClick={() => {
                  scrapeAndSummarizeText();
                }}
                title="Summarize and Chat"
                className={`flex w-fit cursor-pointer items-center justify-center rounded-lg bg-[#0A5463] px-3 py-1`}
              >
                {" "}
                <IoChatbox className="text-xl text-white" />{" "}
              </div>
            ) : selectedFeature === "Analyse Image" ? (
              <div
              onClick={() => fetchImagesFromBackend(webpageURL)}
                title="Analyse Image"
                className={`flex w-fit cursor-pointer items-center justify-center rounded-lg bg-[#0A5463] px-3 py-1`}
              >
                {" "}
                <BiSolidAnalyse className="text-xl text-white" />{" "}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        {/* Image */}
        <img
          src={aestheticBuildings}
          alt="Aesthetic Buildings Image"
          className="pointer-events-none -mb-[0.3rem]"
        />
      </div>

      {/* Render selected feature */}
      {selectedFeature === "Chat" ? (
        <ChatPage webpageURL={webpageURL} summaryData={chatSummaryText} />
      ) : selectedFeature === "Analyse Image" ? (
        <AnalyseImagePage images={images} />
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
