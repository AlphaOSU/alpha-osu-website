import React, { ReactNode } from 'react';
import { Spin } from 'antd';
import { useTranslation } from '../i18n';
import { useConfig } from '../hooks/useConfig';
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
      <Navigator />
      <MainWrapper>
        {children}
      </MainWrapper>
      <PageFooter />
    </LayoutWrapper>
  );
};
