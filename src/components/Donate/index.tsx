import { Tooltip } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import { useHistory } from 'react-router';
import { useRequest } from 'ahooks';
import { getDonation } from '../../services/requests/get-donation';
import { useTranslation } from '../../i18n';
import { Container } from './styles';

export const Donate = ({
  full,
}: {
  full?: boolean;
}) => {
  const history = useHistory();
  const { t } = useTranslation();

  const { data } = useRequest(getDonation);

  const handleClick = () => {
    history.push('/support');
  };

  if (!data) {
    return null;
  }

  return (
    <Container onClick={handleClick}>
      <div className="container">
        <HeartFilled style={{ fontSize: 16, color: 'red' }} />
        <div className="text">{t('donation-progress-bar-title')}</div>
        <div className="donation">{t('donation-raised-text')} ${data.donation.toFixed(2)}</div>
        <Tooltip title={t('support-us-label-title')}>
          <div className="progress-bar" style={{ maxWidth: full ? undefined : '228px' }}>
            <div className="active" style={{ width: `${data.donation / data.payment * 100}%` }} />
            <div className="percent-text">{(data.donation / data.payment * 100).toFixed(2)}%</div>
          </div>
        </Tooltip>
        <div className="payment">{t('donation-goal-text')} ${data.payment.toFixed(2)}</div>
      </div>
    </Container>
  );
};
