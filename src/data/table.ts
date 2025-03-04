import { Mod } from './enums/mod';

export type KeyCount = 4 | 7;

export interface RecommendTableItem {
  id: string;
  mapName: string;
  mapLink: string;
  mapCoverUrl: string;
  mod: Mod[];
  difficulty: number;
  keyCount?: KeyCount;
  currentScore?: number;
  currentScoreLink?: string;
  currentAccuracy?: number;
  currentAccuracyLink?: string;
  currentPP: number;
  currentMod: Mod[];
  predictScore: number;
  predictPP: number;
  newRecordPercent: number;
  ppIncrement: number;
  passPercent: number;
  ppIncrementExpect: number;
  accurate: boolean;
  bpm: number;
  length: number;
  sliderRatio: number;
}

export interface SimilarityUser {
  id: string;
  username: string;
  userLink: string;
  pp: number;
  similarity: number;
}
