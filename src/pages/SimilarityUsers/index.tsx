import { useRequest } from 'ahooks';
import { BackTop } from 'antd';
import useUrlState from '@ahooksjs/use-url-state';
import dayjs from 'dayjs';
import { getSimilarityUsers } from '../../services/requests/get-similarity-users';
import { GameMode } from '../../data/game-mode';
import { Authorization } from '../Authorization';
import { useSelector } from '../../common/dvaHooks';
import { SimilarUserTable } from '../../components/Tables/SimilarUserTable';
import { SimilarUserFilterForm } from '../../components/SimilarUserFilterForm';
import { GetRecommendMapsParams } from '../../services/requests/get-recommend-maps';
import { UserMeta } from '../../data/user-meta';
import { useConfig } from '../../hooks/useConfig';
import { useTranslation } from '../../i18n';
import { Container } from './styles';

const getInitQuery = (userMeta: UserMeta) => ({
  gameMode: userMeta?.gameMode ?? GameMode.STD,
  keyCount: userMeta?.keyCount ?? 4,
});

export const SimilarityUsers = () => {
  const userMeta = useSelector(state => state.global.userMeta);
  const { dataUpdatedTime = -1 } = useConfig();
  const { t } = useTranslation();

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
        {dataUpdatedTime > 0 && (
          <div className="date-time">
            {t('label-date-update-time')}{dayjs(dataUpdatedTime * 1000).format('YYYY-MM-DD HH:mm:ss')}
          </div>
        )}
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
