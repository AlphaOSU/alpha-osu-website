import { Dispatch } from 'redux';
import { useDispatch as _useDispatch, useSelector as _useSelector } from 'dva';
import { useMemoizedFn } from 'ahooks';
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
  return useMemoizedFn((payload?: T) => {
    dispatch({
      type: action,
      ...gdoic(payload, { payload }),
    });
  });
};
