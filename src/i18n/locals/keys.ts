import { ArrayToUnion } from '../../utils/types-util';

type Keys = [
  'app-description', // pp 谱面推荐
  'app-title', // AlphaOsu!
  'common-difficulty', // 难度
  'common-exit', // 退出
  'common-key-count', // key count
  'common-language', // 语言
  'common-login', // 登录
  'common-map', // 谱面
  'common-mod', // mod
  'common-game-mode', // 游戏模式
  'label-current-pp', // 当前 pp
  'label-current-search-maps', // 搜索谱面
  'label-current-score', // 目前得分
  'label-current-user', // 当前玩家：
  'label-new-record-probability', // 破纪录概率
  'label-pass-probability', // pass 概率
  'label-pp-increment', // 破纪录 pp 提升
  'label-pp-increment-expect', // pp 提升潜力
  'label-predict-score', // 预测得分
  'label-predict-pp', // 预测 pp
  'label-total-maps', // 共 {{total}} 张谱面
  'placeholder-input-username', // 用户名
  'placeholder-search-map-name', // 谱面名称，谱面 id， 谱面作者或版本
  'player-real-ranking', // 玩家实力榜
  'player-who-related-with-you', // 与你实力相近的玩家
  'pp-personal-recommend-system', // pp 个性化推荐系统
  'tooltip-no-score', // 数据来源：个人BP榜、ranked图的NM、DT、HT榜以及对应的CN榜
];

export type I18nKeys = ArrayToUnion<Keys>;
