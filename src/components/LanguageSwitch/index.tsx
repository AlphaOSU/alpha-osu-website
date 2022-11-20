import { Button, Dropdown } from 'antd';
import { useCreation } from 'ahooks';
import { Language, useTranslation } from '../../i18n';
import { useCookieLanguage } from '../../hooks/useCookieLanguage';

export const useLanguageItems = () => {
  const [, setLanguage] = useCookieLanguage();

  return useCreation(() => {
    return [
      {
        label: '简体中文',
        key: Language.ZH,
        onClick() {
          setLanguage?.(Language.ZH);
          location.reload();
        },
      },
      {
        label: 'English',
        key: Language.EN,
        onClick() {
          setLanguage?.(Language.EN);
          location.reload();
        },
      },
    ];
  }, []);
};

export const LanguageSwitch = () => {
  const languageItems = useLanguageItems();
  const { t } = useTranslation();

  return (
    <Dropdown menu={{ items: languageItems }}>
      <Button type="dashed">
        {t('common-language')}
      </Button>
    </Dropdown>
  );
};
