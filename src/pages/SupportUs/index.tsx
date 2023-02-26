import { Descriptions, Image, Table } from 'antd';
import { useRequest } from 'ahooks';
import payZ from '../../assets/pay-zfb.jpg';
import payW from '../../assets/pay-wx.jpg';
import { useTranslation } from '../../i18n';
import { getSupport } from '../../services/requests/get-support';
import { Container } from './styles';

export const SupportUs = () => {
  const { t } = useTranslation();

  const { data, loading } = useRequest(getSupport);

  return (
    <Container>
      <Descriptions title={t('support-us-label-title')} layout="vertical" bordered>
        <Descriptions.Item label={t('support-us-description-label')} span={3}>
          {t('support-us-description-content')}
        </Descriptions.Item>
        <Descriptions.Item label={t('support-us-ali-pay')}>
          <Image width={200} src={payZ} />
        </Descriptions.Item>
        <Descriptions.Item label={t('support-us-wechat-pay')}>
          <Image width={200} src={payW} />
        </Descriptions.Item>
        <Descriptions.Item label={t('support-us-others-pay')}>
          <p>
            <strong>{t('support-us-paypal-pay')}:</strong>
            <br />
            <a rel="noreferrer" target="_blank" href="https://www.paypal.com/paypalme/kuiiiiteeee">
              https://www.paypal.com/paypalme/kuiiiiteeee
            </a>
          </p>
          <br />
          <p>
            <strong>BTC:</strong>
            <br />
            <span>3E9FbMygBotzk6GtsbxXoHMpKCtNUccw9t</span>
          </p>
          <br />
          <p>
            <strong>ETH:</strong>
            <br />
            <span>0x7C2B31D9B54f43fe548A6663fD5c27BF1093Eeb0</span>
          </p>
          <br />
          <p>
            <strong>USDT-TRC20:</strong>
            <br />
            <span>TM1oaHPrGYZGshaaX2YsGsMpnKU2VZDKX4</span>
          </p>
        </Descriptions.Item>
      </Descriptions>
      <Table
        dataSource={data}
        loading={loading}
        rowKey="index"
        columns={[
          {
            title: '#',
            dataIndex: 'index',
            render: value => (Number(value) || 0) + 1,
          },
          {
            title: 'Name',
            dataIndex: 'name',
          },
          {
            title: 'Payment',
            dataIndex: 'payment',
          },
          {
            title: 'Date',
            dataIndex: 'date',
          },
        ]}
      />
    </Container>
  );
};
