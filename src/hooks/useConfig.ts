import { ConfigKeys } from '../common/config-keys';
import { useSelector } from '../common/dvaHooks';

export const useConfig = <T = string>(key: ConfigKeys, format?: (value: string) => T): T => {
  const config = useSelector(({ global }) => global.config);
  const preValue = config[key] || '';
  return format?.(preValue) || preValue;
};

export const useSwitchConfig = (grayKey: ConfigKeys): boolean => {
  const config = useConfig(grayKey);
  return 'true' === config;
};
