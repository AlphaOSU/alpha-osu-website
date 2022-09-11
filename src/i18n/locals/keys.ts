import { ArrayToUnion } from '../../utils/types-util';

type Keys = [
  'app-description', // pp 谱面推荐
  'app-title', // AlphaOsu!
  'common-difficulty', // 难度
  'common-exit', // 退出
  'common-map', // 谱面
  'common-mod', // mod
  'label-current-pp', // 当前 pp
  'label-current-score', // 目前得分
  'label-current-user', // 当前玩家：
  'label-new-record-probability', // 破纪录概率
  'label-pass-probability', // pass 概率
  'label-pp-increment', // 破纪录 pp 提升
  'label-pp-increment-expect', // pp 提升潜力
  'label-predict-score', // 预测得分
  'player-real-ranking', // 玩家实力榜
  'player-who-related-with-you', // 与你实力相近的玩家
  'pp-personal-recommend-system', // pp 个性化推荐系统
];

export type I18nKeys = ArrayToUnion<Keys>;
