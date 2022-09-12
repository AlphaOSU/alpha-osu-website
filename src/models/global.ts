import type { WithNull } from '../utils/types-util';
import { ConfigKeys } from '../common/config-keys';
import { UserMeta } from '../data/user-meta';
import { LOCAL_USER_META_KEY } from '../common/constants';
import { isJson } from '../utils/is-json';
import { IModel } from './types';

export interface IGlobalState {
  config: Partial<Record<ConfigKeys, any>>;
  userMeta: UserMeta;
}

export const initState: WithNull<IGlobalState> = {
  config: {},
  userMeta: null,
};

const model: IModel<WithNull<IGlobalState>> = {
  namespace: 'global',
  state: initState,
  reducers: {
    setUid(state, { payload }) {
      return {
        ...state,
        uid: payload,
      };
    },
    setUserMeta(state, { payload }) {
      return {
        ...state,
        userMeta: payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      const meta = localStorage.getItem(LOCAL_USER_META_KEY) || '';
      if (isJson(meta)) {
        dispatch({
          type: 'setUserMeta',
          payload: JSON.parse(meta),
        });
      }
    },
  },
};

export default model;
