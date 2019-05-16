/**
 *
 * OverviewMetrics
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
// import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import styled from 'styled-components';
// import { Paragraph, Text, Button, Heading, InfiniteScroll, ResponsiveContext } from 'grommet';
// import { FormClose } from 'grommet-icons';

// import {
//   getCountriesFiltered,
//   getRegionSearch,
//   getIncomeSearch,
// } from 'containers/App/selectors';
import { navigate } from 'containers/App/actions';

// import rootMessages from 'messages';

export function OverviewMetrics() {
  return <div>TODO: Metrics</div>;
}

OverviewMetrics.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  // countries: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  // onRemoveFilter: PropTypes.func,
  // regionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  // incomeFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  // intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // countries: state => getCountriesFiltered(state),
  // regionFilterValue: state => getRegionSearch(state),
  // incomeFilterValue: state => getIncomeSearch(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onRemoveFilter: key =>
      dispatch(
        navigate({ pathname: '' }, { replace: false, deleteParams: [key] }),
      ),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(OverviewMetrics));
