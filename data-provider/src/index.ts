import WebSocket from "ws";
import { sendChartRange } from "./services/sendChartRange";

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

  let authorized = false;
  socket.addEventListener("message", ({ data }: { data: any }) => {
    const packet = JSON.parse(data);
    if (packet.status == true && packet.streamSessionId && !authorized) {
      console.log("auth", packet);
      authorized = true;
      //Pass socket to the function to allow it retrieve data from API
      sendChartRange(socket, packet.streamSessionId);
    } else if (packet.status == false) {
      console.log("error", data);
    }
  });
};
auth();
