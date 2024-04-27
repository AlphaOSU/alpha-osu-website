import { request, transformResponse } from '../core/http';
import { GameMode } from '../../data/enums/game-mode';

export const refreshData = async (gameMode?: GameMode) => {
  const res = await request.post(`/api/v1/self/users/synchronize?gameMode=${gameMode}`, {
    gameMode,
  });
  transformResponse(res);
};
