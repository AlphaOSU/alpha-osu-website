import { useCallback } from 'react';
import i18next from 'i18next';
import { initReactI18next, useTranslation as _useTranslation } from 'react-i18next';
import { devLog } from '../utils/log';
import { resources } from './resources';
import type { I18nKeys } from './locales/keys';

export enum Language {
  EN = 'en',
  ZH = 'zh',
}

export const DEFAULT_LANGUAGE = 'zh';

type TranslationFunctionType = (key: I18nKeys, options?: Record<string, string>) => string;

export const initI18n = () => {
  i18next
    .use(initReactI18next)
    .init({
      resources,
      lng: DEFAULT_LANGUAGE,
      interpolation: {
        escapeValue: false,
      },
    })
    .then(() => {
      devLog('[i18next] init success');
    });
};

export const t = (key: I18nKeys, options?: Record<string, string>): string => {
  return i18next.t<string, I18nKeys>(key, options);
};

export const i18n = i18next;

export const useTranslation = () => {
  const { t, ...restMembers } = _useTranslation();

  const translation: TranslationFunctionType = useCallback((...args) => {
    return t<I18nKeys>(...args);
  }, [t]);

  return {
    t: translation,
    ...restMembers,
  };
};

export const changeLanguage = async (language: Language) => {
  await i18n.changeLanguage(language);
};

export const getCurrentLanguage = (): Language => {
  return i18next.language as Language;
};
