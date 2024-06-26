import PropTypes from "prop-types";

interface TextBoxProps {
  text: string;
  isSender: boolean;
}

const TextBox: React.FC<TextBoxProps> = (props) => {
  const isJson =
    props.text &&
    typeof props.text === "string" &&
    (props.text.startsWith("{") || props.text.startsWith("["));

  return (
    <div
      className={`w-fit max-w-[30rem] rounded-lg px-4 py-2 font-medium text-[#000000] ${
        props.isSender ? "self-end bg-[#FFFFFF]" : "bg-[#FFF4CB]"
      }`}
    >
      {isJson ? (
        <pre className="whitespace-pre-wrap">{props.text}</pre>
      ) : (
        // Otherwise, render as text
        <p>{props.text}</p>
      )}
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
