import { usePagination } from 'ahooks';
import useUrlState from '@ahooksjs/use-url-state';
import { getRecommendMaps, GetRecommendMapsParams } from '../../services/requests/get-recommend-maps';
import { RecommendTable } from '../../components/RecommendTable';
import { GameMode } from '../../data/game-mode';
import { TableFilterForm } from '../../components/TableFilterForm';
import { useSelector } from '../../common/dvaHooks';
import { Authorization } from '../Authorization';
import { Container } from './styles';

export const Home = () => {
  const userMeta = useSelector(state => state.global.userMeta);
  const [query, setQuery] = useUrlState<GetRecommendMapsParams>(
    {
      gameMode: userMeta?.gameMode ?? GameMode.STD,
      keyCount: userMeta?.keyCount ?? 4,
      passPercent: [60, 100],
      newRecordPercent: [60, 100],
      search: '',
    },
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
      ...options,
      ...query,
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
              pageSize: 20,
              current: 1,
            };
            setQuery(filterParams);
          }}
        />
        <RecommendTable
          data={data?.list || []}
          loading={loading}
          pagination={pagination}
        />
      </Container>
    </Authorization>
  );
};
