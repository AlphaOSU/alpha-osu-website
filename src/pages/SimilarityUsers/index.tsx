import { useRequest } from 'ahooks';
import { BackTop } from 'antd';
import { SimilarUserTable } from '../../components/SimilarUserTable';
import { getSimilarityUsers } from '../../services/requests/get-similarity-users';
import { GameMode } from '../../data/game-mode';
import { Authorization } from '../Authorization';
import { useSelector } from '../../common/dvaHooks';
import { Container } from './styles';

export const SimilarityUsers = () => {
  const userMeta = useSelector(state => state.global.userMeta);

  const { data, loading } = useRequest(
    () => getSimilarityUsers({
      gameMode: userMeta?.gameMode ?? GameMode.STD,
      keyCount: userMeta?.keyCount ?? 4,
    }),
  );

  return (
    <Authorization>
      <Container>
        <SimilarUserTable data={data || []} loading={loading} />
        <BackTop />
      </Container>
    </Authorization>
  );
};
