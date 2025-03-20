import axios from "axios";

const BASE_URL = process.env.GEMINI_URL;
const axiosClient = axios.create({
  baseURL: {},
});
