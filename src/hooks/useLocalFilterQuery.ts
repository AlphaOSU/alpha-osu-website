import { useLocalStorageState } from 'ahooks';
import { GetRecommendMapsParams } from '../services/requests/get-recommend-maps';
import { LOCAL_USER_FILTER_QUERY } from '../common/constants';
import { isJson } from '../utils/is-json';

export const useLocalFilterQuery = () => {
  const [query, setQuery] = useLocalStorageState<GetRecommendMapsParams>(
    LOCAL_USER_FILTER_QUERY,
    {
      defaultValue: {},
      deserializer(value) {
        if (value && isJson(value)) {
          const json = JSON.parse(value);
          // remove undefined value
          return JSON.parse(JSON.stringify({
            newRecordPercent: json?.newRecordPercent || undefined,
            difficulty: json?.difficulty || undefined,
            keyCount: json?.keyCount || undefined,
            gameMode: json?.gameMode || undefined,
            hidePlayed: json?.hidePlayed || undefined,
          }));
        }

        return {};
      },
      serializer(value) {
        const json = {
          newRecordPercent: value?.newRecordPercent || undefined,
          difficulty: value?.difficulty || undefined,
          keyCount: value?.keyCount || undefined,
          gameMode: value?.gameMode || undefined,
          hidePlayed: value?.hidePlayed || undefined,
        };
        return JSON.stringify(json);
      },
    },
  );

  return {
    query,
    setQuery,
  };
};
