import { Checkbox, Col, Form, Input, Radio, Row, Slider, Switch } from 'antd';
import { max } from 'lodash';
import { useState } from 'react';
import { useTranslation } from '../../i18n';
import { GetRecommendMapsParams } from '../../services/requests/get-recommend-maps';
import { IListRequestQuery } from '../../services/core/types';
import { GameMode } from '../../data/enums/game-mode';
import { useConfig } from '../../hooks/useConfig';
import { DEFAULT_MAX_DIFFICULTY } from '../../common/constants';
import { Mod } from '../../data/enums/mod';

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
  const [data, setData] = useState<RecommendTableFilterFormData>({ ...initialValues });
  const { t } = useTranslation();
  const config = useConfig();
  const maxDifficulty = max([...config?.maxDifficulty || [DEFAULT_MAX_DIFFICULTY]]) || DEFAULT_MAX_DIFFICULTY;

  return (
    <Form<RecommendTableFilterFormData>
      initialValues={{
        passPercent: [20, 100],
        newRecordPercent: [20, 100],
        difficulty: [0, DEFAULT_MAX_DIFFICULTY],
        keyCount: 4,
        gameMode: GameMode.MANIA,
        ...initialValues,
      }}
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
        setData(values);
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
        name="mod"
        label="Mod"
      >
        <Checkbox.Group disabled={data.gameMode !== GameMode.STD}>
          <Row>
            <Col span={8}><Checkbox value={Mod.NM}>NM</Checkbox></Col>
            <Col span={8}><Checkbox value={Mod.HD}>HD</Checkbox></Col>
            <Col span={8}><Checkbox value={Mod.HR}>HR</Checkbox></Col>
            <Col span={8}><Checkbox value={Mod.DT}>DT</Checkbox></Col>
            <Col span={8}><Checkbox value={[Mod.HD, Mod.HR].join('+')}>HD + HR</Checkbox></Col>
            <Col span={8}><Checkbox value={[Mod.HD, Mod.DT].join('+')}>HD + DT</Checkbox></Col>
            <Col span={8}><Checkbox value={[Mod.HR, Mod.DT].join('+')}>HR + DT</Checkbox></Col>
            <Col span={8}><Checkbox value={[Mod.DT, Mod.HD, Mod.HR].join('+')}>HD + HR + DT</Checkbox></Col>
          </Row>
        </Checkbox.Group>
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
        <Radio.Group buttonStyle="solid" disabled={data.gameMode !== GameMode.MANIA}>
          <Radio.Button value={4}>4k</Radio.Button>
          <Radio.Button value={7}>7k</Radio.Button>
          <Radio.Button value={47}>All</Radio.Button>
        </Radio.Group>
      </Form.Item>
    </Form>
  );
};
