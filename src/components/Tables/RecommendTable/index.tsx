import { memo } from 'react';
import { round } from 'lodash';
import { useMemoizedFn } from 'ahooks';
import { Button, Space, Table, TableProps, Tooltip } from 'antd';
import { ColumnsType, ColumnType } from 'antd/es/table';
import { ArrowUpOutlined, RiseOutlined, StarFilled, WarningOutlined } from '@ant-design/icons';
import * as assets from '../../../assets';
import { useTranslation } from '../../../i18n';
import { gdaic } from '../../../utils/factory';
import { getPagination, Pagination } from '../../../common/get-pagination';
import { KeyCount, RecommendTableItem } from '../../../data/table';
import { Mod } from '../../../data/enums/mod';
import { HelpTitle } from '../base-components';
import { getDifficultyColor, getPercentColor } from './helpers';
import { CoverImg, DifficultyBadge, MapNameWrapper, ModImg, TableContainer } from './styles';

const keyCountRender = (key: KeyCount) => {
  const getImg = () => {
    switch (key) {
    case 4: return assets.m4k;
    case 7: return assets.m7k;
    default: return assets.m4k;
    }
  };

  return <ModImg src={getImg()} alt={String(key)} key={key} />;
};

const modRender = (mod: Mod, img = true) => {
  const getImg = () => {
    switch (mod) {
    case Mod.DT: return assets.dt;
    case Mod.HT: return assets.ht;
    case Mod.NM: return assets.nm;
    default: return assets.nm;
    }
  };

  const getTooltip = () => {
    switch (mod) {
    case Mod.DT: return 'Double Time';
    case Mod.HT: return 'Half Time';
    case Mod.NM: return 'No Mod';
    default: return 'No Mod';
    }
  };

  if (!img) {
    return getTooltip();
  }

  return (
    <Tooltip title={getTooltip()} key={mod}>
      <ModImg src={getImg()} alt={mod} key={mod} />
    </Tooltip>
  );
};

const difficultyRender = (rating: number) => {
  const color = getDifficultyColor(rating);

  return (
    <DifficultyBadge
      color={rating < 6.5 ? 'hsl(200, 10%, 10%)' : 'rgb(255, 217, 102)'}
      backgroundColor={color}
    >
      <div className="rate-content">
        <span>{round(rating, 2)}</span>
        &nbsp;
        <StarFilled />
      </div>
    </DifficultyBadge>
  );
};

const gradeRender = ({
  value,
  link,
  mod,
}: {
  value?: number | string;
  link?: string;
  mod: Mod[];
}) => {
  if (!value) {
    return '-';
  }

  return (
    <Tooltip title={<Space>{mod.map(item => modRender(item, false))}</Space>}>
      <Button type="link" target="_blank" href={link}>
        {value}
      </Button>
    </Tooltip>
  );
};

const percentRender = (value: number) => {
  const color = getPercentColor(value);
  const percent = round(value * 100, 2);
  return <div style={{ color, fontWeight: 700 }}>{percent}%</div>;
};

export interface RecommendTableProps extends TableProps<RecommendTableItem>{
  data: RecommendTableItem[];
  loading?: boolean;
  pagination: Pagination;
  config?: {
    showAccuracy?: boolean;
    showScore?: boolean;
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
  const { showScore, showAccuracy } = config || {};

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
      {
        key: 'keyCount',
        title: t('common-key-count'),
        dataIndex: 'keyCount',
        align: 'center',
        render(value: KeyCount) {
          return keyCountRender(value);
        },
      },
      {
        key: 'difficulty',
        title: t('common-difficulty'),
        dataIndex: 'difficulty',
        render: (_, { difficulty }) => difficultyRender(difficulty),
        align: 'center',
      },
      ...gdaic<ColumnType<RecommendTableItem>>(showScore, [
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
