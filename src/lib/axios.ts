import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { AxiosMethods } from "../models/AxiosMethods";

const client = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
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

const redirectAfterTwoSeconds = (path: string) => {
  setTimeout(() => {
    if (window.location.href !== path) window.location.href = path;
  }, 2000);
};
client.interceptors.request.use(
  (request: any) => request,
  (error: AxiosError) => error
);

client.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    const errorData: any = error?.response?.data;

    if (errorData.httpStatusCode === 401) {
      // unauthroized
      redirectAfterTwoSeconds("/login");
    }
    if (errorData.httpStatusCode === 400) {
      // bad request
      redirectAfterTwoSeconds("/");
    }

    if (errorData.httpStatusCode === 404) {
      // not found
      redirectAfterTwoSeconds("/");
    }

    return Promise.reject(errorData);
  }
);

export const request = ({ ...options }: BaseRequestInfoProp) => {
  // token could be fetched from localstorage or cookies if its user token and calling qd-chat api
  // or override token incase we are calling third party api
  const token = options.token || "token";

  // token setting
  client.defaults.headers.common.Authorization = `Bearer ${token}`;

  const requestInfo: BaseRequestInfo = {
    ...options,
    url: `${options.endpoint}`,
  };

  return client(requestInfo);
};
