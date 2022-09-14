import { Button, Dropdown, Menu } from 'antd';
import { useCreation } from 'ahooks';
import { Language, useTranslation } from '../../i18n';
import { useCookieLanguage } from '../../hooks/useCookieLanguage';

export const LanguageSwitch = () => {
  const [, setLanguage] = useCookieLanguage();
  const { t } = useTranslation();

  const languageItems = useCreation(() => {
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

  return (
    <Dropdown
      overlay={(
        <Menu items={languageItems} />
      )}
    >
      <Button type="dashed">
        {t('common-language')}
      </Button>
    </Dropdown>
  );
};
