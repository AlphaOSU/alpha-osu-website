import { Collapse } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import { useMemoizedFn } from 'ahooks';
import { useState } from 'react';
import { Logo } from '../../components/Logo';
import { useTranslation } from '../../i18n';
import { useLocalUserMeta, useSetUserMeta } from '../../hooks/userHooks';
import { useSelector } from '../../common/dvaHooks';
import { useLanguageItems } from '../../components/LanguageSwitch';
import { useRouteConfig } from './route-config';
import { Header, MobileNavWrapper, NavItem, NavLeft } from './styles';

export const MobileNav = () => {
  const { t } = useTranslation();
  const routeConfig = useRouteConfig();
  const userMeta = useSelector(state => state.global.userMeta);
  const { username = '', uid = '' } = userMeta || {};
  const { clearLocalUserMeta } = useLocalUserMeta();
  const setUserMeta = useSetUserMeta();
  const languageItems = useLanguageItems();
  const [showMenu, setShowMenu] = useState(false);

  // TODO: duplicate code
  const usernameRender = useMemoizedFn(() => (
    <a
      className="link-button"
      href={`https://osu.ppy.sh/users/${uid}`}
      rel="noreferrer"
      target="_blank"
    >
      <span>{username}</span>
    </a>
  ));

  // TODO: duplicate code
  const logoutRender = useMemoizedFn(() => (
    <Link to="/login">
      <div
        className="link-button danger"
        onClick={() => {
          clearLocalUserMeta();
          setUserMeta();
        }}
      >
        {t('common-exit')}
      </div>
    </Link>
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
      <MobileNavWrapper>
        <Collapse
          ghost
          className="mobile-collapse-panel"
          activeKey={showMenu ? 'nav' : undefined}
          onChange={(keys) => {
            if (keys?.[0] === 'nav') {
              setShowMenu(true);
            } else {
              setShowMenu(false);
            }
          }}
        >
          <Collapse.Panel
            key="nav"
            header={(
              <div className="mobile-collapse-panel-header">
                <NavLeft>
                  <Logo />
                </NavLeft>
                <div className="mobile-title">{t('app-title')}</div>
                <div />
              </div>
            )}
          >
            <div className="nav-container" onClick={() => setShowMenu(false)}>
              {routeConfig.map((item) => {
                return (
                  <div className="mobile-nav-item" key={item.path}>
                    <NavLink className="mobile-nav-link" to={item.path}>{item.label}</NavLink>
                  </div>
                );
              })}
              <div className="user-info-items">
                {username && usernameRender()}
                {username && logoutRender()}
                {!username && loginRender()}
              </div>
              <div className="language-items">
                {languageItems.map((item) => {
                  return (
                    <div key={item.key} className="language-item" onClick={item.onClick}>
                      {item.label}
                    </div>
                  );
                })}
              </div>
            </div>
          </Collapse.Panel>
        </Collapse>
      </MobileNavWrapper>
    </Header>
  );
};
