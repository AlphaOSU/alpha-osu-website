import { request, transformResponse } from '../core/http';

export const getDonation = async (): Promise<{ donation: number; payment: number }> => {
  const res = await request.get('/api/v1/donation');
  const data = transformResponse(res);
  return {
    donation: data.donation,
    payment: data.payment,
  };
};
