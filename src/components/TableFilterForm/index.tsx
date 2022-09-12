import { Form, Input, Radio, Slider } from 'antd';
import { useTranslation } from '../../i18n';
import { GetRecommendMapsParams } from '../../services/requests/get-recommend-maps';
import { GameMode } from '../../data/game-mode';
import { IListRequestQuery } from '../../services/core/types';

const marks = {
  0: '0%',
  20: '20%',
  40: '40%',
  60: '60%',
  80: '80%',
  100: '100%',
};

export type TableFilterFormData = Omit<GetRecommendMapsParams, keyof IListRequestQuery>;

export interface TableFilterFormProps {
  onChange: (values: TableFilterFormData) => void;
  initialValues?: TableFilterFormData;
}

export const TableFilterForm = ({
  onChange,
  initialValues,
}: TableFilterFormProps) => {
  const { t } = useTranslation();

  return (
    <Form<TableFilterFormData>
      initialValues={{
        passPercent: [60, 100],
        newRecordPercent: [60, 100],
        keyCount: 4,
        gameMode: GameMode.MANIA,
        ...initialValues,
      }}
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 18,
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
        <Input.Search allowClear />
      </Form.Item>
      <Form.Item
        name="passPercent"
        label={t('label-pass-probability')}
      >
        <Slider
          marks={marks}
          range
        />
      </Form.Item>
      <Form.Item
        name="newRecordPercent"
        label={t('label-new-record-probability')}
      >
        <Slider
          marks={marks}
          range
        />
      </Form.Item>
      <Form.Item
        name="keyCount"
        label={t('common-key-count')}
      >
        <Radio.Group buttonStyle="solid">
          <Radio.Button value={4}>4k</Radio.Button>
          <Radio.Button value={7}>7k</Radio.Button>
        </Radio.Group>
      </Form.Item>
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
    </Form>
  );
};
