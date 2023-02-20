import { Kafka, Producer } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-producer",
  brokers: ["kafka-broker:9092"],
});

const producer = kafka.producer();
export const connectClient = async () => {
  await producer.connect();
  return producer;
};

export const produceMessage = async (producer: Producer, data?: any) => {
  try {
    await producer.send({
      topic: "test3",
      messages: [
        {
          value: JSON.stringify(data),
        },
      ],
    });
  } catch (e) {
    console.log(e);
  }
};
