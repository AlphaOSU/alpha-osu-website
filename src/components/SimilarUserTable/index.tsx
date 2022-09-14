import { Button, Space, Table, Tooltip } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { ColumnType } from 'antd/es/table';
import { round } from 'lodash';
import { QuestionCircleFilled } from '@ant-design/icons';
import { SimilarityUser } from '../../data/table';
import { useTranslation } from '../../i18n';

export interface SimilarUserTableProps {
  data: SimilarityUser[];
  loading?: boolean;
}

export const SimilarUserTable = ({
  data,
  loading,
}: SimilarUserTableProps) => {
  const { t } = useTranslation();

  const getColumns = useMemoizedFn(() => {
    const columns: ColumnType<SimilarityUser>[] = [
      {
        key: 'index',
        dataIndex: 'index',
        title: '#',
      },
      {
        key: 'username',
        dataIndex: 'username',
        title: t('player-username'),
        render(value: string, { userLink }) {
          return (
            <Button
              href={userLink}
              target="_blank"
              rel="noreferrer"
              type="link"
            >
              {value}
            </Button>
          );
        },
      },
      {
        key: 'pp',
        dataIndex: 'pp',
        title: 'pp',
        render(value: number) {
          return round(value, 2);
        },
      },
      {
        key: 'similarity',
        dataIndex: 'similarity',
        title: (
          <Space>
            <span>{t('player-similarity')}</span>
            <Tooltip title={t('tooltip-user-similarity')}>
              <QuestionCircleFilled />
            </Tooltip>
          </Space>
        ),
        render(value: number) {
          return round(value, 2);
        },
      },
    ];
    return columns;
  });

  return (
    <Table
      size="small"
      columns={getColumns()}
      loading={loading}
      dataSource={data.map((item, index) => ({
        key: item.id,
        index: index + 1,
        ...item,
      }))}
      pagination={false}
    />
  );
};
