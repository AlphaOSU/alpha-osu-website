import { Button, Table, TableProps } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { ColumnType } from 'antd/es/table';
import { round } from 'lodash';
import { SimilarityUser } from '../../../data/table';
import { useTranslation } from '../../../i18n';
import { HelpTitle } from '../HelpTitle';

export interface SimilarUserTableProps extends TableProps<SimilarityUser> {
  data: SimilarityUser[];
  loading?: boolean;
}

export const SimilarUserTable = ({
  data,
  loading,
  ...props
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
        title: <HelpTitle title={t('player-similarity')} tooltip={t('tooltip-user-similarity')} />,
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
        index: index + 1,
        ...item,
        key: item.id,
      }))}
      pagination={false}
      {...props}
    />
  );
};
