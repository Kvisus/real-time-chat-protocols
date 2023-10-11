/**
 * Long polling server for real-time chat messages.
 * Listens for incoming messages and broadcasts them to connected clients.
 */

// Import required modules
const express = require("express");
const cors = require("cors");
const events = require("events"); // event emitter, standard node.js

// Set the port to listen on
const PORT = 5000;

// Create a new event emitter
const emitter = new events.EventEmitter();

// Create an instance of the Express application
const app = express();

// Enable CORS
app.use(cors());

// Parse JSON requests
app.use(express.json());

/**
 * Endpoint to get messages.
 * Listens for incoming requests and responds with the latest message.
 */
app.get("/get-messages", (req, res) => {
  // Use the event emitter to listen for the "newMessage" event
  // and respond with the latest message
  emitter.once("newMessage", (message) => {
    res.json(message);
  });
});

/**
 * Endpoint to post messages.
 * Listens for incoming requests to send a new message.
 */
app.post("/new-messages", (req, res) => {
  // Extract the message from the request body
  const message = req.body;

  // Emit the "newMessage" event with the message
  // to notify all connected clients
  emitter.emit("newMessage", message);

  // Send a success status code
  res.sendStatus(200);
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
