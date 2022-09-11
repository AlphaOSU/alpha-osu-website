import { useCallback } from 'react';
import { Dispatch } from 'redux';
import {
  useSelector as _useSelector,
  useDispatch as _useDispatch,
} from 'dva';
import { gdoic } from '../utils/factory';
import { ICustomAction, IRootState } from '../models/types';

export const useSelector = <TState = IRootState, TSelected = unknown>(
  selector: (state: TState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean,
) => {
  return _useSelector(selector, equalityFn);
};

export const useDispatch = (): Dispatch<ICustomAction> => {
  return _useDispatch();
};

export const useAction = <T = any>(action: string) => {
  const dispatch = useDispatch();
  return useCallback((payload?: T) => {
    dispatch({
      type: action,
      ...gdoic(payload, { payload }),
    });
  }, [dispatch, action]);
};
