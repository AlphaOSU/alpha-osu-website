import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { message } from 'antd';
import type { IResponse } from './types';
import { httpFactory } from './fetcher';
import { getErrorMessage } from './error-code';

export const http = httpFactory();

const isError = <T = any>(obj: AxiosResponse<IResponse<T>> | Error): obj is Error => obj instanceof Error;

export const transformResponse = <T = any> (axiosResponse: AxiosResponse<IResponse<T>> | Error): T => {
  try {
    if (isError(axiosResponse)) {
      throw `${axiosResponse.name}: ${axiosResponse.message}`;
    } else if (axiosResponse.status >= 200 && axiosResponse.status < 300) {
      const res = axiosResponse.data;
      const err = axiosResponse as unknown as Error;

      if (res?.success) {
        return res?.data || {} as any;
      } else if (res?.code > 0){
        throw getErrorMessage(res?.code);
      }

      throw res.message || err || 'Unknown Error';
    } else {
      throw `${axiosResponse.status}: ${axiosResponse.statusText}`;
    }
  } catch (err) {
    message.error(err, 1.5);
    throw err;
  }
};

const del = async <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => {
  return await http.delete<AxiosResponse<IResponse<T>>>(
    url,
    config,
  );
};

const post = async <T = any>(url: string, data: any, config?: AxiosRequestConfig) => {
  return await http.post<AxiosResponse<IResponse<T>>>(
    url,
    data,
    config,
  );
};

const get = async <T = any>(url: string, config?: AxiosRequestConfig) => {
  return await http.get<AxiosResponse<IResponse<T>>>(
    url,
    config,
  );
};

const patch = async <T = any>(url: string, data: any, config?: AxiosRequestConfig) => {
  return await http.patch<AxiosResponse<IResponse<T>>>(
    url,
    data,
    config,
  );
};

const put = async <T = any>(url: string, data: any, config?: AxiosRequestConfig) => {
  return await http.put<AxiosResponse<IResponse<T>>>(
    url,
    data,
    config,
  );
};

export const request = {
  delete: del,
  post,
  get,
  patch,
  put,
};

