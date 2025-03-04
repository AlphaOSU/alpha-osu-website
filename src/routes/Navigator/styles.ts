import styled from 'styled-components';

export const Nav = styled.nav`
  width: 100%;
  height: 60px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;

  &.pc-nav {
    min-width: 1280px;
    padding: 0 40px;
    box-sizing: border-box;
  }
`;

export const MobileNavWrapper = styled.div`
  min-width: 320px;
  overflow: visible;
  box-sizing: border-box;
  display: flex;

  .mobile-title {
    color: #ffffff;
  }

  .mobile-collapse-panel {
    width: 100%;
    position: absolute;
    top: 0;
    padding: 0;

    .ant-collapse-header {
      height: 60px;
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      
      .ant-collapse-expand-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        
        .anticon {
          font-size: 16px;
          color: #ffffff;
        }
      }

      .mobile-collapse-panel-header {
        box-sizing: border-box;
        height: 60px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
    }

    .ant-collapse-content {
      padding: 0 20px;
      background-color: #fff;
      box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d;
      
      .ant-collapse-content-box {
        padding: 0;
      }
    }
  }
  
  .nav-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    
    .mobile-nav-item {
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      
      .mobile-nav-link {
        color: #1890ff;
      }
    }
    
    .user-info-items {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: 40px;
      
      .link-button.danger {
        color: red;
        margin-left: 20px;
      }
      
      .link-button {
        color: #1890ff;
      }
    }
    
    .language-items {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: 40px;
      color: #1890ff;
      
      .language-item:hover {
        cursor: pointer;
      }
      
      .language-item + .language-item {
        margin-left: 20px;
      }
    }
  }
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


export const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  z-index: 9;
  background-color: rgb(57, 134, 172);
`;
