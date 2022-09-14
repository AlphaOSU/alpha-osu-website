import qs from 'qs';
import { http, transformResponse } from '../core/http';
import { KeyCount, SimilarityUser } from '../../data/table';
import { GameMode } from '../../data/game-mode';

export interface GetSimilarityUsersOptions {
  keyCount?: KeyCount;
  gameMode?: GameMode;
}

export const getSimilarityUsers = async (options: GetSimilarityUsersOptions): Promise<SimilarityUser[]> => {
  const res = await http.get('/api/v1/self/users/similarity', {
    params: {
      current: 1,
      pageSize: 999,
      ...options,
    },
    paramsSerializer(query) {
      return qs.stringify(query, {
        arrayFormat: 'comma',
      });
    },
  });
  const data = transformResponse<SimilarityUser[]>(res);
  return data;
};
