import { Rsi } from "../utils/RSI";
import { producer } from "../index";
export const executeStrategy = async (data: any) => {
  producer;
  const { rsiIndex, lastPrice }: { rsiIndex: number; lastPrice: number } =
    Rsi(data);
  if (rsiIndex > 50) {
    //download price data
    //download balance
    //execute buy operation
    console.log("RSI OVER 70");

    try {
      const disposition = { price: lastPrice, type: "bullish (RSI>70)" };
      await producer.send({
        topic: "execute-position",
        messages: [
          {
            value: JSON.stringify(disposition),
          },
        ],
      });
    } catch (e) {
      console.log(e);
    }
  } else if (rsiIndex < 50) {
    //download price data
    //download balance
    //execute sell operation
    const disposition = { price: lastPrice, type: "bearish (RSI>70)" };
    console.log("RSI UNDER 30");
    try {
      await producer.send({
        topic: "execute-position",
        messages: [
          {
            value: JSON.stringify(disposition),
          },
        ],
      });
    } catch (e) {
      console.log(e);
    }
  } else {
    //do nothing, wait for a better opportunity
  }
};
