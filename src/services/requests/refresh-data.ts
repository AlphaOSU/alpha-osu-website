import { request, transformResponse } from '../core/http';

export const refreshData = async () => {
  const res = await request.post('/api/v1/self/users/synchronize', {});
  transformResponse(res);
};
