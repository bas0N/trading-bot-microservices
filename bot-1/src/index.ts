import { Kafka } from "kafkajs";
const kafka = new Kafka({
  clientId: "my-consumer",

  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "test-group" });

const run = async () => {
  // Producing
  await consumer.connect();
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
      console.log({
        partition,
        offset: message.offset,
        value: JSON.parse(message.value),
      });
    },
  });
};

run().catch(console.error);
