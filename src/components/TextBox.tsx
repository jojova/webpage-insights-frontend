import PropTypes from "prop-types";

interface TextBoxProps {
  text: string;
  isSender: boolean;
}

const TextBox: React.FC<TextBoxProps> = (props) => {
  return (
    <div
      className={`w-fit max-w-[20rem] rounded-lg px-4 py-2 font-semibold text-[#000000] ${props.isSender ? "self-end bg-[#FFFFFF]" : "bg-[#FFF4CB]"}`}
    >
      {props.text}
    </div>
  );
};

TextBox.propTypes = {
  text: PropTypes.string.isRequired,
  isSender: PropTypes.bool.isRequired,
};

TextBox.defaultProps = {
  text: "Hi there! How can I help you?",
  isSender: false,
};

export default TextBox;
