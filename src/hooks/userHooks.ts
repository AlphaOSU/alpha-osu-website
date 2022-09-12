import { useLocalStorageState } from 'ahooks';
import { useAction } from '../common/dvaHooks';
import { LOCAL_USER_META_KEY } from '../common/constants';
import { UserMeta } from '../data/user-meta';
import { isJson } from '../utils/is-json';

export const useSetUserMeta = () => {
  return useAction<UserMeta>('global/setUserMeta');
};

export const useLocalUserMeta = (): [UserMeta | null, (value: UserMeta) => void] => {
  const [userMeta, setUserMeta] = useLocalStorageState<UserMeta | null>(LOCAL_USER_META_KEY, {
    defaultValue: null,
    deserializer: (value) => {
      if (isJson(value)) {
        return JSON.parse(value) as UserMeta;
      } else {
        return null;
      }
    },
    serializer: (value) => {
      return JSON.stringify(value);
    },
  });

  return [userMeta, setUserMeta];
};
