console.log("elo");
import Kafka from "node-rdkafka";
//send some data to kafka in intervals

const stream = Kafka.Producer.createWriteStream(
  {
    "metadata.broker.list": "localhost:9092",
  },
  {},
  { topic: "test2" }
);

function queuemessage() {
  const result = stream.write(Buffer.from("hi"));
  console.log(result);
}
setInterval(() => {
  queuemessage();
}, 3000);
