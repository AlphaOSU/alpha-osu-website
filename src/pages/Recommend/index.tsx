import { useEffect } from 'react';
import { useMemoizedFn, usePagination, useRequest, useSetState } from 'ahooks';
import { BackTop, Button, Collapse } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from '../../i18n';
import { refreshData } from '../../services/requests/refresh-data';
import { getRecommendMaps, GetRecommendMapsParams } from '../../services/requests/get-recommend-maps';
import { useConfig } from '../../hooks/useConfig';
import { useLocalFilterQuery } from '../../hooks/useLocalFilterQuery';
import { GameModeForm } from '../../components/ModForm';
import { RecommendTableFilterForm } from '../../components/RecommendTableFilterForm';
import { getTableConfig, RecommendTable, RecommendTableProps } from '../../components/Tables/RecommendTable';
import { Authorization } from '../Authorization';
import { Donate } from '../../components/Donate';
import { Container } from './styles';

export const Recommend = () => {
  const {
    query,
    setQuery,
  } = useLocalFilterQuery();
  const config = useConfig();
  const { t } = useTranslation();

  const [tableConfig, setTableConfig] = useSetState<Required<RecommendTableProps>['config']>({
    showAccuracy: false,
    showPredictScore: true,
    showKeyCount: false,
  });

  const {
    data,
    loading,
    pagination,
  } = usePagination(
    (options) => getRecommendMaps({
      ...query,
      ...options,
    }),
    {
      defaultPageSize: 20,
      defaultCurrent: 1,
      debounceWait: 300,
      refreshDeps: [query],
    },
  );

  const { loading: refreshLoading, run: handleRefreshData } = useRequest(
    refreshData,
    {
      onSuccess() {
        location.reload();
      },
      manual: true,
    },
  );

  useEffect(() => {
    setTableConfig(getTableConfig({
      mode: query?.gameMode,
    }));
  }, [query, setTableConfig]);

  const handleFormChange = useMemoizedFn((values) => {
    const filterParams: GetRecommendMapsParams = {
      ...values,
    };
    setQuery((prev) => ({
      ...prev,
      ...filterParams,
    }));
  });

  const collapseHeader = (
    <div className="filter-collapse-panel-header">
      <div>{t('label-filter-maps')}</div>
      <div onClick={(e) => e.stopPropagation()}>
        <Button
          danger
          loading={refreshLoading}
          onClick={() => {
            handleRefreshData(query?.gameMode);
          }}
        >
          {t('button-refresh-data-now')}
        </Button>
      </div>
    </div>
  );

  return (
    <Authorization>
      <Container>
        <Donate />
        <GameModeForm
          onChange={handleFormChange}
          initialValues={query}
        />
        <Collapse>
          <Collapse.Panel
            key="filter-form"
            header={collapseHeader}
          >
            <RecommendTableFilterForm
              initialValues={query}
              onChange={handleFormChange}
              gameMode={query?.gameMode}
            />
          </Collapse.Panel>
        </Collapse>
        <RecommendTable
          bordered
          data={data?.list || []}
          loading={loading}
          pagination={pagination}
          config={tableConfig}
          footer={() =>
            config?.dataUpdatedTime && config.dataUpdatedTime > 0
              ? (
                <div className="date-time">
                  {t('label-date-update-time')}{dayjs(config.dataUpdatedTime * 1000).format('YYYY-MM-DD HH:mm:ss')}
                </div>
              )
              : undefined
          }
        />
        <BackTop />
      </Container>
    </Authorization>
  );
};
