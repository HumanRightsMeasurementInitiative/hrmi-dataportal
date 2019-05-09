/**
 *
 * Overview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { getCountriesFiltered } from 'containers/App/selectors';
import makeSelectOverview from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const Styled = styled.div`
  min-height: 2000px;
`;

export function PathOverview() {
  useInjectReducer({ key: 'overview', reducer });
  useInjectSaga({ key: 'overview', saga });
  return (
    <Styled>
      <FormattedMessage {...messages.header} />
    </Styled>
  );
}

PathOverview.propTypes = {
  dispatch: PropTypes.func.isRequired,
  countries: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
};

const mapStateToProps = createStructuredSelector({
  overview: makeSelectOverview(),
  countries: state => getCountriesFiltered(state),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PathOverview);
