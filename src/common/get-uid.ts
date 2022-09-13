import { isJson } from '../utils/is-json';
import { UserMeta } from '../data/user-meta';
import { LOCAL_USER_META_KEY } from './constants';

export const getUid = (): string => {
  const userMeta = localStorage.getItem(LOCAL_USER_META_KEY);
  if (userMeta && isJson(userMeta)) {
    const meta = JSON.parse(userMeta) as UserMeta;
    return meta.uid;
  }

  return '';
};
