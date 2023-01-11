import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { AxiosMethods } from "../constants/AxiosMethods";

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

interface BaseRequestInfoProp {
  endpoint: string;
  method: AxiosMethods;
  data?: any;
  token?: string;
  config?: AxiosRequestConfig;
}

interface BaseRequestInfo extends Partial<BaseRequestInfoProp> {
  url: string;
}

client.interceptors.request.use(
  (request: any) => request,
  (error: AxiosError) => error
);

client.interceptors.response.use(
  (response: AxiosResponse) => {
    // to access data directly
    return response.data;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export const request = ({ ...options }: BaseRequestInfoProp) => {
  // token could be fetched from localstorage or cookies if its user token and calling qd-chat api
  // or override token incase we are calling third party api
  const token = options.token;

  if (token) {
    // token setting
    client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  const requestInfo: BaseRequestInfo = {
    ...options,
    url: `${options.endpoint}`,
  };

  return client(requestInfo);
};
