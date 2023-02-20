import { Rsi } from "../utils/RSI";
export const executeStrategy = (data: any) => {
  const rsiIndex = Rsi(data);
  if (rsiIndex < 30) {
    //download price data
    //download balance
    //execute buy operation
  } else if (rsiIndex < 30) {
    //download price data
    //download balance
    //execute sell operation
  } else {
    //do nothing, wait for a better opportunity
  }
};
