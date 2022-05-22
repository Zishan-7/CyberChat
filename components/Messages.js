import { useRef } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
import Message from "./Message";
import SendMessage from "./SendMessage";

const Messages = () => {
  const { user } = useMoralis();
  const endOfMessagesRef = useRef();
  const { data, loading, error } = useMoralisQuery(
    "Messages",
    (query) => query.ascending("createdAt"),
    [],
    { live: true }
  );

  console.log(data);
  return (
    <div className="pb-56">
      <div className="space-y-10 p-4">
        {data.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>

      <div endofmessagesref={endOfMessagesRef} className="flex justify-center">
        <SendMessage endofmessagesref={endOfMessagesRef} />
      </div>
      <div ref={endOfMessagesRef} className="text-center text-gray-400 mt-5">
        <p>You are up to date {user.getUsername()}</p>
      </div>
    </div>
  );
};

export default Messages;
