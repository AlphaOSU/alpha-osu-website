import { useCookieLanguage } from '../../../hooks/useCookieLanguage';
import { Language } from '../../../i18n';
import { AboutEn } from './en';
import { AboutCn } from './cn';

export const Algorithm = () => {
  const [language] = useCookieLanguage();

  return (
    <div className="about-content">
      {
        language === Language.ZH
          ? <AboutCn />
          : <AboutEn />
      }
    </div>
  );
};
