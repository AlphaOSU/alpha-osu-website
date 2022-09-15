import { Space, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

export const HelpTitle = ({
  title,
  tooltip,
}: {
  title: string;
  tooltip: string;
}) => (
  <Space>
    <span>{title}</span>
    <Tooltip title={tooltip}>
      <QuestionCircleOutlined />
    </Tooltip>
  </Space>
);
