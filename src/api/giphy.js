import axios from "axios";

export const API_KEY = "4TZzl4E79QrALLrEV13iZC52Jeh6Ugbh";

export default axios.create({
  baseURL: "https://api.giphy.com/v1/"
});
