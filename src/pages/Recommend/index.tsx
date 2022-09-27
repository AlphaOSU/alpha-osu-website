import { usePagination } from 'ahooks';
import useUrlState from '@ahooksjs/use-url-state';
import { BackTop, Collapse } from 'antd';
import dayjs from 'dayjs';
import { ceil } from 'lodash';
import { getRecommendMaps, GetRecommendMapsParams } from '../../services/requests/get-recommend-maps';
import { GameMode } from '../../data/game-mode';
import { RecommendTableFilterForm } from '../../components/RecommendTableFilterForm';
import { useSelector } from '../../common/dvaHooks';
import { Authorization } from '../Authorization';
import { UserMeta } from '../../data/user-meta';
import { RecommendTable } from '../../components/Tables/RecommendTable';
import { useConfig } from '../../hooks/useConfig';
import { useTranslation } from '../../i18n';
import { Config } from '../../data/config';
import { DEFAULT_MAX_DIFFICULTY } from '../../common/constants';
import { useLocalFilterQuery } from '../../hooks/useLocalFilterQuery';
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
  newRecordPercent: [0, 100],
  search: '',
  hidePlayed: 0,
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
        setLocalQuery(query);
      },
    },
  );

  return (
    <Authorization>
      <Container>
        <Collapse ghost>
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
          data={data?.list || []}
          loading={loading}
          pagination={pagination}
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
