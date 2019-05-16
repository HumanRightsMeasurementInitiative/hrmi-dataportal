/**
 *
 * Close
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled, { css } from 'styled-components';
import { Box, Button } from 'grommet';
import { Close as CloseIcon } from 'grommet-icons';
// import { FormattedMessage } from 'react-intl';

import { navigate } from 'containers/App/actions';
// import messages from './messages';

const Styled = styled(Box)`
  ${props =>
    props.topRight &&
    css`
      position: absolute;
      top: 0;
      right: 0;
    `}
`;

// <FormattedMessage {...messages.label} />
function Close({ onClose, closeTarget, keepTab = false, onClick, topRight }) {
  return (
    <Styled direction="row" pad="medium" align="center" topRight={topRight}>
      <Box round="full" overflow="hidden">
        <Button
          primary
          color="dark-2"
          icon={<CloseIcon />}
          hoverIndicator={{ background: 'dark-3' }}
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
    </Styled>
  );
}

Close.propTypes = {
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  closeTarget: PropTypes.object,
  keepTab: PropTypes.bool,
  topRight: PropTypes.bool,
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
