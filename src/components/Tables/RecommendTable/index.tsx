import { memo } from 'react';
import round from 'lodash/round';
import { useMemoizedFn } from 'ahooks';
import { Button, Space, Table, TableProps, Tooltip } from 'antd';
import { ColumnsType, ColumnType } from 'antd/es/table';
import { ArrowUpOutlined, RiseOutlined, WarningOutlined } from '@ant-design/icons';
import { useTranslation } from '../../../i18n';
import { gdaic } from '../../../utils/factory';
import { getPagination, Pagination } from '../../../common/get-pagination';
import { KeyCount, RecommendTableItem } from '../../../data/table';
import { Mod } from '../../../data/enums/mod';
import { HelpTitle } from '../HelpTitle';
import { GameMode } from '../../../data/enums/game-mode';
import { PpRule } from '../../../data/enums/pp-rule';
import { difficultyRender, gradeRender, keyCountRender, modRender, percentRender } from './helpers';
import { CoverImg, MapNameWrapper, TableContainer } from './styles';

export interface RecommendTableProps extends TableProps<RecommendTableItem>{
  data: RecommendTableItem[];
  loading?: boolean;
  pagination: Pagination;
  config?: {
    showAccuracy?: boolean;
    showPredictScore?: boolean;
    showCurrentScore?: boolean;
    showKeyCount?: boolean;
  };
}

