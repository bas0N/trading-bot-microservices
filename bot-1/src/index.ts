import { Kafka } from "kafkajs";
import { executeStrategy } from "./services/strategy-execute";
require("dotenv").config();

const kafka = new Kafka({
  clientId: "my-consumer",

  brokers: ["localhost:9092"],
});

export const producer = kafka.producer();

export const consumer = kafka.consumer({ groupId: "test-group" });

const run = async () => {
  // Producing
  await consumer.connect();
  await producer.connect();
  await consumer.subscribe({ topic: "test3", fromBeginning: true });

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
      console.log("Execute strategy");
      //Pass the data to the main bot function
      executeStrategy(JSON.parse(message.value));
    },
  });
};

run().catch(console.error);
