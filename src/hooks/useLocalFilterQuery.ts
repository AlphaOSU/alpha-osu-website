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
          return JSON.parse(value);
        }

        return {};
      },
      serializer(value) {
        return JSON.stringify(value);
      },
    },
  );

  return {
    query,
    setQuery,
  };
};
