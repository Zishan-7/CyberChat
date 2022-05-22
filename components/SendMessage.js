import { useState } from "react";
import { useMoralis } from "react-moralis";

const SendMessage = ({ endofmessagesref }) => {
  const { Moralis, user } = useMoralis();
  const [message, setMessage] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message) return;

    const Messages = Moralis.Object.extend("Messages");
    const messages = new Messages();

    messages
      .save({
        message,
        username: user.getUsername(),
        ethAddress: user.get("ethAddress"),
      })
      .then(
        (message) => {},
        (error) => {
          console.log(error.message);
        }
      );
    endofmessagesref.current.scrollIntoView({ behaviour: "smooth" });
    setMessage("");
  };
  return (
    <form className=" flex fixed bottom-10 bg-black opacity-80 w-11/12 px-6 py-4 max-w-2xl rounded-full border-2 border-blue-500">
      <input
        className="outline-none flex-grow bg-transparent text-white placeholder-gray-500 pr-5"
        type="text"
        placeholder="Type a message.."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        onClick={sendMessage}
        className="font-bold text-pink-500"
      >
        Send
      </button>
    </form>
  );
};

export default SendMessage;
