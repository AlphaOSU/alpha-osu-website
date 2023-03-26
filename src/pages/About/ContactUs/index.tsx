import { Button, Descriptions, Table } from 'antd';
import { ColumnType } from 'antd/es/table';
import { useMemoizedFn } from 'ahooks';
import { useTranslation } from '../../../i18n';
import { Container } from './styles';

interface TableData {
  key: string;
  name: string;
  email: string;
  osu: string;
  role: string;
}

export const ContactUs = () => {
  const { t } = useTranslation();

  const getColumns = useMemoizedFn(() => {
    const columns: Array<ColumnType<TableData>> = [
      {
        dataIndex: 'name',
        key: 'name',
        title: t('contact-label-name'),
        render: (name: string, { osu }) => (
          <Button
            type="link"
            href={osu}
            target="_blank"
            rel="noreferrer"
          >
            {name}
          </Button>
        ),
        width: 240,
      },
      {
        dataIndex: 'role',
        key: 'role',
        title: t('contact-label-role'),
      },
    ];

    return columns;
  });

  return (
    <Container>
      <div className="center-title">{t('contact-table-title')}</div>
      <Table<TableData>
        size="small"
        pagination={false}
        bordered
        columns={getColumns()}
        dataSource={[
          {
            key: 'kuit',
            name: 'Kuiiiiteeee',
            email: '2242836621@qq.com',
            osu: 'https://osu.ppy.sh/users/7304075',
            role: t('role-kuit'),
          },
          {
            key: 'Rain7',
            name: 'My Angel Yukee7',
            email: '1789446861@qq.com',
            osu: 'https://osu.ppy.sh/users/9787146',
            role: t('role-rain7'),
          },
          {
            key: 'xz',
            name: '[Crz]xz1z1z',
            email: '673720875@qq.com',
            osu: 'https://osu.ppy.sh/users/10500832',
            role: t('role-xz'),
          },
          {
            key: 'ca',
            name: '[Crz]Caicium',
            email: '1091114620@qq.com',
            osu: 'https://osu.ppy.sh/users/10702235',
            role: t('role-ca'),
          },
          {
            key: 'qr',
            name: 'QuaoarRadiation',
            email: '',
            osu: 'https://osu.ppy.sh/users/30281907',
            role: t('role-qr'),
          },
        ]}
      />
      <div className="center-title contact-us-title">
        {t('contact-us-label-title')}
      </div>
      <div className="link-container contact-us-container">
        <Button
          type="link"
          href="https://jq.qq.com/?_wv=1027&k=uJ8Hv4Ss"
          target="_blank"
          rel="noreferrer"
        >
          QQ Group
        </Button>
        <Button
          type="link"
          href="https://discord.gg/H5VzJxeK4F"
          target="_blank"
          rel="noreferrer"
        >
          Discord
        </Button>
        <Button
          type="link"
          href="https://github.com/AlphaOSU"
          target="_blank"
          rel="noreferrer"
        >
          Github Source Code
        </Button>
      </div>
      <div className="center-title contact-us-title">
        {t('useful-link-table-title')}
      </div>
      <div className="link-container">
        <Descriptions bordered style={{ width: '100%' }}>
          <Descriptions.Item label={t('useful-link-opal')}>
            {t('useful-link-opal-description')}
            <Button
              type="link"
              href="https://opal-ai.streamlit.app"
              target="_blank"
              rel="noreferrer"
            >
              {t('useful-link-opal-link')}
            </Button>
          </Descriptions.Item>
        </Descriptions>
      </div>
    </Container>
  );
};
