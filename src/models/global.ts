import { ConfigKeys } from '../common/config-keys';
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
};

export default model;
