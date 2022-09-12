import { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zh from 'antd/lib/locale/zh_CN';
import en from 'antd/lib/locale/en_US';
import type { Locale } from 'antd/es/locale-provider';
import { useCookieLanguage } from '../hooks/useCookieLanguage';
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Login } from '../pages/Login';
import { changeLanguage, Language } from '../i18n';
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
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/about" component={About} />
            <Redirect to="/home" />
          </Switch>
        </Layout>
      </BrowserRouter>
    </ConfigProvider>
  );
};
