"use client";
import axios from "axios";
import { useEffect, useState } from "react";

/**
 * LongPolling function for subscribing to messages and sending messages.
 *
 * @return {undefined} No return value.
 */
const LongPolling = () => {
  // State variables to keep track of messages and input value
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");

  // Subscribe to messages on component mount
  useEffect(() => {
    subscribe();
  }, []);

  // Function to subscribe to messages
  async function subscribe() {
    const eventSource = new EventSource("http://localhost:5000/connect");
    eventSource.onmessage = function (event) {
      // console.log(event.data);
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    };
  }

  // Function to send a new message
  async function sendMessage() {
    // Make POST request to send a new message
    await axios.post("http://localhost:5000/new-messages", {
      message: value,
      id: Date.now(),
    });
  }

  return (
    <div>
      <div className="">
        <div className="border-2 mx-auto flex flex-col w-1/2 p-4">
          <input
            className="text-black border-2 border-black w-3/4 mx-auto"
            type="text"
            name=""
            id=""
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <button
            className="border-2 border-black w-1/4 mx-auto"
            onClick={sendMessage}
          >
            Send!
          </button>
        </div>
        <div className="messages">
          {messages.map((mess) => (
            <div
              className="message border-cyan-900 border-2 p-2 w-1/2 m-auto mt-1"
              key={mess.id}
            >
              {mess.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default LongPolling;
