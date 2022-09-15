import { useRequest } from 'ahooks';
import { BackTop } from 'antd';
import useUrlState from '@ahooksjs/use-url-state';
import { getSimilarityUsers } from '../../services/requests/get-similarity-users';
import { GameMode } from '../../data/game-mode';
import { Authorization } from '../Authorization';
import { useSelector } from '../../common/dvaHooks';
import { SimilarUserTable } from '../../components/Tables/SimilarUserTable';
import { SimilarUserFilterForm } from '../../components/SimilarUserFilterForm';
import { GetRecommendMapsParams } from '../../services/requests/get-recommend-maps';
import { UserMeta } from '../../data/user-meta';
import { Container } from './styles';

const getInitQuery = (userMeta: UserMeta) => ({
  gameMode: userMeta?.gameMode ?? GameMode.STD,
  keyCount: userMeta?.keyCount ?? 4,
});

export const SimilarityUsers = () => {
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

  const { data, loading } = useRequest(
    () => getSimilarityUsers(query),
    {
      refreshDeps: [query],
      throttleWait: 300,
    },
  );

  return (
    <Authorization>
      <Container>
        <SimilarUserFilterForm
          initialValues={query}
          onChange={(values) => {
            setQuery(values);
          }}
        />
        <SimilarUserTable
          data={data || []}
          loading={loading}
        />
        <BackTop />
      </Container>
    </Authorization>
  );
};
