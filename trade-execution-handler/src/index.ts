import WebSocket from "ws";
import { handleExecutionCalls } from "./services/handleExecutionCalls";

require("dotenv").config();
export const auth = () => {
  const socket = new WebSocket("wss://ws.xtb.com/demo");
  socket.addEventListener("open", () => {
    // Log in to the API

    socket.send(
      JSON.stringify({
        command: "login",
        arguments: {
          userId: process.env.XTB_ID,
          password: process.env.XTB_PASSWORD,
        },
      })
    );
  });
  // receive a message from the server
  socket.addEventListener("message", ({ data }: { data: any }) => {
    const packet = JSON.parse(data);
    if (packet.status == true && packet.streamSessionId) {
      //Execute ping in interval to remain connection
      setInterval(() => {
        socket.send(
          JSON.stringify({
            command: "ping",
            streamSessionId: packet.streamSessionId,
          })
        );
      }, 10000);

      handleExecutionCalls(socket, packet.streamSessionId);
    } else if (packet.status == false) {
      console.log("Error while logging in:", packet);
      return;
    }
  });
};
auth();
