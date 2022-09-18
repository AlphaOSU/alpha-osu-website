import styled from 'styled-components';

export const LayoutWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
`;

export const MainWrapper = styled.div`
  width: 100%;
  margin: 60px auto;
  box-sizing: border-box;
  padding: 20px 40px 120px;
`;

export const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  z-index: 9;
  background-color: rgb(57, 134, 172);
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
  display: flex;
  height: 60px;
  flex-direction: row;
  align-items: center;
  
  .title {
    color: #ffffff;
    margin-left: 20px;
  }
`;

export const NavRight = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  height: 60px;
  color: #ffffff;
  flex: 1;
  
  .nav-container {
    flex: 1;
  }

  .nav-menu {
    height: 40px;
    background-color: transparent;
    border-bottom: none;
    margin-left: 20px;

    .nav-menu-item.ant-menu-item {
      line-height: 40px;

      a {
        color: #ffffff;
      }

      &::after {
        border: none;
      }

      &:hover::after, &.ant-menu-item-selected::after {
        height: 3px;
        border-radius: 1.5px;
        background-color: rgb(102, 204, 255);
      }
    }
  }
`;

export const NavItem = styled.div`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  a {
    height: 60px;
    padding: 0 20px;
    line-height: 60px;
    white-space: nowrap;
    color: #ffffff;
    
    .link-button {
      color: #ffffff;
    }
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
