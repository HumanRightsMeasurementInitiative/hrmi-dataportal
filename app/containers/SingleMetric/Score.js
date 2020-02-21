/**
 *
 * Score
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Box, ResponsiveContext } from 'grommet';
import styled from 'styled-components';

import Bar from 'components/Bars/Bar';
import BarBullet from 'components/Bars/BarBullet';

import { COLUMNS } from 'containers/App/constants';
import { isMinSize } from 'utils/responsive';

import CountryButton from './CountryButton';

const BarWrap = styled(Box)``;
// prettier-ignore
const CountryWrap = styled(Box)`
  border-right: 1px solid;
  border-color: ${({ theme, noBorder }) => noBorder ? 'transparent' : theme.global.colors.dark};
`;

const getESRDimensionValue = (score, benchmark) => {
  if (score) {
    const col = (benchmark && benchmark.column) || COLUMNS.ESR.SCORE_ADJUSTED;
    return score && parseFloat(score[col]);
  }
  return false;
};
const getCPRDimensionValue = score =>
  score && parseFloat(score[COLUMNS.CPR.MEAN]);

const getDimensionRefs = (score, benchmark, metricType) => {
  if (benchmark && benchmark.key === 'adjusted') {
    return [{ value: 100, style: 'dotted', key: 'adjusted' }];
  }
  if (benchmark && benchmark.key === 'best') {
    const col =
      metricType === 'indicators'
        ? benchmark.refIndicatorColumn
        : benchmark.refColumn;
    return [
      { value: 100, style: 'solid', key: 'best' },
      {
        value: score && parseFloat(score[col]),
        style: 'dotted',
        key: 'adjusted',
      },
    ];
  }
  return false;
};
const getBand = score => ({
  lo: score && parseFloat(score[COLUMNS.CPR.LO]),
  hi: score && parseFloat(score[COLUMNS.CPR.HI]),
});

export function Score({ score, country, metric, currentBenchmark, standard }) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box
          key={score.country_code}
          direction="row"
          align="center"
          border="right"
        >
          <CountryWrap
            width={isMinSize(size, 'medium') ? '160px' : '80px'}
            align="end"
            flex={{ shrink: 0 }}
            pad={{ right: 'small' }}
          >
            {country && (
              <CountryButton
                onCountryClick={() =>
                  console.log('country click', country.country_code, metric.key)
                }
                country={country}
                metric={metric}
              />
            )}
          </CountryWrap>
          <BarWrap flex>
            {(metric.type === 'esr' || metric.metricType === 'indicators') && (
              <Bar
                showLabels={false}
                level={2}
                data={{
                  color: 'esr',
                  refValues: getDimensionRefs(
                    score,
                    currentBenchmark,
                    metric.metricType,
                  ),
                  value: getESRDimensionValue(score, currentBenchmark),
                  maxValue: 100,
                  unit: '%',
                  stripes: standard === 'hi',
                }}
                scoreOnHover="top"
              />
            )}
            {metric.type === 'cpr' && (
              <BarBullet
                // color = metric.metricType === 'rights' ? metric.dimension : metric.key;
                level={2}
                showLabels={false}
                data={{
                  color: metric.dimension || metric.key,
                  value: getCPRDimensionValue(score),
                  maxValue: 10,
                  unit: '',
                  band: getBand(score),
                }}
                scoreOnHover="top"
                bandOnHover="top"
              />
            )}
          </BarWrap>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

Score.propTypes = {
  score: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  country: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  metric: PropTypes.object.isRequired,
  standard: PropTypes.string,
  currentBenchmark: PropTypes.object,
};

export default Score;
