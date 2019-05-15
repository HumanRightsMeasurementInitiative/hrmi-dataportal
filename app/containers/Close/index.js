/**
 *
 * Close
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Box, Button } from 'grommet';
import { Close as CloseIcon } from 'grommet-icons';
// import { FormattedMessage } from 'react-intl';

import { navigate } from 'containers/App/actions';
// import messages from './messages';

// <FormattedMessage {...messages.label} />
function Close({ onClose, closeTarget, keepTab = false, onClick }) {
  return (
    <Box direction="row" pad="medium" align="center">
      <Box round="full" overflow="hidden">
        <Button
          primary
          icon={<CloseIcon />}
          hoverIndicator
          onClick={() =>
            // prettier-ignore
            onClick
              ? onClick()
              : onClose(closeTarget || '', {
                keepTab,
                needsLocale: !closeTarget,
              })
          }
        />
      </Box>
    </Box>
  );
}

Close.propTypes = {
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  closeTarget: PropTypes.object,
  keepTab: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
  return {
    onClose: (location, args) => dispatch(navigate(location, args)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(Close);
