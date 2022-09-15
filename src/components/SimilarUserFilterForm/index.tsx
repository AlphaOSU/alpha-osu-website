import { Form, Radio } from 'antd';
import { GameMode } from '../../data/game-mode';
import { GetSimilarityUsersOptions } from '../../services/requests/get-similarity-users';
import { useTranslation } from '../../i18n';
import { config } from '../../common/config';

export type SimilarUserFormData = GetSimilarityUsersOptions;

export interface SimilarUserFilterFormProps {
  onChange: (values: SimilarUserFormData) => void;
  initialValues?: SimilarUserFormData;
}

export const SimilarUserFilterForm = ({
  onChange,
  initialValues,
}: SimilarUserFilterFormProps) => {
  const { t } = useTranslation();

  return (
    <Form<SimilarUserFormData>
      initialValues={{
        keyCount: 4,
        gameMode: GameMode.MANIA,
        ...initialValues,
      }}
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 18,
        offset: 2,
      }}
      style={{
        maxWidth: 750,
      }}
      labelAlign="left"
      onValuesChange={(_, values) => {
        onChange(values);
      }}
    >
      <Form.Item
        name="keyCount"
        label={t('common-key-count')}
      >
        <Radio.Group buttonStyle="solid">
          <Radio.Button value={4}>4k</Radio.Button>
          <Radio.Button value={7}>7k</Radio.Button>
        </Radio.Group>
      </Form.Item>
      {config.enableFilterGameMode && (
        <Form.Item
          name="gameMode"
          label={t('common-game-mode')}
        >
          <Radio.Group buttonStyle="solid">
            <Radio.Button value={GameMode.STD}>osu!standard</Radio.Button>
            <Radio.Button value={GameMode.TAIKO}>osu!taiko</Radio.Button>
            <Radio.Button value={GameMode.CTB}>osu!catch the beats</Radio.Button>
            <Radio.Button value={GameMode.MANIA}>osu!mania</Radio.Button>
          </Radio.Group>
        </Form.Item>
      )}
    </Form>
  );
};