export const RecommendTable = memo<RecommendTableProps>(({
  data,
  loading,
  pagination,
  config,
  ...props
}: RecommendTableProps) => {
  const { t } = useTranslation();
  const { showPredictScore, showAccuracy, showKeyCount, showCurrentScore } = config || {};

  const getColumns = useMemoizedFn(() => {
    const columns: ColumnsType<RecommendTableItem> = [
      {
        key: 'index',
        title: '#',
        dataIndex: 'index',
        align: 'center',
      },
      {
        key: 'mapName',
        title: t('common-map'),
        dataIndex: 'mapName',
        className: 'map-name-column',
        render(value: string, { mapLink, accurate, mapCoverUrl }) {
          return (
            <MapNameWrapper>
              {mapCoverUrl && <CoverImg title={value} alt="cover" src={mapCoverUrl} />}
              <Tooltip title={value}>
                <Button
                  className="title-text"
                  type="link"
                  target="_blank"
                  href={mapLink}
                >
                  {value}
                </Button>
              </Tooltip>
              {!accurate && (
                <Tooltip title={t('tooltip-recommend-not-accurate')}>
                  <WarningOutlined style={{ color: '#e7bb00' }} />
                </Tooltip>
              )}
            </MapNameWrapper>
          );
        },
      },
      {
        key: 'mod',
        title: t('common-mod'),
        dataIndex: 'mod',
        align: 'center',
        render(value: Mod[]) {
          return value.map(item => modRender(item));
        },
      },
      ...gdaic<ColumnType<RecommendTableItem>>(showKeyCount, [
        {
          key: 'keyCount',
          title: t('common-key-count'),
          dataIndex: 'keyCount',
          align: 'center',
          render(value: KeyCount) {
            return keyCountRender(value);
          },
        },
      ]),
      {
        key: 'difficulty',
        title: t('common-difficulty'),
        dataIndex: 'difficulty',
        render: (_, { difficulty }) => difficultyRender(difficulty),
        align: 'center',
      },
      ...gdaic<ColumnType<RecommendTableItem>>(showCurrentScore, [
        {
          key: 'currentScore',
          title: <HelpTitle title={t('label-current-score')} tooltip={t('tooltip-current-score')} />,
          dataIndex: 'currentScore',
          align: 'center',
          className: 'current-column',
          render(_, { currentScoreLink, currentMod: mod, currentScore: value }) {
            return gradeRender({ value, link: currentScoreLink, mod });
          },
        },
      ]),
      ...gdaic<ColumnType<RecommendTableItem>>(showPredictScore, [
        {
          key: 'predictScore',
          title: t('label-predict-score'),
          dataIndex: 'predictScore',
          align: 'center',
          className: 'predict-column',
        },
      ]),
      ...gdaic<ColumnType<RecommendTableItem>>(showAccuracy, [
        {
          key: 'currentAccuracy',
          title: <HelpTitle title={t('label-current-accuracy')} tooltip={t('tooltip-current-accuracy')} />,
          dataIndex: 'currentAccuracy',
          align: 'center',
          className: 'current-column',
          render(_, { currentAccuracyLink, currentMod: mod, currentAccuracy: value }) {
            return gradeRender({
              value: value && `${round(value * 100, 2)}%`,
              link: currentAccuracyLink,
              mod,
            });
          },
        },
        {
          key: 'predictAccuracy',
          title: t('label-predict-accuracy'),
          dataIndex: 'predictAccuracy',
          align: 'center',
          className: 'predict-column',
          render: (value?: number) => value ? `${round(value * 100, 2)}%` : '-',
        },
      ]),
      {
        key: 'currentPP',
        title: t('label-current-pp'),
        dataIndex: 'currentPP',
        align: 'center',
        className: 'current-column',
        render(_, { currentPP }) {
          return currentPP ? round(currentPP, 2) : '-';
        },
      },
      {
        key: 'predictPP',
        title: t('label-predict-pp'),
        dataIndex: 'predictPP',
        align: 'center',
        className: 'predict-column',
        render: (_, { predictPP }) => round(predictPP, 2),
      },
      {
        key: 'newRecordPercent',
        title: t('label-new-record-probability'),
        dataIndex: 'newRecordPercent',
        align: 'center',
        className: 'predict-column',
        render: percentRender,
      },
      {
        key: 'ppIncrement',
        title: <HelpTitle title={t('label-pp-increment')} tooltip={t('tooltip-pp-increment')} />,
        dataIndex: 'ppIncrement',
        align: 'center',
        className: 'predict-column',
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
        className: 'predict-column',
        title: <HelpTitle title={t('label-pass-probability')} tooltip={t('tooltip-pass-probability')} />,
        align: 'center',
        dataIndex: 'passPercent',
        render: percentRender,
      },
      {
        key: 'ppIncrementExpect',
        className: 'predict-column',
        title: <HelpTitle title={t('label-pp-increment-expect')} tooltip={t('tooltip-pp-increment-expect')} />,
        dataIndex: 'ppIncrementExpect',
        align: 'center',
        render: (_, { ppIncrementExpect }) => (
          <Space style={{ color: 'green' }}>
            <RiseOutlined />
            {round(ppIncrementExpect, 2)}
          </Space>
        ),
      },
    ];

    return columns;
  });

  return (
    <TableContainer>
      <Table
        scroll={{ x: 1280 }}
        size="small"
        columns={getColumns()}
        dataSource={data.map((item, index) => ({
          index: index + pagination.pageSize * (pagination.current - 1) + 1,
          ...item,
          key: item.id,
        }))}
        loading={loading}
        pagination={getPagination(pagination, (total) => `${t('label-total-maps', { total: String(total) })}`)}
        {...props}
      />
    </TableContainer>
  );
});

RecommendTable.displayName = 'RecommendTable';


export const getTableConfig = ({
  mode,
  rule,
}: { mode?: GameMode; rule?: PpRule}): Required<RecommendTableProps>['config'] => {
  if (mode === GameMode.MANIA && rule === PpRule.V3) {
    return {
      showAccuracy: false,
      showPredictScore: true,
      showCurrentScore: true,
      showKeyCount: true,
    };
  }

  if (mode === GameMode.MANIA && rule === PpRule.V4) {
    return {
      showAccuracy: true,
      showPredictScore: false,
      showCurrentScore: false,
      showKeyCount: true,
    };
  }

  return {
    showAccuracy: false,
    showPredictScore: false,
    showCurrentScore: true,
    showKeyCount: false,
  };
};
