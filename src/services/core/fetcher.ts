import { getUid } from '../../common/get-uid';
import type { IHttpInstance, RequestInterceptor, ResponseInterceptor } from './request';
import { baseHttpFactory } from './request';

export type RequestOnFulfilled = RequestInterceptor[0];
export type RequestOnRejected = RequestInterceptor[1];
export type ResponseOnFulfilled = ResponseInterceptor[0];
export type ResponseOnRejected = ResponseInterceptor[1];


const httpRequestInterceptorFactory = () => {
  const onFulfilled: RequestOnFulfilled = (config) => {
    const { headers } = config;

    return {
      ...config,
      headers: {
        ...headers,
        uid: getUid(),
      },
    };
  };

  return [onFulfilled] as RequestInterceptor;
};

const httpResponseInterceptorFactory = () => {
  const onFulfilled: ResponseOnFulfilled = (res) => {
    return res;
  };

  const onRejected: ResponseOnRejected = (err) => {
    return Promise.resolve(err);
  };

  return [onFulfilled, onRejected] as ResponseInterceptor;
};

export const httpFactory = () => {
  return baseHttpFactory<IHttpInstance>({
    requestInterceptor: [httpRequestInterceptorFactory()],
    responseInterceptor: [httpResponseInterceptorFactory()],
  });
};
