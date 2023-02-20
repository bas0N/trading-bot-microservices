import { Rsi } from "../utils/RSI";
export const executeStrategy = (data: any) => {
  console.log(data);
  Rsi(data);
  //Produce event to buy something
};
