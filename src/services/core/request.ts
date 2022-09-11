import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInterceptorManager,
} from 'axios';
import axios from 'axios';

export type IMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface IHttpInstance extends AxiosInstance {
  request: <T = any>(config: AxiosRequestConfig) => Promise<T>;
  get: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<T>;
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>;
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>;
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>;
  delete: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<T>;
}

export type RequestInterceptor = Parameters<AxiosInterceptorManager<AxiosRequestConfig>['use']>;
export type ResponseInterceptor = Parameters<AxiosInterceptorManager<AxiosResponse>['use']>;

export interface BaseHttpFactoryParams {
  requestInterceptor?: RequestInterceptor[];
  responseInterceptor?: ResponseInterceptor[];
}

const defaultOnFulfilled = <T>(v: T) => v;
const defaultOnRejected = <T = any>(e: T) => Promise.reject(e);

export const baseHttpFactory = <T extends AxiosInstance = AxiosInstance>(
  params: BaseHttpFactoryParams,
) => {
  const {
    requestInterceptor,
    responseInterceptor,
  } = params;

  const reqInterceptor = Array.isArray(requestInterceptor) ? requestInterceptor : [];
  const resInterceptor = Array.isArray(responseInterceptor) ? responseInterceptor : [];

  const instance = axios.create();

  reqInterceptor.forEach(([
    onFulfilled = defaultOnFulfilled,
    onRejected = defaultOnRejected,
  ]) => {
    instance.interceptors.request.use(onFulfilled, onRejected);
  });

  resInterceptor.forEach(([
    onFulfilled = defaultOnFulfilled,
    onRejected = defaultOnRejected,
  ]) => {
    instance.interceptors.response.use(onFulfilled, onRejected);
  });

  return instance as T;
};
