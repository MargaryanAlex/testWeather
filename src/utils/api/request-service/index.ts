import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

class RequestService {
  private BASE_URL: string = "";

  constructor(url: string) {
    this.BASE_URL = url;
  }

  GET<T, R>(
    path: string,
    configs: AxiosRequestConfig = {},
    isApiString: boolean = false
  ) {
    return axios.get<T, AxiosResponse<R>>(path, configs);
  }

  POST<T, R>(
    path: string,
    data: T,
    configs: AxiosRequestConfig = {},
    isApiString: boolean = false
  ) {
    return axios
      .post<T, AxiosResponse<R>>(path, data, configs)
      .catch((err) => err);
  }

  PUT<T, R>(
    path: string,
    data: T,
    configs: AxiosRequestConfig = {},
    isApiString: boolean = false
  ) {
    return axios
      .put<T, AxiosResponse<R>>(path, data, configs)
      .catch((err) => err);
  }

  PATCH<T, R>(
    path: string,
    data: T,
    configs: AxiosRequestConfig = {},
    isApiString: boolean = false
  ) {
    return axios
      .patch<T, AxiosResponse<R>>(path, data, configs)
      .catch((err) => err);
  }

  DELETE<T, R>(
    path: string,
    data?: T,
    configs: AxiosRequestConfig = {},
    isApiString: boolean = false
  ) {
    return axios.delete<T, AxiosResponse<R>>(path, configs).catch((err) => err);
  }
}

let request = new RequestService("");
export default request;
