import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import ButtonHowToRead from 'styled/ButtonHowToRead';
import { openHowToRead } from 'containers/App/actions';
import { getHowToRead } from 'containers/App/selectors';
import messages from './messages';

function HowToRead({ htr, onOpenHowToRead, chart, contxt, data, layer }) {
  return (
    <ButtonHowToRead
      onClick={() => {
        if (layer && layer.htr === htr) {
          return onOpenHowToRead(false);
        }
        return onOpenHowToRead({ chart, contxt, data, htr });
      }}
    >
      <FormattedMessage {...messages.label} />
    </ButtonHowToRead>
  );
}

HowToRead.propTypes = {
  htr: PropTypes.string.isRequired,
  chart: PropTypes.string,
  contxt: PropTypes.string,
  data: PropTypes.string,
  onOpenHowToRead: PropTypes.func,
  layer: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  layer: state => getHowToRead(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onOpenHowToRead: args => dispatch(openHowToRead(args)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HowToRead);
