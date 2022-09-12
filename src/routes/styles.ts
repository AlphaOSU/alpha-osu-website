import styled from 'styled-components';

export const LayoutWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
`;

export const MainWrapper = styled.div`
  width: 100%;
  padding: 20px 80px 40px;
  margin: 60px auto;
  box-sizing: border-box;
  background-color: #fff;
`;

export const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  z-index: 9;
  background-color: #fff;
  box-shadow: 0 6px 16px -8px #00000014, 0 9px 8px #0000000d, 0 12px 48px 16px #00000008;;
`;

export const Nav = styled.nav`
  width: 100%;
  padding: 0 40px;
  height: 60px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const NavLeft = styled.div`
  display: block;
  height: 60px;
  flex: 1;
  
  .nav-menu {
    height: 60px;
    
    .nav-menu-item {
      line-height: 60px;
    }
  }
`;

export const NavRight = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 60px;
`;

export const NavItem = styled.li`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  a {
    height: 60px;
    padding: 0 20px;
    line-height: 60px;
    white-space: nowrap;
  }
`;

export const FooterWrapper = styled.footer`
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  background-color: #e9e9e9;
`;

export const ExitButton = styled.div`
  color: red;
`;
