import { useCookieLanguage } from '../../hooks/useCookieLanguage';
import { Language } from '../../i18n';
import { Container } from './styles';
import { AboutCn } from './cn';
import { AboutEn } from './en';

export const About = () => {
  const [language] = useCookieLanguage();

  return (
    <Container>
      {
        language === Language.ZH
          ? <AboutCn />
          : <AboutEn />
      }
    </Container>
  );
};
