import { ReactNode } from 'react';
import { LayoutWrapper, MainWrapper } from './styles';
import { Navigator } from './Navigator';
import { Footer } from './Footer';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <LayoutWrapper>
      <Navigator />
      <MainWrapper>
        {children}
      </MainWrapper>
      <Footer />
    </LayoutWrapper>
  );
};
