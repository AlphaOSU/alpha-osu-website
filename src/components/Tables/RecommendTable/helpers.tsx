import { scaleLinear } from 'd3-scale';
import { interpolateRgb } from 'd3-interpolate';
import { Button, Space, Tooltip } from 'antd';
import round from 'lodash/round';
import { StarFilled } from '@ant-design/icons';
import { Mod } from '../../../data/enums/mod';
import * as assets from '../../../assets';
import { KeyCount } from '../../../data/table';
import { DifficultyBadge, ModImg } from './styles';

const difficultyColorSpectrum = scaleLinear<string>()
  .domain([0.1, 1.25, 2, 2.5, 3.3, 4.2, 4.9, 5.8, 6.7, 7.7, 9])
  .clamp(true)
  // eslint-disable-next-line max-len
  .range(['#4290FB', '#4FC0FF', '#4FFFD5', '#7CFF4F', '#F6F05C', '#FF8068', '#FF4E6F', '#C645B8', '#6563DE', '#18158E', '#000000'])
  .interpolate(interpolateRgb.gamma(2.2));

export const getDifficultyColor = (rating: number) => {
  if (rating < 0.1) {
    return '#AAAAAA';
  }
  if (rating >= 9) {
    return '#000000';
  }

  return difficultyColorSpectrum(rating);
};

const percentColorSpectrum = scaleLinear<string>()
  .domain([0, 1])
  .clamp(true)
  // eslint-disable-next-line max-len
  .range(['#00ff00', '#ff0000'])
  .interpolate(interpolateRgb.gamma(2.2));

export const getPercentColor = (percent: number) => {
  return percentColorSpectrum(percent);
};

export const modRender = (mod: Mod, img = true) => {
  const getImg = () => {
    switch (mod) {
    case Mod.DT: return assets.dt;
    case Mod.HT: return assets.ht;
    case Mod.NM: return assets.nm;
    case Mod.HD: return assets.hd;
    case Mod.HR: return assets.hr;
    default: return assets.nm;
    }
  };

  const getTooltip = () => {
    switch (mod) {
    case Mod.DT: return 'Double Time';
    case Mod.HT: return 'Half Time';
    case Mod.NM: return 'No Mod';
    default: return 'No Mod';
    }
  };

  if (!img) {
    return getTooltip();
  }

  return (
    <Tooltip title={getTooltip()} key={mod}>
      <ModImg src={getImg()} alt={mod} key={mod} />
    </Tooltip>
  );
};

export const keyCountRender = (key: KeyCount) => {
  const getImg = () => {
    switch (key) {
    case 4: return assets.m4k;
    case 7: return assets.m7k;
    default: return assets.m4k;
    }
  };

  return <ModImg src={getImg()} alt={String(key)} key={key} />;
};

export const difficultyRender = (rating: number) => {
  const color = getDifficultyColor(rating);

  return (
    <DifficultyBadge
      color={rating < 6.5 ? 'hsl(200, 10%, 10%)' : 'rgb(255, 217, 102)'}
      backgroundColor={color}
    >
      <div className="rate-content">
        <span>{round(rating, 2)}</span>
        &nbsp;
        <StarFilled />
      </div>
    </DifficultyBadge>
  );
};

export const gradeRender = ({
  value,
  link,
  mod,
}: {
  value?: number | string;
  link?: string;
  mod: Mod[];
}) => {
  if (!value) {
    return '-';
  }

  return (
    <Tooltip title={<Space>{mod.map(item => modRender(item, false))}</Space>}>
      <Button type="link" target="_blank" href={link}>
        {value}
      </Button>
    </Tooltip>
  );
};

export const percentRender = (value: number) => {
  const color = getPercentColor(value);
  const percent = round(value * 100, 2);
  return <div style={{ color, fontWeight: 700 }}>{percent}%</div>;
};
