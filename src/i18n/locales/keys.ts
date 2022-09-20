import { ArrayToUnion } from '../../utils/types-util';

type Keys = [
  'app-description', // 使用机器学习来帮你在 osu! 刷 PP
  'app-title', // AlphaOsu!
  'app-about', // 关于
  'common-difficulty', // 难度
  'common-exit', // 退出
  'common-key-count', // key count
  'common-language', // 语言
  'common-login', // 登录
  'common-map', // 谱面
  'common-mod', // mod
  'common-game-mode', // 游戏模式
  'form-error-message-username', // 请输入用户名
  'form-error-message-username-length', // 用户名长度在 4 到 16 个字符
  'player-username', // 玩家
  'player-similarity', // 玩家相似度
  'label-date-update-time', // 数据更新时间
  'label-hide-played', // 隐藏已玩过的谱面
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
  'similarity-user', // 相似实力玩家
  'tooltip-current-score', // 数据来源：个人BP榜、ranked图的NM、DT、HT榜以及对应的CN榜
  'tooltip-user-similarity', // 值越接近0，表示你和该玩家各方面的能力越接近
  'tooltip-pass-probability', // 在最佳状态下，这张图能存活并且进入BP榜的概率
  'tooltip-pp-increment', // 在破纪录的情况下，平均能增加多少的个人总PP值。
  'tooltip-pp-increment-expect', // PP 提升潜力 = PP 提升（破纪录）× 破纪录概率 × Pass 概率，表示这张图能带给你 PP 提升的期望。
  'tooltip-recommend-not-accurate', // 由于数据缺乏，本推荐结果可能不准确
  'user-login-history', // 登录历史
  'contact-label-name', // 姓名
  'contact-us-label-title', // 联系我们
  'contact-label-email', // 邮箱
  'contact-label-role', // 介绍
  'contact-table-title', // 开发成员
  'contact-table-acknowledgement-title', // 致谢
  'role-rain7',
  'role-kuit',
  'role-xz',
  'service-error__10500',
  'service-error__10404',
  'service-error__10403',
  'service-error__10400',
  'service-error__10600',
];

export type I18nKeys = ArrayToUnion<Keys>;
