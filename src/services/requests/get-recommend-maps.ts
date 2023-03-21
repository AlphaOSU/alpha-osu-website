import qs from 'qs';
import { gdoic } from '../../utils/factory';
import { KeyCount, RecommendTableItem } from '../../data/table';
import { GameMode } from '../../data/enums/game-mode';
import { PpRule } from '../../data/enums/pp-rule';
import { transformList } from '../tools/transform-list';
import { IListRequestQuery } from '../core/types';
import { http, transformResponse } from '../core/http';

export interface GetRecommendMapsParams extends Partial<IListRequestQuery>{
  newRecordPercent?: number[];
  passPercent?: number[];
  difficulty?: number[];
  search?: string;
  keyCount?: KeyCount | KeyCount[];
  gameMode?: GameMode;
  hidePlayed?: 0 | 1;
  rule?: PpRule;
  mod?: string[];
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
    // Force use pp v4
    rule: PpRule.V4,
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
