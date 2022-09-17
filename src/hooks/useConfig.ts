import { useSelector } from '../common/dvaHooks';

export const useConfig = () => {
  return useSelector(state => state.global.config);
};
