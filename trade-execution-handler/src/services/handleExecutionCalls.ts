import { Kafka } from "kafkajs";

import WebSocket from "ws";
const kafka = new Kafka({
  clientId: "execution-handler",

  brokers: ["localhost:9092"],
});
const consumer = kafka.consumer({ groupId: "test-group3" });
const socketStream = new WebSocket("wss://ws.xtb.com/demoStream");
let latestAsk = 0;
let latestTimestamp = 0;
export const handleExecutionCalls = async (
  socket: WebSocket,
  streamSessionId: string
) => {
  //Listen for ask prices
  console.log("tiime", Date.now());
  let latestAsk = 0;

  socketStream.send(
    JSON.stringify({
      command: "getTickPrices",
      symbol: "BITCOIN",
      streamSessionId,
      minArrivalTime: 1000,
    })
  );

  socketStream.addEventListener("message", ({ data }: { data: any }) => {
    const jsonData = JSON.parse(data);
    if (jsonData.command == "tickPrices") {
      latestAsk = jsonData.data.ask;
      latestTimestamp = jsonData.data.timestamp;
    }

    // if (jsonData.status == true) {
    //   console.log("datain listener", jsonData.returnData?.quotations[0]?.ask);
    //   // latestAsk = jsonData.returnData.ask;
    // }
  });

  await consumer.connect();
  await consumer.subscribe({ topic: "execute-position", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({
      topic,
      partition,
      message,
    }: {
      topic: any;
      partition: any;
      message: any;
    }) => {
      //check if the timestamp do not differ too much
      // socket.send(
      //   JSON.stringify({
      //     command: "getSymbol",
      //     arguments: {
      //       symbol: "BITCOIN",
      //     },
      //   })
      // );
      console.log(latestAsk);
      console.log(new Date(latestTimestamp));
      console.log("executing position");
      console.log(JSON.parse(message.value));
    },
  });
};
