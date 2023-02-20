//http://developers.xstore.pro/documentation/#getChartRangeRequest

import { Producer } from "kafkajs";
import WebSocket from "ws";

import { connectClient } from "./kafka-client";
import { produceMessage } from "./kafka-client";
const getChartRange = async (socket: WebSocket, producer: Producer) => {
  const currentTimeStamp = Date.now();
  //60000 is the number of ms in one minute
  const timeStamp15minBefore = currentTimeStamp - 15 * 60000;

  socket.send(
    JSON.stringify({
      command: "getChartRangeRequest",
      arguments: {
        info: {
          end: currentTimeStamp,
          period: 1,
          start: timeStamp15minBefore,
          symbol: "EURUSD",
          ticks: 15,
        },
      },
    })
  );
  socket.addEventListener("message", ({ data }: { data: any }) => {
    const packet = JSON.parse(data);
    console.log(packet);

    produceMessage(producer, packet);
    socket.removeAllListeners();
  });
};
export const sendChartRange = async (socket: WebSocket) => {
  //ask server every minute and post a message
  //connect to the client
  const producer = await connectClient();

  //send messages in intervals
  getChartRange(socket, producer);

  setInterval(async () => {
    getChartRange(socket, producer);
  }, 60000);
};
