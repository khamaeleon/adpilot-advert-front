import axios from "axios";
import {AUTH_SERVER} from "../constants/GlobalConst";

export const nonUserAxios = axios.create({
  baseURL: AUTH_SERVER,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
  validateStatus: function (status) {
    return status !== 401 && status !== 403 && status <= 500;
  },
});
