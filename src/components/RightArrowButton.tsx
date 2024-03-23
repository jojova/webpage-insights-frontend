import { FaArrowRight } from "react-icons/fa6";

const RightArrowButton = () => {
  return (
    <div className="flex w-fit cursor-pointer items-center justify-center rounded-lg bg-[#0A5463] px-3 py-1">
      <FaArrowRight className="text-white" />
    </div>
  );
};

export default RightArrowButton;
