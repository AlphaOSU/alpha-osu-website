import { Form, Input, Radio, Slider, Switch } from 'antd';
import { max } from 'lodash';
import { useTranslation } from '../../i18n';
import { GetRecommendMapsParams } from '../../services/requests/get-recommend-maps';
import { IListRequestQuery } from '../../services/core/types';
import { GameMode } from '../../data/game-mode';
import { useConfig } from '../../hooks/useConfig';
import { DEFAULT_MAX_DIFFICULTY } from '../../common/constants';

const percent = {
  0: '0%',
  20: '20%',
  40: '40%',
  60: '60%',
  80: '80%',
  100: '100%',
};

export type RecommendTableFilterFormData = Omit<GetRecommendMapsParams, keyof IListRequestQuery>;

export interface RecommendTableFilterFormProps {
  onChange: (values: RecommendTableFilterFormData) => void;
  initialValues?: RecommendTableFilterFormData;
}

export const RecommendTableFilterForm = ({
  onChange,
  initialValues,
}: RecommendTableFilterFormProps) => {
  const { t } = useTranslation();
  const config = useConfig();
  const maxDifficulty = max([...config?.maxDifficulty || [DEFAULT_MAX_DIFFICULTY]]) || DEFAULT_MAX_DIFFICULTY;

  return (
    <Form<RecommendTableFilterFormData>
      initialValues={{
        passPercent: [60, 100],
        newRecordPercent: [60, 100],
        difficulty: [0, DEFAULT_MAX_DIFFICULTY],
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
        name="search"
        label={t('label-current-search-maps')}
      >
        <Input.Search
          allowClear
          placeholder={t('placeholder-search-map-name')}
        />
      </Form.Item>
      <Form.Item
        name="passPercent"
        label={t('label-pass-probability')}
      >
        <Slider
          marks={percent}
          range
        />
      </Form.Item>
      <Form.Item
        name="newRecordPercent"
        label={t('label-new-record-probability')}
      >
        <Slider
          marks={percent}
          range
        />
      </Form.Item>
      <Form.Item
        name="difficulty"
        label={t('label-difficulty')}
      >
        <Slider
          step={0.1}
          marks={{
            0: 0,
            [maxDifficulty]: maxDifficulty,
          }}
          min={0}
          max={maxDifficulty}
          range
        />
      </Form.Item>
      <Form.Item
        name="hidePlayed"
        label={t('label-hide-played')}
        getValueFromEvent={(checked) => {
          return checked ? 1 : 0;
        }}
        getValueProps={(value) => {
          return { checked: value === 1 };
        }}
      >
        <Switch />
      </Form.Item>
      <Form.Item
        name="keyCount"
        label={t('common-key-count')}
        getValueFromEvent={e => {
          const { value } = e.target;
          if (value === 47) {
            return [4, 7];
          }

          return value;
        }}
        getValueProps={(value) => {
          if (typeof value === 'number') {
            return { value };
          }

          return {
            value: 47,
          };
        }}
      >
        <Radio.Group buttonStyle="solid">
          <Radio.Button value={4}>4k</Radio.Button>
          <Radio.Button value={7}>7k</Radio.Button>
          <Radio.Button value={47}>All</Radio.Button>
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
