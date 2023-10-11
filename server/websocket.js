const ws = require("ws");

// Create a WebSocket server instance
const wss = new ws.Server(
  {
    port: 5000, // Specify the port to listen on
  },
  () => console.log("server started on 5000") // Log a message when the server starts
);

// Event handler for WebSocket connection
wss.on("connection", (socket) => {
  // Log a message when a new WebSocket connection is established
  console.log("New WebSocket connection");

  // Event handler for WebSocket message
  socket.on("message", (message) => {
    // Log the received message
    console.log(`Received message: ${message}`);

    // Broadcast the received message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(message);
      }
    });
  });

  // Event handler for WebSocket close
  socket.on("close", () => {
    // Log a message when a WebSocket connection is closed
    console.log("WebSocket connection closed");
  });
});
