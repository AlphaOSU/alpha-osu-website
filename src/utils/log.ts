import { __DEV__ } from '../common/env';

export const devLog = (...args: any[]) => {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
};

export const prodLog = (...args: any[]) => {
  // eslint-disable-next-line no-console
  console.log(...args);
};
