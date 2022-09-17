import type { WithNull } from '../utils/types-util';
import { UserMeta } from '../data/user-meta';
import { LOCAL_USER_META_KEY } from '../common/constants';
import { isJson } from '../utils/is-json';
import { getConfig } from '../services/requests/get-config';
import { Config } from '../data/config';
import { IModel } from './types';

export interface IGlobalState {
  config: Config;
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
    setConfig(state, { payload }) {
      return {
        ...state,
        config: payload,
      };
    },
  },
  subscriptions: {
    async setup({ dispatch }) {
      const meta = localStorage.getItem(LOCAL_USER_META_KEY) || '';
      if (isJson(meta)) {
        dispatch({
          type: 'setUserMeta',
          payload: JSON.parse(meta),
        });
      }

      try {
        const config = await getConfig();
        dispatch({
          type: 'setConfig',
          payload: config,
        });
      } catch {
        // do nothing
      }
    },
  },
};

export default model;
