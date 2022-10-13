import { useEffect } from 'react';
import { usePagination, useSetState } from 'ahooks';
import useUrlState from '@ahooksjs/use-url-state';
import { BackTop, Collapse } from 'antd';
import dayjs from 'dayjs';
import { ceil, omit } from 'lodash';
import { useTranslation } from '../../i18n';
import { DEFAULT_MAX_DIFFICULTY } from '../../common/constants';
import { useSelector } from '../../common/dvaHooks';
import { GameMode } from '../../data/enums/game-mode';
import { UserMeta } from '../../data/user-meta';
import { Config } from '../../data/config';
import { PpRule } from '../../data/enums/pp-rule';
import { getRecommendMaps, GetRecommendMapsParams } from '../../services/requests/get-recommend-maps';
import { useConfig } from '../../hooks/useConfig';
import { useLocalFilterQuery } from '../../hooks/useLocalFilterQuery';
import { RecommendTableFilterForm } from '../../components/RecommendTableFilterForm';
import { RecommendTable, RecommendTableProps } from '../../components/Tables/RecommendTable';
import { Authorization } from '../Authorization';
import { Container } from './styles';

const getInitQuery = (
  localQuery: GetRecommendMapsParams,
  userMeta: UserMeta,
  config: Config,
): GetRecommendMapsParams => ({
  gameMode: userMeta?.gameMode ?? GameMode.STD,
  keyCount: userMeta?.keyCount ?? 4,
  difficulty: [0, ceil(config?.maxDifficulty?.[userMeta?.gameMode] || DEFAULT_MAX_DIFFICULTY)],
  passPercent: [20, 100],
  newRecordPercent: [20, 100],
  search: '',
  hidePlayed: 0,
  rule: PpRule.V3,
  ...localQuery,
});

export const Recommend = () => {
  const userMeta = useSelector(state => state.global.userMeta);
  const {
    query: localQuery,
    setQuery: setLocalQuery,
  } = useLocalFilterQuery();
  const config = useConfig();
  const { t } = useTranslation();

  const [query, setQuery] = useUrlState<GetRecommendMapsParams>(
    getInitQuery(localQuery, userMeta, config),
    {
      parseOptions: {
        parseBooleans: true,
        parseNumbers: true,
        arrayFormat: 'comma',
      },
      stringifyOptions: {
        arrayFormat: 'comma',
      },
    },
  );

  const [tableConfig, setTableConfig] = useSetState<Required<RecommendTableProps>['config']>({
    showAccuracy: false,
    showScore: true,
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
      onBefore() {
        setLocalQuery(omit(query, 'passPercent'));
      },
    },
  );

  useEffect(() => {
    if (query.rule === PpRule.V4) {
      setTableConfig({
        showScore: false,
        showAccuracy: true,
      });
      return;
    }

    setTableConfig({
      showAccuracy: false,
      showScore: true,
    });
  }, [query, setTableConfig]);

  return (
    <Authorization>
      <Container>
        <Collapse>
          <Collapse.Panel
            key="filter-form"
            header={t('label-filter-maps')}
          >
            <RecommendTableFilterForm
              initialValues={query}
              onChange={(values) => {
                const filterParams: GetRecommendMapsParams = {
                  ...values,
                };
                setQuery(filterParams);
              }}
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
