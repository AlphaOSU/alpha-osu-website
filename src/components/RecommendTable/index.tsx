import { memo } from 'react';
import { round } from 'lodash';
import { useMemoizedFn } from 'ahooks';
import { Button, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ArrowUpOutlined } from '@ant-design/icons';
import { useTranslation } from '../../i18n';
import { getPagination, Pagination } from '../../common/get-pagination';
import { RecommendListItem } from '../../data/table';

const percentRender = (value: number) => {
  const percent = round(value * 100, 2);
  let color = 'red';

  if (percent < 25) {
    color = 'green';
  } else if (percent < 75 && percent >= 25) {
    color = 'blue';
  }

  return <div style={{ color, fontWeight: 500 }}>{percent}%</div>;
};

export interface RecommendTableProps {
  data: RecommendListItem[];
  loading?: boolean;
  pagination: Pagination;
}

export const RecommendTable = memo<RecommendTableProps>(({
  data,
  loading,
  pagination,
}: RecommendTableProps) => {
  const { t } = useTranslation();

  const getColumns = useMemoizedFn(() => {
    const columns: ColumnsType<RecommendListItem> = [
      {
        key: 'id',
        title: '#',
        dataIndex: 'id',
      },
      {
        key: 'mapName',
        title: t('common-map'),
        dataIndex: 'mapName',
        render(value, { mapLink }) {
          return (
            <Button type="link" target="_blank" href={mapLink}>
              {value}
            </Button>
          );
        },
      },
      {
        key: 'mod',
        title: t('common-mod'),
        dataIndex: 'mod',
      },
      {
        key: 'keyCount',
        title: t('common-key-count'),
        dataIndex: 'keyCount',
      },
      {
        key: 'difficulty',
        title: t('common-difficulty'),
        dataIndex: 'difficulty',
        render: (_, { difficulty }) => round(difficulty, 2),
      },
      {
        key: 'currentScore',
        title: t('label-current-score'),
        dataIndex: 'currentScore',
        render(value, { currentScoreLink }) {
          return (
            <Button type="link" target="_blank" href={currentScoreLink}>
              {value}
            </Button>
          );
        },
      },
      {
        key: 'currentPP',
        title: t('label-current-pp'),
        dataIndex: 'currentPP',
        render: (_, { currentPP }) => round(currentPP, 2),
      },
      {
        key: 'predictScore',
        title: t('label-predict-score'),
        dataIndex: 'predictScore',
      },
      {
        key: 'predictPP',
        title: t('label-predict-pp'),
        dataIndex: 'predictPP',
        render: (_, { predictPP }) => round(predictPP, 2),
      },
      {
        key: 'newRecordPercent',
        title: t('label-new-record-probability'),
        dataIndex: 'newRecordPercent',
        render: percentRender,
      },
      {
        key: 'ppIncrement',
        title: t('label-pp-increment'),
        dataIndex: 'ppIncrement',
        render: (_, { ppIncrement }) => {
          return (
            <Space style={{ color: 'green' }}>
              <ArrowUpOutlined />
              {round(ppIncrement, 2)}
            </Space>
          );
        },
      },
      {
        key: 'passPercent',
        title: t('label-pass-probability'),
        dataIndex: 'passPercent',
        render: percentRender,
      },
      {
        key: 'ppIncrementExpect',
        title: t('label-pp-increment-expect'),
        dataIndex: 'ppIncrementExpect',
        render: (_, { ppIncrementExpect }) => round(ppIncrementExpect, 2),
      },
    ];

    return columns;
  });

  return (
    <Table
      size="small"
      columns={getColumns()}
      dataSource={data.map(item => ({ key: item.id, ...item }))}
      loading={loading}
      pagination={getPagination(pagination, (total) => `${t('label-total-maps', { total: String(total) })}`)}
    />
  );
});

RecommendTable.displayName = 'RecommendTable';
