import { SIZES, BREAKPOINTS } from 'theme';

export const chartLabelWidth = size =>
  `${SIZES.charts.labels[BREAKPOINTS[size].index]}px`;

export const scoreAsideWidth = size =>
  `${SIZES.charts.scoresAside[BREAKPOINTS[size].index]}px`;
