import { Link, NavLink } from 'react-router-dom';
import { Button, Dropdown, Menu } from 'antd';
import { Language, useTranslation } from '../i18n';
import { useSelector } from '../common/dvaHooks';
import { useCookieLanguage } from '../hooks/useCookieLanguage';
import { Header, Nav, NavItem, NavLeft, NavRight } from './styles';

export const Navigator = () => {
  const { t } = useTranslation();
  const { username = '' } = useSelector(state => state.global.userMeta) || {};
  const [, setLanguage] = useCookieLanguage();

  return (
    <Header>
      <Nav>
        <NavLeft>
          <Menu
            mode="horizontal"
            className="nav-menu"
            items={[
              {
                key: '/self/recommend',
                label: <NavLink to="/self/recommend">{t('pp-personal-recommend-system')}</NavLink>,
                className: 'nav-menu-item',
              },
            ]}
          />
        </NavLeft>
        <NavRight>
          {username && (
            <NavItem>
              <span>{username}</span>
            </NavItem>
          )}
          {username && (
            <NavItem>
              <Link to="/login">
                <Button type="link">
                  {t('common-exit')}
                </Button>
              </Link>
            </NavItem>
          )}
          {!username && (
            <NavItem>
              <Link to="/login">
                <Button type="link">
                  {t('common-login')}
                </Button>
              </Link>
            </NavItem>
          )}
          <Dropdown
            overlay={(
              <Menu
                items={[
                  {
                    label: '简体中文',
                    key: Language.ZH,
                    onClick() {
                      setLanguage?.(Language.ZH);
                      location.reload();
                    },
                  },
                  {
                    label: 'English',
                    key: Language.EN,
                    onClick() {
                      setLanguage?.(Language.EN);
                      location.reload();
                    },
                  },
                ]}
              />
            )}
          >
            <Button type="dashed">
              {t('common-language')}
            </Button>
          </Dropdown>
        </NavRight>
      </Nav>
    </Header>
  );
};
