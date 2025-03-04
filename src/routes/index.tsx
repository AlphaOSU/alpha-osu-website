import { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zh from 'antd/lib/locale/zh_CN';
import en from 'antd/lib/locale/en_US';
import { Locale } from 'antd/lib/locale';
import { useCookieLanguage } from '../hooks/useCookieLanguage';
import { Recommend } from '../pages/Recommend';
import { SimilarityUsers } from '../pages/SimilarityUsers';
import { About } from '../pages/About';
import { Login } from '../pages/Login';
import { changeLanguage, Language } from '../i18n';
import { SupportUs } from '../pages/SupportUs';
import { Layout } from './Layout';

export const Routes = () => {
  const [language] = useCookieLanguage();
  const [locale, setLocale] = useState<Locale>(zh);

  useEffect(() => {
    changeLanguage(language);
    setLocale(
      language === Language.ZH
        ? zh
        : en,
    );
  }, [language]);

  return (
    <ConfigProvider locale={locale}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/self/pp-recommend" component={Recommend} />
            <Route path="/self/similarity-users" component={SimilarityUsers} />
            <Route path="/login" component={Login} />
            <Route path="/about" component={About} />
            <Route path="/support" component={SupportUs} />
            <Redirect to="/self/pp-recommend" />
          </Switch>
        </Layout>
      </BrowserRouter>
    </ConfigProvider>
  );
};
