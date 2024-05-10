/* eslint-disable max-len */
import { I18nKeys } from './keys';

const resource: Record<I18nKeys, string> = {
  'app-description': '使用先进的机器学习技术来帮你在 osu! 刷 PP',
  'app-title': 'AlphaOsu!',
  'app-about': '关于',
  'app-loading': '正在加载系统配置...',
  'button-refresh-data-now': '立即同步 osu! 数据',
  'common-difficulty': '难度',
  'common-exit': '退出',
  'common-key-count': '键数',
  'common-language': '简体中文',
  'common-login': '登录',
  'common-map': '谱面',
  'common-mod': 'MOD',
  'common-game-mode': '游戏模式',
  'common-pp-rule': 'PP 计算规则',
  'form-error-message-username': '请输入用户名',
  'form-error-message-username-length': '用户名长度在 1 到 30 个字符',
  'player-username': '玩家',
  'player-similarity': '玩家相似度',
  'label-date-update-time': '数据更新时间：',
  'label-hide-played': '隐藏游玩过的谱面',
  'label-current-pp': '目前 pp',
  'label-current-score': '目前得分',
  'label-current-user': '当前玩家：',
  'label-new-record-probability': '破纪录概率',
  'label-pass-probability': '上榜概率',
  'label-pp-increment': 'pp 提升（破纪录）',
  'label-pp-increment-expect': 'pp 提升潜力',
  'label-predict-score': '预测得分',
  'label-predict-pp': '预测 pp',
  'label-difficulty': '难度星级',
  'label-filter-maps': '过滤谱面',
  'label-current-accuracy': '当前 PP Acc.',
  'label-predict-accuracy': '预测 PP Acc.',
  'label-pp-calc-score': '分数',
  'label-pp-calc-accuracy': '加权准确度',
  'placeholder-input-username': 'osu! 用户名',
  'placeholder-search-map-name': '谱面名称，谱面 id， 谱面作者或版本',
  'player-real-ranking': '玩家实力榜',
  'player-who-related-with-you': '与你实力相近的玩家',
  'pp-personal-recommend-system': 'pp 个性化推荐系统',
  'similarity-user': '实力相近的玩家',
  'label-total-maps': '共 {{total}} 张谱面',
  'label-current-search-maps': '搜索谱面',
  'tooltip-current-score': '数据来源：个人 BP 榜、ranked 图的 NM、DT、HT 榜以及对应的 CN 榜',
  'tooltip-user-similarity': '值越接近0，表示你和该玩家各方面的能力越接近',
  'tooltip-pass-probability': '在最佳状态下，这张图能存活并且进入 BP 榜的概率',
  'tooltip-pp-increment': '在破纪录的情况下，平均能增加多少的个人总PP值。',
  'tooltip-pp-increment-expect': 'PP 提升潜力 = PP 提升（破纪录）× 破纪录概率 × Pass 概率，表示这张图能带给你 PP 提升的期望。',
  'tooltip-recommend-not-accurate': '由于数据缺乏，本推荐结果可能不准确',
  'tooltip-current-accuracy': '与 PP 计算相关的准确率，其中 MAX=320/320, 300=300/320, 200=200/320, 100=100/320, 50=50/320, miss=0',
  'user-login-history': '历史登录账号',
  'support-us-label-title': '支持我们',
  'support-us-description-label': '说明', // 说明
  'support-us-description-content': 'AlphaOSU 的开销包含了服务器日常费用、带宽费用和开发费用。由于我们的开发者大部分由学生组成，收入有限，所以希望有能力的人能赞助 AlphaOSU 的运行。非常感谢大家的支持！请注意，您的捐助不会即时显示，需要一段时间后等待我们手动录入，请知悉。',
  'support-us-ali-pay': '支付宝', // 支付宝
  'support-us-wechat-pay': '微信支付', // 微信
  'support-us-others-pay': '其他支付方式',
  'support-us-paypal-pay': 'Paypal',
  'useful-link-table-title': '友情链接',
  'useful-link-opal': 'Opal',
  'useful-link-opal-description': 'osu!mania 准确率预测网站——',
  'useful-link-opal-link': '这就去看看！',
  'donation-progress-bar-title': '捐赠进度',
  'donation-raised-text': '已筹',
  'donation-goal-text': '目标',
  'contact-label-name': '昵称',
  'contact-label-email': '邮箱',
  'contact-label-role': '介绍',
  'contact-table-title': '开发成员',
  'contact-table-acknowledgement-title': '致谢',
  'contact-us-label-title': '联系我们',
  'role-rain7': 'AlphaOsu 网站开发',
  'role-kuit': 'AlphaOsu 网站服务端和算法设计与开发',
  'role-ca': 'AlphaOsu 算法开发',
  'role-xz': '项目发起人并参与算法设计',
  'role-qr': '前服务器提供者',
  'service-error__10500': '服务器开小差了，请稍后重试~',
  'service-error__10503': '连接到 osu 服务失败，请稍后重试。若问题未解决，请联系我们。',
  'service-error__10513': '刷新数据太过频繁，请一段时间后重试！',
  'service-error__10404': '用户名不存在、游戏模式暂不支持或账号排名超出机器学习训练范围',
  'service-error__10403': 'Uid 不合法',
  'service-error__10400': '请求参数不合法',
  'service-error__10600': '未知错误',
};

export const zh = {
  translation: resource,
};
