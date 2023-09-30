import axios from "axios";

const baseApi = axios.create({
  // baseURL: "http://salesdemo.southeastasia.cloudapp.azure.com:240",
  // baseURL: "https://salesdemo.southeastasia.cloudapp.azure.com:448",
  baseURL: "https://tradedons-api.facillima.com",
});

export default baseApi;
