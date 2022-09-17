import { request, transformResponse } from '../core/http';
import { Config } from '../../data/config';

export const transformConfig = (res: any): Config => {
  return {
    dataUpdatedTime: res?.dataUpdatedTime || undefined,
  };
};

export const getConfig = async (): Promise<Config> => {
  const res = await request.get('/api/v1/config');
  const data = transformResponse(res);
  return transformConfig(data);
};
