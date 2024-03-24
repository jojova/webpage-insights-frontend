import TextBox from "../components/TextBox";

const ChatComponent = () => {
  return (
    <div className="m-4 flex flex-col gap-y-4">
      <h2 className="font-bold">Chat</h2>
      <TextBox text={"Hi there! How can I help you?"} isSender={false} />
      <TextBox
        text={"How did Jobs return to Apple after being fired?"}
        isSender={true}
      />
      <TextBox
        text={"Jobs returned when NeXT Computer Systems was acquired by Apple."}
        isSender={false}
      />
    </div>
  );
};

export default ChatComponent;
