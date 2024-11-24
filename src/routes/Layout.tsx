import { Spin } from 'antd';
import { ReactNode } from 'react';
import { DarkModeProvider } from '../components/DarkModeToggle';

import { useConfig } from '../hooks/useConfig';
import { useTranslation } from '../i18n';
import { Navigator } from './Navigator';
import { PageFooter } from './PageFooter';
import { LayoutWrapper, MainWrapper, SpinWrapper } from './styles';


export const Layout = ({ children }: { children: ReactNode }) => {
  const config = useConfig();
  const { t } = useTranslation();

  if (config === null) {
    return (
      <SpinWrapper>
        <Spin size="large" tip={t('app-loading')} />
      </SpinWrapper>
    );
  }

  return (
    <LayoutWrapper>
      <DarkModeProvider>
        <Navigator />
        <MainWrapper>
          {children}
        </MainWrapper>
        <PageFooter />
      </DarkModeProvider>
    </LayoutWrapper>
  );
};
