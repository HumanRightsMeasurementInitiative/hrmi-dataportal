/**
 *
 * Close
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import { Box } from 'grommet';
import { Close as CloseIcon } from 'grommet-icons';

import { navigate } from 'containers/App/actions';

import ButtonIcon from 'styled/ButtonIcon';

const Styled = styled(Box)`
  z-index: 8;
  position: absolute;
  top: 45px;
  right: ${({ theme }) => theme.global.edgeSize.small};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    top: 45px;
  }
`;

// prettier-ignore
const getTrackValue = location => {
  if (location) {
    return typeof location === 'object' && location.pathname
      ? location.pathname
      : location;
  }
  return 'Home';
};

// <FormattedMessage {...messages.label} />
function Close({ onClose, closeTarget, keepTab = true, onClick }) {
  return (
    <Styled direction="row" align="center">
      <ButtonIcon
        subtle
        onClick={() =>
          // prettier-ignore
          onClick
            ? onClick()
            : onClose(closeTarget || '', {
              keepTab,
              needsLocale: !closeTarget,
              trackEvent: {
                category: 'Close',
                action: `Target: ${getTrackValue(closeTarget)}`,
              },
            })
        }
      >
        <CloseIcon size="xlarge" color="dark" />
      </ButtonIcon>
    </Styled>
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
