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

import rootMessages from 'messages';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import H1 from 'styled/H1';
import makeSelectCountry from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

export function Country(props) {
  useInjectReducer({ key: 'country', reducer });
  useInjectSaga({ key: 'country', saga });
  return (
    <div>
      <H1>
        {props.match.params.country && (
          <FormattedMessage
            {...rootMessages.countries[props.match.params.country]}
          />
        )}
      </H1>
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
