//http://developers.xstore.pro/documentation/#getChartRangeRequest

import { Producer } from "kafkajs";
import WebSocket from "ws";

import { connectClient } from "./kafka-client";
import { produceMessage } from "./kafka-client";
export const sendChartRange = async (
  socket: WebSocket,
  streamSessionId: string
) => {
  socket.addEventListener("message", ({ data }: { data: any }) => {
    const packet = JSON.parse(data);
    if (packet.returnData) {
      packet.date = new Date();
      console.log("packecior", packet);

      produceMessage(producer, packet);
    }

    //socket.removeAllListeners();
  });
  //ask server every minute and post a message
  //connect to the client
  const producer = await connectClient();

  //send messages in intervals
  getChartRange(socket, producer);

  setInterval(async () => {
    getChartRange(socket, producer);
  }, 60000);
  //Execute ping in interval to remain connection
  setInterval(() => {
    socket.send(
      JSON.stringify({
        command: "ping",
        streamSessionId: streamSessionId,
      })
    );
  }, 10000);
};
//Retrieve the data from API
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
          symbol: "BITCOIN",
          ticks: 15,
        },
      },
    })
  );
};
