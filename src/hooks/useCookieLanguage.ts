import { useCookieState } from 'ahooks';
import { Language } from '../i18n';

export const useCookieLanguage = (): [Language, (newValue: Language) => void] => {
  const [language, setLanguage] = useCookieState('language', {
    defaultValue: Language.ZH,
  });

  return [language as Language, setLanguage];
};
