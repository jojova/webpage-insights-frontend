import PropTypes from "prop-types";
import { useState, useEffect } from "react";

interface FeatureButtonProps {
  featureLabel: string;
  isSelected: boolean;
  onClick: () => void;
}

const FeatureButton = (props: FeatureButtonProps) => {
  const [featureImage, setFeatureImage] = useState("");

  useEffect(() => {
    const loadImage = async () => {
      try {
        const image = await import(
          `../assets/${props.featureLabel.toLowerCase().replace(/\s+/g, "-")}.png`
        );
        setFeatureImage(image.default);
      } catch (err) {
        console.error("Failed to load image", err);
      }
    };

    loadImage();
  }, [props.featureLabel]);

  return (
    <div
      className={`flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border-2 border-[#0A5463] px-4 py-2 ${props.isSelected === true ? "bg-[#CEEBF1]" : ""}`}
      onClick={props.onClick}
    >
      <img
        src={featureImage}
        alt=""
        className="pointer-events-none h-[36px] w-[36px]"
      />
      <h2 className="font-base text-xs text-[#000000] lg:text-lg">
        {props.featureLabel}
      </h2>
    </div>
  );
};

FeatureButton.propTypes = {
  featureLabel: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

FeatureButton.defaultProps = {
  featubeLabel: "Chat",
  isSelected: false,
};

export default FeatureButton;
