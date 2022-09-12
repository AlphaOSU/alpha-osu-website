import { IListData } from '../core/types';

export const transformList = <T = any[]>(res: any, transform: (item: any) => T): IListData<T> => {
  const arr = Array.isArray(res?.list) ? res?.list : [];
  return {
    next: res?.next ?? -1,
    prev: res?.prev ?? -1,
    total: res?.total ?? 0,
    list: arr.map((item: any) => transform(item)),
  };
};
