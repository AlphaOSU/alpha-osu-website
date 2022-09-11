import { ConfigKeys } from '../common/config-keys';
import { getConfig } from '../services/requests/get-config';
import { IModel } from './types';

export interface IGlobalState {
  config: Partial<Record<ConfigKeys, any>>;
  currentCount: number;
}

export const initState: IGlobalState = {
  config: {},
  currentCount: 0,
};

const model: IModel<IGlobalState> = {
  namespace: 'global',
  state: initState,
  reducers: {
    increment(state, { payload }) {
      return {
        ...state,
        currentCount: payload,
      };
    },
    setConfig(state, { payload }) {
      return {
        ...state,
        config: payload,
      };
    },
  },
  effects: {
    * getConfigAsync(_, { put, call }) {
      const config = yield call(getConfig);
      yield put({
        type: 'setConfig',
        payload: config,
      });
    },
  },
};

export default model;
