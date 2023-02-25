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
        {/*<Descriptions.Item label={t('support-us-paypal-pay')}>*/}
        {/*  <a rel="noreferrer" target="_blank" href="https://www.paypal.com/paypalme/kuiiiiteeee">{t('support-us-paypal-pay')}</a>*/}
        {/*</Descriptions.Item>*/}
      </Descriptions>
      <Table
        dataSource={data}
        loading={loading}
        columns={[
          {
            title: '#',
            dataIndex: 'index',
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
