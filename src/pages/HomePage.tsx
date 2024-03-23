import { useState } from "react";
import FeatureButton from "../components/FeatureButton";
import aestheticBuildings from "../assets/aesthetic-buildings.png";
import { FaArrowRight } from "react-icons/fa6";

const HomePage = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const handleFeatureClick = (featureLabel: string) => {
    setSelectedFeature(featureLabel === selectedFeature ? null : featureLabel);
  };

  return (
    <div className="no-scrollbar flex h-screen w-screen flex-col items-center justify-between bg-gradient-to-t from-[#ADC8CD] to-[#FFFFFF] to-50%">
      {/* Title */}
      <div className="flex w-full items-center justify-between px-[4rem] py-[2rem]">
        <div className="flex w-full items-center gap-x-4">
          {" "}
          <h2 className="text-4xl font-bold text-[#0A5463]">WPI</h2>
          <h2 className="text-sm font-medium lg:text-lg">
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
        <div className="grid grid-cols-4 gap-x-2 lg:gap-x-4">
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

      {/* Image */}
      <img src={aestheticBuildings} alt="" className="pointer-events-none" />
    </div>
  );
};

export default HomePage;
