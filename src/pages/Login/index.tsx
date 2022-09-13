import { Button, Form, Input } from 'antd';
import { useRequest } from 'ahooks';
import { useHistory } from 'react-router';
import { UserOutlined } from '@ant-design/icons';
import { userLogin } from '../../services/requests/user-login';
import { useLocalUserMeta, useSetUserMeta } from '../../hooks/userHooks';
import { useTranslation } from '../../i18n';
import { UserMeta } from '../../data/user-meta';
import { Container } from './styles';

interface FormData {
  username: string;
}

export const Login = () => {
  const { t } = useTranslation();
  const { push } = useHistory();
  const setUserMeta = useSetUserMeta();
  const { setLocalUserMeta } = useLocalUserMeta();

  const {
    run: handleLogin,
  } = useRequest(
    userLogin,
    {
      manual: true,
      onSuccess(data, [username]) {
        const userMeta: UserMeta = {
          ...data,
          username,
        };
        setUserMeta(userMeta);
        setLocalUserMeta(userMeta);
        push('/home');
      },
    },
  );

  return (
    <Container>
      <div className="title">
        AlphaOsu!
      </div>
      <Form<FormData>
        style={{
          width: 450,
        }}
        onFinish={(values) => {
          handleLogin(values.username);
        }}
      >
        <Form.Item
          name="username"
        >
          <Input
            prefix={<UserOutlined />}
            allowClear
            placeholder={t('placeholder-input-username')}
          />
        </Form.Item>
        <Form.Item
          name="username"
        >
          <Button block type="primary" htmlType="submit">
            {t('common-login')}
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};
