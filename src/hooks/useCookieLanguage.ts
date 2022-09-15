import { useCookieState } from 'ahooks';
import { Language } from '../i18n';

export const useCookieLanguage = (): [Language, (newValue: Language) => void] => {
  const defaultLanguage = window?.navigator?.language === 'zh-CN' ? Language.ZH : Language.EN;
  const [language, setLanguage] = useCookieState('language', {
    defaultValue: defaultLanguage,
  });

  return [language as Language, setLanguage];
};
