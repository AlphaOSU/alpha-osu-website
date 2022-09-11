import styled from 'styled-components';

export const LayoutWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
`;

export const MainWrapper = styled.div`
  max-width: 1440px;
  padding: 20px 0 160px;
  margin: 60px auto;
  box-sizing: border-box;
  background-color: #fff;
`;

export const Header = styled.header`
  width: 100%;
  height: 60px;
  background-color: #fff;
  box-shadow: 0 6px 16px -8px #00000014, 0 9px 8px #0000000d, 0 12px 48px 16px #00000008;;
`;

export const Nav = styled.nav`
  max-width: 1440px;
  height: 60px;
  margin: 0 auto;
`;

export const NavList = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 60px;
`;

export const NavItem = styled.li`
  height: 60px;
  
  a {
    height: 60px;
    padding: 0 20px;
    line-height: 60px;
    white-space: nowrap;
  }
`;

export const FooterWrapper = styled.footer`
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 160px;
  background-color: #e9e9e9;
`;
