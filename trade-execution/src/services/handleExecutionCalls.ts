import { Kafka } from "kafkajs";

import WebSocket from "ws";
const kafka = new Kafka({
  clientId: "execution-handler",

  brokers: ["localhost:9092"],
});
const consumer = kafka.consumer({ groupId: "test-group1" });

export const handleExecutionCalls = async (socket?: WebSocket) => {
  await consumer.connect();
  await consumer.subscribe({ topic: "execute-position", fromBeginning: true });
  console.log("listening ");

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
      console.log("executing position");
      console.log(JSON.parse(message.value));
    },
  });
};
