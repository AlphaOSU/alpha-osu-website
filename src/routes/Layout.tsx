import React, { ReactNode } from 'react';
import { Spin } from 'antd';
import { useConfig } from '../hooks/useConfig';
import { LayoutWrapper, MainWrapper } from './styles';
import { Navigator } from './Navigator';
import { PageFooter } from './PageFooter';

export const Layout = ({ children }: { children: ReactNode }) => {
  const config = useConfig();

  if (config === null) {
    return <Spin />;
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
