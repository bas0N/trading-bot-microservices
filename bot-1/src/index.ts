console.log("bot 1 welcomes!");
console.log("elo");
import Kafka, { KafkaConsumer } from "node-rdkafka";
//send some data to kafka in intervals

const consumer = new Kafka.KafkaConsumer(
  { "group.id": "kafka", "metadata.broker.list": "localhost:9092" },
  {}
);

// consumer.connect();

// consumer
//   .on("ready", () => {
//     console.log("consumer ready...");
//     consumer.subscribe(["test2"]);
//     consumer.consume();
//   })
//   .on("data", (data: Kafka.Message) => {
//     console.log("received message" + data.value);
//   });
// var stream = KafkaConsumer.createReadStream(globalConfig, topicConfig, {
//   topics: ["test2"],
// });

// stream.on("data", function (message) {
//   console.log("Got message");
//   console.log(message.value.toString());
// });
consumer.connect();

consumer
  .on("ready", function () {
    consumer.subscribe(["test2"]);

    // Consume from the librdtesting-01 topic. This is what determines
    // the mode we are running in. By not specifying a callback (or specifying
    // only a callback) we get messages as soon as they are available.
    consumer.consume();
  })
  .on("data", function (data) {
    // Output the actual message contents
    console.log(data.value?.toString("utf8"));
    console.log(data.offset);
  });
