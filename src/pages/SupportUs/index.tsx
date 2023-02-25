import { Descriptions, Image } from 'antd';
import payZ from '../../assets/pay-zfb.jpg';
import payW from '../../assets/pay-wx.jpg';
import { useTranslation } from '../../i18n';
import { Container } from './styles';

export const SupportUs = () => {
  const { t } = useTranslation();

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
      </Descriptions>
    </Container>
  );
};
