import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { useTranslation } from '../../i18n';
import { useSelector } from '../../common/dvaHooks';
import { useLocalUserMeta, useSetUserMeta } from '../../hooks/userHooks';
import { Logo } from '../../components/Logo';
import { LanguageSwitch } from '../../components/LanguageSwitch';
import { useLocalFilterQuery } from '../../hooks/useLocalFilterQuery';
import { Header, Nav, NavItem, NavLeft, NavRight } from './styles';
import { useRouteConfig } from './route-config';

const RouteMenu = () => {
  const { pathname } = useLocation();
  const routeConfig = useRouteConfig();

  return (
    <Menu
      mode="horizontal"
      className="nav-menu"
      defaultSelectedKeys={[pathname]}
      activeKey={pathname}
      multiple={false}
      items={routeConfig.map((item) => {
        return {
          key: item.path,
          label: <NavLink to={item.path}>{item.label}</NavLink>,
          className: 'nav-menu-item',
        };
      })}
    />
  );
};

export const PcNav = () => {
  const { t } = useTranslation();
  const userMeta = useSelector(state => state.global.userMeta);
  const { username = '', uid = '' } = userMeta || {};
  const setUserMeta = useSetUserMeta();
  const { setQuery } = useLocalFilterQuery();
  const { clearLocalUserMeta } = useLocalUserMeta();

  const usernameRender = useMemoizedFn(() => (
    <NavItem>
      <a
        href={`https://osu.ppy.sh/users/${uid}`}
        rel="noreferrer"
        target="_blank"
      >
        <span>{username}</span>
      </a>
    </NavItem>
  ));

  const logoutRender = useMemoizedFn(() => (
    <NavItem>
      <Link to="/login">
        <div
          className="link-button"
          onClick={() => {
            clearLocalUserMeta();
            setUserMeta(undefined);
            setQuery(undefined);
          }}
        >
          {t('common-exit')}
        </div>
      </Link>
    </NavItem>
  ));

  const loginRender = useMemoizedFn(() => (
    <NavItem>
      <Link to="/login">
        <div className="link-button">
          {t('common-login')}
        </div>
      </Link>
    </NavItem>
  ));

  return (
    <Header>
      <Nav className="pc-nav">
        <NavLeft>
          <Logo />
          <div className="title">{t('app-title')}</div>
        </NavLeft>
        <NavRight>
          <LanguageSwitch />
          {!username && loginRender()}
          {userMeta && logoutRender()}
          {userMeta && usernameRender()}
          <div className="nav-container">
            <RouteMenu />
          </div>
        </NavRight>
      </Nav>
    </Header>
  );
};
