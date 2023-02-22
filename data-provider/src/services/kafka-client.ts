import { Kafka, Producer } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-producer",
  brokers: ["kafka-service:9092"],
});

const producer = kafka.producer();
export const connectClient = async () => {
  await producer.connect();
  return producer;
};

export const produceMessage = async (producer: Producer, data?: any) => {
  try {
    console.log("sent message at: ", new Date());
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
