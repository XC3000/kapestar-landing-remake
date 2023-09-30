import { z } from "zod";
import baseApi from "../base";

const FuturesOpenInterstSchema = z
  .object({
    ProductName: z.string().nonempty(),
    CurrentMonth: z.string().nonempty(),
    NextMonth: z.string().nonempty(),
    FarMonth: z.string().nonempty(),
  })
  .array();

export type TFuturesOpenInterst = z.infer<typeof FuturesOpenInterstSchema>;

const TFutureOpenInterestHistoricRowSchema = z.object({
  Identifier: z.string().nonempty(),
  DataDateTime: z.string().nonempty(),
  BuildUps: z.string().nonempty(),
  LastTradePrice: z.number(),
  LastTradePriceChange: z.number(),
  CurrentOIChange: z.number(),
  TodaysChangeInOI: z.number(),
  TotalOI: z.number(),
  Volume: z.number(),
  BreakOut: z.string().nonempty(),
  DayHigh: z.number(),
  DayLow: z.number(),
});

const TFutureOpenInterestHistoricSchema =
  TFutureOpenInterestHistoricRowSchema.array();

export type TFutureOpenInterestHistoric = z.infer<
  typeof TFutureOpenInterestHistoricSchema
>;

export type TFutureOpenInterestHistoricRow = z.infer<
  typeof TFutureOpenInterestHistoricRowSchema
>;

export const getIndexAndExpiryDetails = async () => {
  const { data } = await baseApi.get("/api/FOS/GetIndexAndExpiryDetails");
  //   console.log(data.error);

  return data as TFuturesOpenInterst;

  //   const parsedData = await FuturesOpenInterstSchema.safeParseAsync(data);

  //   if (parsedData.success) return parsedData.data;
  //   console.log(parsedData?.error);
  //   return parsedData.error;
};

export type TFoiRow = [
  string,
  string,
  number,
  number,
  number,
  number,
  number,
  number,
  string,
  number,
  number,
];

export const getFOIHistoricData = async (identifier: string) => {
  const { data } = await baseApi.get(
    `/api/FOS/GetFOIData?Identifier=${identifier}`
  );

  const parsedData =
    await TFutureOpenInterestHistoricSchema.safeParseAsync(data);

  if (parsedData.success) {
    let dayHigh = parsedData.data[0].DayHigh;
    let dayLow = parsedData.data[0].DayLow;

    parsedData.data.forEach((item) => {
      if (item.DayHigh > dayHigh) dayHigh = item.DayHigh;
      else if (item.DayLow < dayLow) dayLow = item.DayLow;
    });

    return {
      rows: parsedData.data,
      dayHigh,
      dayLow,
    };
  }
  throw new Error(parsedData.error.message);
};

export const getFOISubscriptionName = async (
  indexName: string,
  userId: string
) => {
  const { data } = await baseApi.get(
    `/api/Account/GetIndexSubscription?IndexName=${indexName}&UserId=${userId}`
  );

  return data;
};
