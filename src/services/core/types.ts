export interface IParams {
  [key: string]: any;
}

export interface IBody {
  [key: string]: any;
}

export interface IHeaders {
  [key: string]: any;
}

export interface IResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}

export interface IListData<T> {

  /**
   * 上一页索引，如果已经是第一页，则为 -1
   */
  prev: number;

  /**
   * 下一页索引，如果已经是最后一页，则为 -1
   */
  next: number;

  /**
   * 列表项总数
   */
  total: number;

  /**
   * 数据列表
   */
  list: T[];
}

export interface IListRequestQuery {
  pageSize?: number;
  current?: number;
}

export type IInfiniteRequestData<T> = IListData<T>;

export type IInfiniteRequestQuery = IListRequestQuery;
