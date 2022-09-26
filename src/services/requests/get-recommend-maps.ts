import qs from 'qs';
import { GameMode } from '../../data/game-mode';
import { KeyCount, RecommendTableItem } from '../../data/table';
import { transformList } from '../tools/transform-list';
import { IListRequestQuery } from '../core/types';
import { http, transformResponse } from '../core/http';
import { gdoic } from '../../utils/factory';

export interface GetRecommendMapsParams extends Partial<IListRequestQuery>{
  newRecordPercent?: number[];
  passPercent?: number[];
  difficulty?: number[];
  search?: string;
  keyCount?: KeyCount | KeyCount[];
  gameMode?: GameMode;
  hidePlayed?: 0 | 1;
}

export const getRecommendMaps = async (params: GetRecommendMapsParams) => {
  const query: GetRecommendMapsParams = {
    ...params,
    ...gdoic(params.newRecordPercent, {
      newRecordPercent: params.newRecordPercent?.map(item => item / 100),
    }),
    ...gdoic(params.passPercent, {
      passPercent: params.passPercent?.map(item => item / 100),
    }),
  };
  const res = await http.get('/api/v1/self/maps/recommend', {
    params: query,
    paramsSerializer(query) {
      return qs.stringify(query, {
        arrayFormat: 'comma',
      });
    },
  });
  const data = transformResponse(res);
  return transformList<RecommendTableItem>(data, v => v);
};
