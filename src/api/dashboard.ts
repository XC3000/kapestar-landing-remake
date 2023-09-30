import { z } from "zod";
import baseApi from "./base";

export const FoiTableDataSchema = z
  .object({
    StockName: z.string().nonempty(),
    LastTradePrice: z.number(),
    PriceChangePercent: z.number(),
    OIChangePercent: z.number(),
  })
  .array();

export type TableKey = {
  "indian-stock": "GetStockPriceDetails";
  "global-stock": "GetGlobalMarketPriceDetails";
  "top-gainers-indian": "GetTopGainers?Count=10";
  "top-losers-indian": "GetTopLosers?Count=10";
};

const Mapper = {
  "indian-stock": "GetStockPriceDetails",
  "global-stock": "GetGlobalMarketPriceDetails",
  "top-gainers-indian": "GetTopGainers?Count=10",
  "top-losers-indian": "GetTopLosers?Count=10",
};

export const getDashboardTableData = async (type: keyof TableKey) => {
  const { data } = await baseApi.get(`/api/Dashboard/${Mapper[type]}`);

  const parsedData = await FoiTableDataSchema.safeParseAsync(data);

  if (parsedData.success) return parsedData.data;
};
