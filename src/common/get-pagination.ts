import { ReactNode } from 'react';
import { TablePaginationConfig } from 'antd';

export interface Pagination {
  current: number;
  pageSize: number;
  total: number;
  totalPage: number;
  onChange: (current: number, pageSize: number) => void;
  changeCurrent: (current: number) => void;
  changePageSize: (pageSize: number) => void;
}

export const getPagination = (
  pagination: Pagination,
  showTotal: (total: number) => ReactNode,
): TablePaginationConfig => {
  return {
    total: pagination.total,
    pageSize: pagination.pageSize,
    showTotal,
    onChange: pagination.onChange,
    onShowSizeChange: pagination.onChange,
    showSizeChanger: true,
    showQuickJumper: true,
    current: pagination.current,
    responsive: true,
    pageSizeOptions: [20, 50, 100, 1000],
  };
};
