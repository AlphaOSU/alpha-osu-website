import { GameMode } from './enums/game-mode';
import { KeyCount } from './table';

export interface UserMeta {
  uid: string;
  keyCount?: KeyCount;
  gameMode: GameMode;
  username?: string;
  mod?: string[];
}
