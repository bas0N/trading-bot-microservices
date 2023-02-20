//Calculate RSI
//https://www.omnicalculator.com/finance/rsi#:~:text=Calculate%20relative%20strength%20(RS)%20by,1%20%2B%20RS)%20from%20100.
export const Rsi = (data: any) => {
  //Set initial values of gains and losses
  let sumOfGains = 0;
  let sumOfLosses = 0;
  let totalData = 0;
  data.returnData.rateInfos.forEach((rateInfo: any) => {
    if (rateInfo.close > 0) {
      sumOfGains = sumOfGains + rateInfo.close;
    } else {
      sumOfLosses = sumOfLosses + Math.abs(rateInfo.close);
    }
    totalData++;
  });
  const averageGain = sumOfGains / totalData;
  const averageLoss = sumOfLosses / totalData;
  const RS = averageGain / averageLoss;
  const RSI = 100 - 100 / (1 + RS);
  console.log("RSI", RSI, "on date:", new Date());

  return {
    rsiIndex: RSI,
    lastPrice:
      data.returnData.rateInfos[totalData - 1].open +
      data.returnData.rateInfos[totalData - 1].close,
  };
};
