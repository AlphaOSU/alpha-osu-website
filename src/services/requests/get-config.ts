import { request } from '../core/http';
import { transformConfig } from '../tools/transform-config';

export const getConfig = async () => {
  const res = await request.get('/api/config');
  return transformConfig(res);
};
