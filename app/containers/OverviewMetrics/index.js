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
  padding-bottom: 10px;
  &:hover {
    text-decoration: underline;
  }
`;

const getScoresForMetric = (
  scale,
  metric,
  scoresByCountry,
  standard,
  countryCodes,
) =>
  Object.values(scoresByCountry).reduce((memo, sc) => {
    if (!sc[metric.key]) return memo;
    if (metric.type === 'cpr') {
      return memo.concat(
        sc[metric.key].filter(
          scm => countryCodes.indexOf(scm.country_code) > -1,
        ),
      );
    }
    return memo.concat(
      sc[metric.key].filter(
        scm =>
          countryCodes.indexOf(scm.country_code) > -1 &&
          scm.standard === standard.code &&
          scm.group === 'All',
      ),
    );
  }, []);

export function OverviewMetrics({
  scale,
  onSelectMetric,
  scoresAllCountries,
  countries,
  standard,
  benchmark,
  dataReady,
  activeCountry,
}) {
  // console.log(countries && countries.length)
  const standardDetails = STANDARDS.find(s => s.key === standard);
  const benchmarkDetails = BENCHMARKS.find(s => s.key === benchmark);
  let scoresByMetric = [];
  if (countries) {
    if (scale === 'r') {
      scoresByMetric = RIGHTS.filter(
        r => typeof r.aggregate === 'undefined',
      ).map(right => ({
        ...right,
        scores: getScoresForMetric(
          scale,
          right,
          scoresAllCountries[right.type],
          standardDetails,
          countries.map(c => c.country_code),
        ),
      }));
    } else {
      scoresByMetric = DIMENSIONS.map(dim => ({
        ...dim,
        scores: getScoresForMetric(
          scale,
          dim,
          scoresAllCountries[dim.type],
          standardDetails,
          countries.map(c => c.country_code),
        ),
      }));
    }
  }
  const maxScores = scoresByMetric.reduce(
    (memo, sm) => Math.max(memo, sm.scores.length),
    0,
  );
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
                        maxScores={maxScores}
                        activeCountry={activeCountry}
                        data={
                          dataReady &&
                          scoresByMetric.find(sm => sm.key === d.key)
                        }
                        loading={!dataReady}
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
                            maxScores={maxScores}
                            column={
                              r.type === 'esr'
                                ? benchmarkDetails.column
                                : COLUMNS.CPR.MEAN
                            }
                            activeCountry={activeCountry}
                            data={
                              dataReady &&
                              scoresByMetric.find(sm => sm.key === r.key)
                            }
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
  activeCountry: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onSelectMetric: PropTypes.func,
  scoresAllCountries: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  countries: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  dataReady: PropTypes.bool,
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
