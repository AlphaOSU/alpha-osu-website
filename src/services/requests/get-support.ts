import dayjs from 'dayjs';
import { request, transformResponse } from '../core/http';

export interface SupportData {
  index: number;
  name: string;
  from: string;
  payment: string;
  date: string;
}

export const getSupport = async (): Promise<SupportData[]> => {
  const res = await request.get('/api/v1/supporters', {});
  const data = transformResponse(res);
  return data.map((item: any, index: number) => {
    return {
      ...item,
      index,
      date: dayjs(item.date).format('YYYY-MM-DD'),
    };
  });
};
