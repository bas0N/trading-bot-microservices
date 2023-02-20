import WebSocket from "ws";
import { sendChartRange } from "./sendChartRange";

require("dotenv").config();
export const auth = () => {
  const socket = new WebSocket("wss://ws.xtb.com/demo");
  socket.addEventListener("open", () => {
    // Log in to the API
    socket.send(
      JSON.stringify({
        command: "login",
        arguments: {
          userId: process.env.USER_ID,
          password: process.env.PASSWORD,
        },
      })
    );
  });
  // receive a message from the server
  socket.addEventListener("message", ({ data }: { data: any }) => {
    const packet = JSON.parse(data);
    if (packet.status == true && packet.streamSessionId) {
      console.log("auth", packet);

      sendChartRange(socket);
    } else {
    }
  });
};

// export const auth = async () => {
//   //opens socket

//   //waits for confirmation

//   //if ok call rest
//   getChartRange();
// };
