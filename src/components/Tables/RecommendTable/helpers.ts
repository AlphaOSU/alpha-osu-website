import { scaleLinear } from 'd3-scale';
import { interpolateRgb } from 'd3-interpolate';

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
