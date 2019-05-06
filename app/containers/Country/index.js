/**
 *
 * Country
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCountry from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function Country(props) {
  useInjectReducer({ key: 'country', reducer });
  useInjectSaga({ key: 'country', saga });
  return (
    <div>
      <FormattedMessage {...messages.header} />
      <div>{props.match.params.country}</div>
    </div>
  );
}

Country.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  country: makeSelectCountry(),
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

export default compose(withConnect)(Country);
