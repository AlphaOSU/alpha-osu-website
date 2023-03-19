import { useLocalStorageState } from 'ahooks';
import { GetRecommendMapsParams } from '../services/requests/get-recommend-maps';
import { LOCAL_USER_FILTER_QUERY } from '../common/constants';
import { isJson } from '../utils/is-json';
import { useSelector } from '../common/dvaHooks';
import { GameMode } from '../data/enums/game-mode';

export const useLocalFilterQuery = () => {
  const userMeta = useSelector(state => state.global.userMeta);
  const [query, setQuery] = useLocalStorageState<GetRecommendMapsParams>(
    LOCAL_USER_FILTER_QUERY,
    {
      defaultValue: {
        gameMode: userMeta?.gameMode,
        keyCount: userMeta?.keyCount,
      },
      deserializer(value) {
        if (value && isJson(value)) {
          const json = JSON.parse(value);
          // remove undefined value
          return JSON.parse(JSON.stringify({
            newRecordPercent: json?.newRecordPercent ?? undefined,
            passPercent: json?.passPercent ?? undefined,
            difficulty: json?.difficulty ?? undefined,
            keyCount: json?.keyCount ?? undefined,
            gameMode: json?.gameMode ?? userMeta.gameMode ?? GameMode.STD,
            hidePlayed: json?.hidePlayed ?? undefined,
          }));
        }

        return {};
      },
      serializer(value) {
        const json = {
          newRecordPercent: value?.newRecordPercent ?? undefined,
          passPercent: value?.passPercent ?? undefined,
          difficulty: value?.difficulty ?? undefined,
          keyCount: value?.keyCount ?? undefined,
          gameMode: value?.gameMode ?? userMeta.gameMode ?? GameMode.STD,
          hidePlayed: value?.hidePlayed ?? undefined,
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
