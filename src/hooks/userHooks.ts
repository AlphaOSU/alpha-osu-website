import { useLocalStorageState } from 'ahooks';
import { useAction } from '../common/dvaHooks';
import { LOCAL_USER_META_KEY } from '../common/constants';
import { UserMeta } from '../data/user-meta';
import { isJson } from '../utils/is-json';

export const useSetUserMeta = () => {
  return useAction<UserMeta>('global/setUserMeta');
};

type Result = {
  userMeta?: UserMeta;
  setLocalUserMeta: (value: UserMeta) => void;
  clearLocalUserMeta: () => void;
};

export const useLocalUserMeta = (): Result => {
  const [userMeta, setLocalUserMeta] = useLocalStorageState<UserMeta | undefined>(LOCAL_USER_META_KEY, {
    defaultValue: undefined,
    deserializer: (value) => {
      if (isJson(value)) {
        return JSON.parse(value) as UserMeta;
      } else {
        return undefined;
      }
    },
    serializer: (value) => {
      return JSON.stringify(value);
    },
  });

  return {
    userMeta,
    setLocalUserMeta,
    clearLocalUserMeta() {
      setLocalUserMeta(undefined);
    },
  };
};
