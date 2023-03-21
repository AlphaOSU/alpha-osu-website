import { useLocalStorageState } from 'ahooks';
import { GetRecommendMapsParams } from '../services/requests/get-recommend-maps';
import { DEFAULT_MAX_DIFFICULTY, LOCAL_USER_FILTER_QUERY } from '../common/constants';
import { isJson } from '../utils/is-json';
import { useSelector } from '../common/dvaHooks';
import { GameMode } from '../data/enums/game-mode';

export const defaultQuery = {
  passPercent: [20, 100],
  newRecordPercent: [20, 100],
  difficulty: [0, DEFAULT_MAX_DIFFICULTY],
  keyCount: 4,
  gameMode: GameMode.MANIA,
};

export const useLocalFilterQuery = () => {
  const userMeta = useSelector(state => state.global.userMeta);
  const config = useSelector(state => state.global.config);
  const [query, setQuery] = useLocalStorageState<GetRecommendMapsParams | undefined>(
    LOCAL_USER_FILTER_QUERY,
    {
      defaultValue: {
        ...defaultQuery,
        gameMode: userMeta?.gameMode,
        keyCount: userMeta?.keyCount,
        mod: userMeta?.mod,
        rule: config?.rule?.[userMeta?.gameMode || defaultQuery.gameMode],
      },
      deserializer(value) {
        if (value && isJson(value)) {
          const json = JSON.parse(value);

          const v: GetRecommendMapsParams = {
            newRecordPercent: json?.newRecordPercent ?? undefined,
            passPercent: json?.passPercent ?? undefined,
            difficulty: json?.difficulty ?? undefined,
            keyCount: json?.keyCount ?? undefined,
            gameMode: json?.gameMode ?? userMeta?.gameMode ?? GameMode.STD,
            hidePlayed: json?.hidePlayed ?? undefined,
            mod: json?.mod ?? undefined,
            rule: json?.rule ?? config?.rule?.[userMeta?.gameMode || defaultQuery.gameMode],
          };

          // remove undefined value
          return JSON.parse(JSON.stringify(v));
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
          mod: value?.mod ?? undefined,
          rule: value?.rule ?? config?.rule?.[userMeta.gameMode || defaultQuery.gameMode],
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
