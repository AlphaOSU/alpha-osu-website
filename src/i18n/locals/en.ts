/* eslint-disable max-len */
import { I18nKeys } from './keys';

const resource: Record<I18nKeys, string> = {
  'app-description': 'Using advanced machine learning technology to help you farm PP in osu!',
  'app-title': 'AlphaOsu!',
  'app-about': 'About',
  'common-difficulty': 'Difficulty',
  'common-exit': 'Log out',
  'common-key-count': 'Key Count',
  'common-language': 'English',
  'common-login': 'Sign In',
  'common-map': 'Map',
  'common-mod': 'MOD',
  'common-game-mode': 'Game Mode',
  'player-username': 'Player',
  'player-similarity': 'Similarity',
  'label-current-pp': 'Current PP',
  'label-current-score': 'Current Score',
  'label-current-user': 'Current User: ',
  'label-new-record-probability': 'Record Breaking Probability',
  'label-pass-probability': 'Pass Probability',
  'label-pp-increment': 'PP Increment (Break Record)',
  'label-pp-increment-expect': 'PP Increment Expect',
  'label-predict-score': 'Predict Score',
  'label-predict-pp': 'Predict PP',
  'placeholder-input-username': 'osu! Username',
  'placeholder-search-map-name': 'Map name, map id, creator or version',
  'player-real-ranking': 'Player Real Ranking',
  'player-who-related-with-you': 'Player with similar strength to you ',
  'pp-personal-recommend-system': 'PP Personal Recommender System',
  'similarity-user': 'Similarity Users',
  'label-total-maps': 'Total {{total}} maps',
  'label-current-search-maps': 'Search Maps',
  'tooltip-no-score': 'Data source: personal best performance, global NM, DT, HT ranking of ranked beatmaps with the corresponding CN country ranking',
  'tooltip-user-similarity': 'The closer the value is to 0, the closer you are to the player\'s abilities in all aspects',
  'tooltip-pass-probability': 'At its best, this graph is expected to survive and make it into the Best Performance',
  'tooltip-pp-increment': 'In a record-breaking situation, how much of an individual\'s total PP can be added on average.',
  'tooltip-pp-increment-expect': 'PP increment Expect = PP Increment (Break Record) × Record Breaking Probability × Pass Probability, Indicates that this chart can give you the expectations that pp will raise.',
};

export const en = {
  translation: resource,
};
