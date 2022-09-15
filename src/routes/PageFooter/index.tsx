import { Space, Typography } from 'antd';
import { Container } from './styles';

export const PageFooter = () => {
  return (
    <Container>
      <Typography>
        <Space>
          <Typography.Text strong>
            Developer:
          </Typography.Text>
          <Typography.Link
            rel="noreferrer"
            href="https://osu.ppy.sh/users/7304075"
            target="_blank"
          >
            Kuiiiiteeee
          </Typography.Link>
          <Typography.Link
            rel="noreferrer"
            href="https://osu.ppy.sh/users/9787146"
            target="_blank"
          >
            Rain 7
          </Typography.Link>
        </Space>
      </Typography>
      <Typography>
        <Typography.Link
          rel="noreferrer"
          href="https://beian.miit.gov.cn/"
          target="_blank"
        >
          <Typography.Text type="secondary">
            浙ICP备2021036334号
          </Typography.Text>
        </Typography.Link>
      </Typography>
    </Container>
  );
};
