import { Link, NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { useTranslation } from '../i18n';
import { useSelector } from '../common/dvaHooks';
import { useLocalUserMeta, useSetUserMeta } from '../hooks/userHooks';
import { Logo } from '../components/Logo';
import { LanguageSwitch } from '../components/LanguageSwitch';
import { Header, Nav, NavItem, NavLeft, NavRight } from './styles';

const RouteMenu = () => {
  const { t } = useTranslation();

  return (
    <div className="nav-container">
      <Menu
        mode="horizontal"
        className="nav-menu"
        items={[
          {
            key: '/self/recommend',
            label: <NavLink to="/self/recommend">{t('pp-personal-recommend-system')}</NavLink>,
            className: 'nav-menu-item',
          },
          {
            key: '/about',
            label: <NavLink to="/about">{t('app-about')}</NavLink>,
            className: 'nav-menu-item',
          },
        ]}
      />
    </div>
  );
};

export const Navigator = () => {
  const { t } = useTranslation();
  const userMeta = useSelector(state => state.global.userMeta);
  const { username = '', uid = '' } = userMeta || {};
  const setUserMeta = useSetUserMeta();
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
            setUserMeta();
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
      <Nav>
        <NavLeft>
          <Logo />
          <div className="title">{t('app-title')}</div>
        </NavLeft>
        <NavRight>
          <LanguageSwitch />
          {!username && loginRender()}
          {userMeta && logoutRender()}
          {userMeta && usernameRender()}
          {userMeta && <RouteMenu />}
        </NavRight>
      </Nav>
    </Header>
  );
};
