import { useMount, usePagination } from 'ahooks';
import useUrlState from '@ahooksjs/use-url-state';
import { BackTop } from 'antd';
import { getRecommendMaps, GetRecommendMapsParams } from '../../services/requests/get-recommend-maps';
import { RecommendTable } from '../../components/RecommendTable';
import { GameMode } from '../../data/game-mode';
import { TableFilterForm } from '../../components/TableFilterForm';
import { useSelector } from '../../common/dvaHooks';
import { Authorization } from '../Authorization';
import { UserMeta } from '../../data/user-meta';
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

  useMount(() => {
    setQuery(getInitQuery(userMeta));
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

  return (
    <Authorization>
      <Container>
        <TableFilterForm
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
