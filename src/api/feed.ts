import { parse } from "rss-to-json";

// const baseApi = axios.create({
//     // baseURL: "http://salesdemo.southeastasia.cloudapp.azure.com:240",
//     // baseURL: "https://salesdemo.southeastasia.cloudapp.azure.com:448",
//     baseURL: "https://www.moneycontrol.com/rss",
// });

// export const getIndianEvents = async () => {
//     return await baseApi.get("/latestnews.xml");
// };

export const getIndianEvents = async () => {
  var rss = await parse("https://www.moneycontrol.com/rss/latestnews.xml");
  return rss;
};
