import { request, transformResponse } from '../core/http';
import { Config } from '../../data/config';
import { DEFAULT_MAX_DIFFICULTY } from '../../common/constants';

export const transformConfig = (res: any): Required<Config> => {
  return {
    dataUpdatedTime: res?.dataUpdatedTime || undefined,
    enableFilterGameMode: res?.enableFilterGameMode,
    maxDifficulty: [
      res?.maxDifficulty?.[0] || DEFAULT_MAX_DIFFICULTY,
      res?.maxDifficulty?.[1] || DEFAULT_MAX_DIFFICULTY,
      res?.maxDifficulty?.[2] || DEFAULT_MAX_DIFFICULTY,
      res?.maxDifficulty?.[3] || DEFAULT_MAX_DIFFICULTY,
    ],
  };
};

export const getConfig = async (): Promise<Config> => {
  const res = await request.get('/api/v1/config');
  const data = transformResponse(res);
  return transformConfig(data);
};
