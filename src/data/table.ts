import { Mod } from './mod';

export type KeyCount = 4 | 7;

export interface RecommendTableItem {
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
  accurate: boolean;
}

export interface SimilarityUser {
  id: string;
  username: string;
  userLink: string;
  pp: number;
  similarity: number;
}
