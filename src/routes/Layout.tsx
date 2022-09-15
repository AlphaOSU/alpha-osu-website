import { ReactNode } from 'react';
import { LayoutWrapper, MainWrapper } from './styles';
import { Navigator } from './Navigator';
import { PageFooter } from './PageFooter';

export const Layout = ({ children }: { children: ReactNode }) => {
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
