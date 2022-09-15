import { useLocalStorageState, useMemoizedFn } from 'ahooks';
import { uniq } from 'lodash';
import { LOCAL_USER_HISTORY } from '../common/constants';
import { isJson } from '../utils/is-json';

export const useLocalUserHistory = () => {
  const [userList, setUserList] = useLocalStorageState<string[]>(
    LOCAL_USER_HISTORY,
    {
      defaultValue: [],
      deserializer(value) {
        if (value && isJson(value)) {
          return JSON.parse(value);
        }

        return [];
      },
      serializer(value) {
        return JSON.stringify(value);
      },
    },
  );

  const addUser = useMemoizedFn((username: string) => {
    setUserList((prev = []) => uniq([...prev, username]));
  });

  const removeUser = useMemoizedFn((username: string) => {
    setUserList((prev = []) => prev.filter(u => u !== username));
  });

  const clear = useMemoizedFn(() => {
    setUserList([]);
  });

  return {
    list: userList,
    addUser,
    removeUser,
    clear,
  };
};
