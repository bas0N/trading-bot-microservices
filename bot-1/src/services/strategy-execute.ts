import { Rsi } from "../utils/RSI";
import { producer } from "../index";
export const executeStrategy = async (data: any) => {
  if (data.returnData) {
  }

  const { rsiIndex, lastPrice }: { rsiIndex: number; lastPrice: number } =
    Rsi(data);
  if (rsiIndex > 70) {
    try {
      const disposition = {
        price: lastPrice,
        type: "SHORT",
        description: "bullish (RSI>70)",
        timestamp: new Date(),
        rsiIndex,
      };

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
  } else if (rsiIndex < 30) {
    const disposition = {
      price: lastPrice,
      type: "LONG",
      description: "bearish (RSI<30)",
      timestamp: new Date(),
      rsiIndex,
    };
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
