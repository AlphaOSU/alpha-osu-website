import { Form, Radio } from 'antd';
import { GameMode } from '../../data/enums/game-mode';
import { useTranslation } from '../../i18n';
import { useConfig } from '../../hooks/useConfig';
import { GetRecommendMapsParams } from '../../services/requests/get-recommend-maps';

type ModFormData = Pick<GetRecommendMapsParams, 'mod'>

export interface ModFormProps {
  onChange: (value: ModFormData) => void;
  initialValues?: ModFormData;
}

export const ModForm = ({
  onChange,
  initialValues,
}: ModFormProps) => {
  const { t } = useTranslation();
  const config = useConfig();

  return (
    <Form<ModFormData>
      initialValues={initialValues}
      layout="horizontal"
      labelAlign="left"
      labelCol={{
        span: 10,
      }}
      wrapperCol={{
        span: 16,
        offset: 0,
      }}
      style={{
        maxWidth: 750,
      }}
      onValuesChange={(_, values) => {
        onChange(values);
      }}
    >
      <Form.Item
        name="gameMode"
        label={t('common-game-mode')}
      >
        <Radio.Group buttonStyle="solid">
          <Radio.Button value={GameMode.STD}>osu!standard</Radio.Button>
          <Radio.Button value={GameMode.MANIA}>osu!mania</Radio.Button>
          {config.enableFilterGameMode && <>
            <Radio.Button value={GameMode.TAIKO}>osu!taiko</Radio.Button>
            <Radio.Button value={GameMode.CTB}>osu!catch the beats</Radio.Button>,
          </>}
        </Radio.Group>
      </Form.Item>
    </Form>
  );
};
