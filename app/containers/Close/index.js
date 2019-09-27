/**
 *
 * Close
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled, { css } from 'styled-components';
import { Box, Text } from 'grommet';
import { Close as CloseIcon } from 'grommet-icons';
import { FormattedMessage } from 'react-intl';

import { navigate } from 'containers/App/actions';

import Button from 'styled/Button';
import ButtonIcon from 'styled/ButtonIcon';
import Visible from 'styled/Visible';

import messages from './messages';

const StyledTextButton = styled(Button)`
  color: ${({ theme }) => theme.global.colors.dark};
  padding: 0 10px 0 0;
  &:hover {
    color: ${({ theme }) => theme.global.colors['dark-1']};
    background-color: transparent;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 0 10px 0 0;
  }
`;

const Styled = styled(Box)`
  ${props =>
    props.topRight &&
    css`
      position: absolute;
      top: 0;
      z-index: 8;
      right: ${props.theme.global.edgeSize.small};
      @media (min-width: ${props.theme.breakpointsMin.medium}) {
        right: ${props.theme.global.edgeSize.large};
      }
    `}
  ${props =>
    props.float &&
    css`
      position: fixed;
      top: 115px;
      right: 15px;
      z-index: 8;
      @media (min-width: ${props.theme.breakpointsMin.xlarge}) {
        padding-right: 15px;
      }
      @media (min-width: ${props.theme.breakpointsMin.xxlarge}) {
        padding-right: 40px;
      }
    `}
`;

const StyledButtonIcon = styled(ButtonIcon)`
  background: ${({ theme, subtle }) =>
    subtle ? 'transparent' : theme.global.colors.highlight};
  &:hover {
    background: ${({ theme }) => theme.global.colors.highlight2};
  }
`;

const getTrackValue = location => {
  if (location) {
    return typeof location === 'object' && location.pathname
      ? location.pathname
      : location;
  }
  return 'Home';
};

// <FormattedMessage {...messages.label} />
function Close({
  onClose,
  closeTarget,
  keepTab = false,
  onClick,
  topRight,
  float = true,
  text = true,
  plain = false,
}) {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setScrollTop(window.pageYOffset);
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <Styled
      direction="row"
      pad={topRight || float ? { top: 'medium' } : 'none'}
      align="center"
      topRight={topRight}
      float={float}
    >
      {text && (!float || scrollTop === 0) && (
        <Visible min="medium">
          <StyledTextButton
            hoverColor="dark"
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
            <Text size="small">
              <FormattedMessage {...messages.label} />
            </Text>
          </StyledTextButton>
        </Visible>
      )}
      <StyledButtonIcon
        subtle={plain}
        float={float}
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
      </StyledButtonIcon>
    </Styled>
  );
}

Close.propTypes = {
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  closeTarget: PropTypes.object,
  keepTab: PropTypes.bool,
  topRight: PropTypes.bool,
  float: PropTypes.bool,
  text: PropTypes.bool,
  plain: PropTypes.bool,
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
