import { useCookieLanguage } from '../../../hooks/useCookieLanguage';
import { Language } from '../../../i18n';
import { AboutEn } from './en';
import { AboutCn } from './cn';
import { Container } from './styles';

export const Algorithm = () => {
  const [language] = useCookieLanguage();

  return (
    <Container className="about-content">
      {
        language === Language.ZH
          ? <AboutCn />
          : <AboutEn />
      }
    </Container>
  );
};
