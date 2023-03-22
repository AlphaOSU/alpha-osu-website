import { Typography } from 'antd';
import { Container } from './styles';
import { Algorithm } from './Algorithm';

const { Title, Link, Paragraph } = Typography;

export const About = () => {
  return (
    <Container>
      <Algorithm />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Paragraph>
        <Title level={3}>Useful Link</Title>
        <Paragraph>
          <Link
            rel="noreferrer"
            href="https://opal-ai.streamlit.app"
            target="_blank"
          >
            Opal, A Score Prediction Website
          </Link>
        </Paragraph>
      </Paragraph>
    </Container>
  );
};
