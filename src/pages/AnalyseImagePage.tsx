import React, { useState, useEffect } from "react";
import ChatBar from "../components/ChatBar";
import { FaArrowRight } from "react-icons/fa6";
import { GiMagicBroom } from "react-icons/gi";

interface AnalyseImagePageProps {
  imageURLs: string[];
}

const AnalyseImagePage = (props: AnalyseImagePageProps) => {
  const [captions, setCaptions] = useState<string[]>([]);
  const [loadedImages, setLoadedImages] = useState<number>(0);

  const fetchCaptionsForImage = async (imageURL: string) => {
    try {
      const encodedURL = encodeURIComponent(imageURL);
      const response = await fetch(`http://localhost:8000/caption/image/?url=${encodedURL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch captions");
      }
      const data = await response.json();
      console.log("data ==>> ", data);
      // Update captions state with the received captions
      setCaptions((prevCaptions) => [...prevCaptions, data.caption]);
    } catch (error) {
      console.error("Error fetching captions:", error);
    }
  };

  useEffect 

  const handleImageLoad = () => {
    setLoadedImages((prevLoadedImages) => prevLoadedImages + 1);
  };

  useEffect(() => {
    // Fetch captions for each image when all images are loaded
    if (loadedImages === props.imageURLs.length) {
      props.imageURLs.forEach((imageURL) => {
        fetchCaptionsForImage(imageURL);
      });
    }
  }, [loadedImages, props.imageURLs]);

  return (
    <div className="flex h-screen w-full flex-col justify-between overflow-x-hidden bg-[#F0F0F0] p-4">
      {/* Webpage URL */}
      <div className="m-4 rounded-lg bg-[#DCDDDE] py-2 text-center font-medium text-[#62646B]">
        Webpage URL
      </div>

      {/* Chat Section */}
      <div>
        <h2 className="mb-2 text-xl font-semibold">Analysis Image </h2>
        {/* Render fetched images */}
        <div className="flex flex-wrap gap-4">
          {props.imageURLs.map((imageURL, index) => (
            <div key={index} className="m-2">
              <img
                src={imageURL}
                alt={`Image ${index + 1}`}
                className="m-2"
                style={{ maxWidth: "200px" }}
                onLoad={handleImageLoad}
              />
              <h1 className="text-center mt-2  text-[#FF0000]">{captions[index]}</h1>
            </div>
          ))}
        </div>

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
