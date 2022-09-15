import { i18n } from '../../i18n';

export const getErrorMessage = (code: number) => {
  const key = `service-error__${code}`;
  return i18n.t(key, i18n.t('service-error__10600'));
};
