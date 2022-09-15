import { usePagination } from 'ahooks';
import useUrlState from '@ahooksjs/use-url-state';
import { BackTop } from 'antd';
import { getRecommendMaps, GetRecommendMapsParams } from '../../services/requests/get-recommend-maps';
import { GameMode } from '../../data/game-mode';
import { RecommendTableFilterForm } from '../../components/RecommendTableFilterForm';
import { useSelector } from '../../common/dvaHooks';
import { Authorization } from '../Authorization';
import { UserMeta } from '../../data/user-meta';
import { RecommendTable } from '../../components/Tables/RecommendTable';
import { Container } from './styles';

const getInitQuery = (userMeta: UserMeta) => ({
  gameMode: userMeta?.gameMode ?? GameMode.STD,
  keyCount: userMeta?.keyCount ?? 4,
  passPercent: [0, 100],
  newRecordPercent: [0, 100],
  search: '',
});

export const Recommend = () => {
  const userMeta = useSelector(state => state.global.userMeta);

  const [query, setQuery] = useUrlState<GetRecommendMapsParams>(
    getInitQuery(userMeta),
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
      throttleWait: 300,
      refreshDeps: [query],
    },
  );

  return (
    <Authorization>
      <Container>
        <RecommendTableFilterForm
          initialValues={query}
          onChange={(values) => {
            const filterParams: GetRecommendMapsParams = {
              ...values,
            };
            setQuery(filterParams);
          }}
        />
        <RecommendTable
          data={data?.list || []}
          loading={loading}
          pagination={pagination}
        />
        <BackTop />
      </Container>
    </Authorization>
  );
};
