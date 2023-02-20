import { Kafka } from "kafkajs";
const kafka = new Kafka({
  clientId: "my-producer",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();
const produceMessage = async () => {
  try {
    await producer.send({
      topic: "test3",
      messages: [
        {
          value: JSON.stringify({
            index: "USDPLN",
            price: Math.floor(Math.random() * 100),
          }),
        },
      ],
    });
  } catch (e) {
    console.log(e);
  }
};
const run = async () => {
  // Producing
  await producer.connect();

  setInterval(() => {
    produceMessage();
  }, 2000);
};

run().catch(console.error);
