import { http, transformResponse } from '../core/http';
import { UserMeta } from '../../data/user-meta';

export const userLogin = async (username: string) => {
  const res = await http.post('/api/v1/login', {
    username,
  });
  const data = transformResponse<UserMeta>(res);
  return data;
};
