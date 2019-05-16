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
import { Button, Heading, Box } from 'grommet';
// import { FormClose } from 'grommet-icons';

import { getScaleSearch } from 'containers/App/selectors';
import { selectMetric } from 'containers/App/actions';
import { RIGHTS_TYPES, DIMENSIONS, RIGHTS } from 'containers/App/constants';
import rootMessages from 'messages';

const Option = styled(Button)``;

export function OverviewMetrics({ scale, onSelectMetric }) {
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
                      level={4}
                      margin={{
                        vertical: 'xsmall',
                        horizontal: 'none',
                      }}
                    >
                      <FormattedMessage {...rootMessages.dimensions[d.key]} />
                    </Heading>
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
                          <FormattedMessage {...rootMessages.rights[r.key]} />
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
  scale: PropTypes.string,
  onSelectMetric: PropTypes.func,
  // countries: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  // regionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  // incomeFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

const mapStateToProps = createStructuredSelector({
  // countries: state => getCountriesFiltered(state),
  // regionFilterValue: state => getRegionSearch(state),
  scale: state => getScaleSearch(state),
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
