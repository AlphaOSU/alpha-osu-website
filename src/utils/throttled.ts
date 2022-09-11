import { throttle, debounce } from 'lodash';

const DEBOUNCE_TIME = 500;

export const throttled = <T extends (...args: any) => any> (method: T) => {
  return throttle(method, DEBOUNCE_TIME);
};

export const debounced = <T extends (...args: any) => any> (method: T) => {
  return debounce(method, DEBOUNCE_TIME);
};
