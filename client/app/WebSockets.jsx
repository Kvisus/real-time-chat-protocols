"use client";
import axios from "axios";

import React, { useState, useEffect, useRef } from "react";

function WebSockets() {
  // State variables
  const [messages, setMessages] = useState([]); // Messages received from the server
  const [value, setValue] = useState(""); // Input value for sending messages
  const [connected, setConnected] = useState(false); // Connection status
  const [username, setUsername] = useState(""); // Username of the user

  // WebSocket reference
  const socket = useRef(null);

  // Establish WebSocket connection
  const connect = () => {
    // Create a new WebSocket connection
    socket.current = new WebSocket("ws://localhost:5000");

    // When the WebSocket connection is successfully established
    socket.current.onopen = () => {
      // Set the "connected" flag to true
      setConnected(true);
      // Send a connection message to the server
      const connectionMessage = {
        event: "connection",
        username,
        id: Date.now(),
      };
      socket.current.send(JSON.stringify(connectionMessage));
    };

    // When a message is received from the server
    socket.current.onmessage = (event) => {
      // Parse the JSON data
      const message = JSON.parse(event.data);
      // Update the state of the "messages" variable
      setMessages((prevMessages) => [message, ...prevMessages]);
    };

    // When the WebSocket connection is closed
    socket.current.onclose = () => {
      // Log a message to the console indicating that the connection is closed
      console.log("Socket is closed");
    };

    // When there is an error with the WebSocket connection
    socket.current.onerror = () => {
      // Log a message to the console indicating a socket error
      console.log("Socket error");
    };
  };

  // Send a message to the server
  const sendMessage = () => {
    // Create a new message object
    const message = {
      username,
      content: value,
      id: Date.now(),
    };
    // Send the message to the server
    socket.current.send(JSON.stringify(message));
    // Clear the input value
    setValue("");
  };

  // Render the component
  return (
    <div>
      {!connected ? (
        <div>WebSocket connection not yet established</div>
      ) : (
        <div>
          <div>
            {messages.map((message) => (
              <div key={message.id}>{message.content}</div>
            ))}
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      )}
    </div>
  );
}

export default WebSockets;