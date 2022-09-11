import type { EffectType, SubscriptionsMapObject } from 'dva';
import type { Action } from 'redux';
import { IGlobalState } from './global';

export type IReducer<S, A> = (prevState: S, action: A) => S;

export interface ICustomAction<T = any> extends Action {
  [key: string]: any;
  type: string;
  payload?: T;
}


export interface EffectsCommandMap<State = any> {
  put: <A extends ICustomAction>(action: A) => any;
  call: (...args: any) => any;
  select: <K>(selector: (state: State) => K) => K;
  take: (...args: any) => any;
  cancel: (...args: any) => any;
  [key: string]: any;
}

export type Effect<State = any, Payload = any> =
  (action: ICustomAction<Payload>, effects: EffectsCommandMap<State>) => void;

export type EffectWithType<State = any, Payload = any> = [Effect<State, Payload>, { type: EffectType }]

export interface IModel<State = any, Payload = any> {
  namespace?: string;
  state?: State;
  reducers?: {
    [key: string]: IReducer<State, ICustomAction<Payload>>;
  };
  effects?: {
    [key: string]: Effect<State, Payload> | EffectWithType;
  };
  subscriptions?: SubscriptionsMapObject;
}

export interface IRootState {
  global: IGlobalState;
}
