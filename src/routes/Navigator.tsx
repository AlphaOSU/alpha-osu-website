import { NavLink } from 'react-router-dom';
import { Nav, Header, NavList, NavItem } from './styles';

export const Navigator = () => {
  return (
    <Header>
      <Nav>
        <NavList>
          <NavItem>
            <NavLink to="/home">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/about">About</NavLink>
          </NavItem>
        </NavList>
      </Nav>
    </Header>
  );
};
