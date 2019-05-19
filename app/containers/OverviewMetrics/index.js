/**
 *
 * OverviewMetrics
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import { Button, Heading, Box, Text } from 'grommet';
// import { FormClose } from 'grommet-icons';

import {
  getScaleSearch,
  getBenchmarkSearch,
  getStandardSearch,
} from 'containers/App/selectors';
import { selectMetric } from 'containers/App/actions';
import {
  RIGHTS_TYPES,
  DIMENSIONS,
  RIGHTS,
  STANDARDS,
  BENCHMARKS,
  COLUMNS,
} from 'containers/App/constants';
import rootMessages from 'messages';

import MetricPreviewChart from './MetricPreviewChart';

const Option = styled(Button)`
  width: 100%;
`;

const getScoresForDimension = (countries, dimension, scores, standard) =>
  countries &&
  scores &&
  countries.map(c => {
    const countryScores = scores[dimension.type][c.country_code];
    const countryMetric = (countryScores && countryScores[dimension.key]) || [
      { country_code: c.country_code },
    ];
    if (dimension.type === 'esr') {
      // prettier-ignore
      return countryMetric.find(
        s => s.standard === standard.code && s.group === 'All',
      ) || { country_code: c.country_code };
    }
    return countryMetric[0];
  });

export function OverviewMetrics({
  scale,
  onSelectMetric,
  scoresAllCountries,
  countries,
  standard,
  benchmark,
}) {
  // console.log(countries && countries.length)
  const standardDetails = STANDARDS.find(s => s.key === standard);
  const benchmarkDetails = BENCHMARKS.find(s => s.key === benchmark);

  return (
    <Box pad="medium">
      {RIGHTS_TYPES.map(type => {
        const dimensions = DIMENSIONS.filter(d => d.type === type);
        return (
          <Box key={type} pad={{ bottom: 'medium', top: 'none' }}>
            <Heading
              level={6}
              margin={{
                top: 'none',
                bottom: 'xsmall',
                horizontal: 'none',
              }}
            >
              <FormattedMessage {...rootMessages['rights-types'][type]} />
            </Heading>
            {dimensions.map(d => {
              const rights =
                scale === 'r' &&
                RIGHTS.filter(
                  r =>
                    r.dimension === d.key && typeof r.aggregate === 'undefined',
                );
              return (
                <Box key={d.key} pad={{ bottom: 'xsmall', top: 'none' }}>
                  <Option
                    plain
                    onClick={() => {
                      onSelectMetric(d.key);
                    }}
                  >
                    <Heading
                      level={5}
                      margin={{
                        vertical: 'xsmall',
                        horizontal: 'none',
                      }}
                    >
                      <FormattedMessage {...rootMessages.dimensions[d.key]} />
                    </Heading>
                    {!rights && (
                      <MetricPreviewChart
                        maxValue={d.type === 'esr' ? 100 : 10}
                        level={1}
                        color={d.key}
                        column={
                          d.type === 'esr'
                            ? benchmarkDetails.column
                            : COLUMNS.CPR.MEAN
                        }
                        data={getScoresForDimension(
                          countries,
                          d,
                          scoresAllCountries,
                          standardDetails,
                        )}
                      />
                    )}
                  </Option>
                  {rights &&
                    rights.map(r => (
                      <div key={r.key}>
                        <Option
                          plain
                          onClick={() => {
                            onSelectMetric(r.key);
                          }}
                        >
                          <Text size="small">
                            <FormattedMessage {...rootMessages.rights[r.key]} />
                          </Text>
                          <MetricPreviewChart
                            level={2}
                            maxValue={r.type === 'esr' ? 100 : 10}
                            color={r.dimension}
                            column={
                              r.type === 'esr'
                                ? benchmarkDetails.column
                                : COLUMNS.CPR.MEAN
                            }
                            data={getScoresForDimension(
                              countries,
                              r,
                              scoresAllCountries,
                              standardDetails,
                            )}
                          />
                        </Option>
                      </div>
                    ))}
                </Box>
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
}

OverviewMetrics.propTypes = {
  scale: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onSelectMetric: PropTypes.func,
  scoresAllCountries: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  countries: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
};

const mapStateToProps = createStructuredSelector({
  scale: state => getScaleSearch(state),
  standard: state => getStandardSearch(state),
  benchmark: state => getBenchmarkSearch(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSelectMetric: metric => dispatch(selectMetric(metric)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(OverviewMetrics);
