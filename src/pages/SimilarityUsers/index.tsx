import { useRequest } from 'ahooks';
import { BackTop } from 'antd';
import useUrlState from '@ahooksjs/use-url-state';
import dayjs from 'dayjs';
import { useTranslation } from '../../i18n';
import { useSelector } from '../../common/dvaHooks';
import { GameMode } from '../../data/enums/game-mode';
import { UserMeta } from '../../data/user-meta';
import { getSimilarityUsers } from '../../services/requests/get-similarity-users';
import { GetRecommendMapsParams } from '../../services/requests/get-recommend-maps';
import { useConfig } from '../../hooks/useConfig';
import { SimilarUserTable } from '../../components/Tables/SimilarUserTable';
import { SimilarUserFilterForm } from '../../components/SimilarUserFilterForm';
import { Authorization } from '../Authorization';
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
      debounceWait: 300,
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
          footer={
            () => dataUpdatedTime > 0 && (
              <div className="date-time">
                {t('label-date-update-time')}{dayjs(dataUpdatedTime * 1000).format('YYYY-MM-DD HH:mm:ss')}
              </div>
            )
          }
        />
        <BackTop />
      </Container>
    </Authorization>
  );
};
