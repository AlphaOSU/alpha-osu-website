import { Mod } from './mod';

export type KeyCount = 4 | 7;

export interface RecommendListItem {
  id: string;
  mapName: string;
  mapLink: string;
  mod: Mod[];
  difficulty: number;
  keyCount?: KeyCount;
  currentScore: number;
  currentScoreLink: string;
  currentPP: number;
  predictScore: number;
  predictPP: number;
  newRecordPercent: number;
  ppIncrement: number;
  passPercent: number;
  ppIncrementExpect: number;
}
