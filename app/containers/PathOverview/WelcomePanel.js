/**
 *
 * WelcomePanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Box, Text, ResponsiveContext } from 'grommet';
import styled from 'styled-components';
import { Close as CloseIcon } from 'grommet-icons';

import { DIMENSIONS } from 'containers/App/constants';

import DiamondChart from 'components/CountryPreview/DiamondChart';
import DimensionTooltip from 'containers/Settings/DimensionTooltip';

import LocaleToggle from 'containers/LocaleToggle';
import { appLocales } from 'i18n';

import rootMessages from 'messages';

// styles
import ButtonIcon from 'styled/ButtonIcon';
import ButtonHighlight from 'styled/ButtonHighlight';

import { isMinSize } from 'utils/responsive';

import messages from './messages';

const WelcomeIntro = styled(Text)`
  max-width: 380px;
`;
const WelcomeHeading = styled.h1`
  text-align: center;
  font-weight: 400;
  line-height: 1.33;
  margin-left: 32px;
  margin-right: 32px;
  font-size: 18px;
  margin-top: 0;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    margin-left: 22px;
    margin-right: 22px;
    margin-top: 0.67em;
    font-size: 22px;
  }
`;
const StyledButtonHighlight = styled(ButtonHighlight)`
  padding: 8px 25px;
  font-size: 16px;
  line-height: 20px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 8px 30px;
    font-size: 18px;
    line-height: 22px;
  }
`;
const StyledButtonIcon = styled(ButtonIcon)`
  position: absolute;
  top: 8px;
  right: 5px;
  background: transparent;
`;

const getValue = i => {
  if (i === 0) {
    return 40;
  }
  if (i === 1) {
    return 65;
  }
  return 90;
};

const getDimensions = () =>
  DIMENSIONS.map((dim, i) => ({
    key: dim.key,
    color: dim.key,
    value: getValue(i),
    maxValue: 100,
  }));

export function WelcomePanel({ dismiss }) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box
          pad={
            isMinSize(size, 'medium')
              ? { top: 'small', bottom: 'large', horizontal: 'medium' }
              : { top: 'small', bottom: 'medium', horizontal: 'small' }
          }
          width={isMinSize(size, 'medium') ? '530px' : '100%'}
          responsive={false}
        >
          <StyledButtonIcon onClick={dismiss} subtle>
            <CloseIcon size="large" color="dark" />
          </StyledButtonIcon>
          {appLocales.length > 1 && (
            <Box margin={{ left: 'auto', right: 'ml' }} responsive={false}>
              <LocaleToggle light />
            </Box>
          )}
          <WelcomeHeading>
            <FormattedMessage {...messages.welcome.heading} />
          </WelcomeHeading>
          <WelcomeIntro>
            <FormattedMessage {...messages.welcome.intro} />
          </WelcomeIntro>
          <Box
            direction="row"
            pad={{ top: 'medium', bottom: 'large' }}
            responsive={false}
          >
            <Box
              width={isMinSize(size, 'medium') ? '35%' : '30%'}
              flex={{ shrink: 0, grow: 0 }}
              direction="column"
            >
              <Box height="50%" pad={{ top: 'small' }}>
                <Text size="xsmall">
                  <FormattedMessage {...messages.welcome.dimensionScores} />
                </Text>
              </Box>
              <Box height="50%" align="end">
                {DIMENSIONS.map(dim => (
                  <Text
                    key={dim.key}
                    color={dim.key}
                    weight={isMinSize(size, 'medium') ? 700 : 600}
                    size={isMinSize(size, 'medium') ? 'small' : 'xsmall'}
                    textAlign="end"
                  >
                    <FormattedMessage {...rootMessages.dimensions[dim.key]} />
                    {isMinSize(size, 'medium') && (
                      <DimensionTooltip dimensionKey={dim.key} />
                    )}
                  </Text>
                ))}
              </Box>
            </Box>
            <Box
              width={isMinSize(size, 'medium') ? '30%' : '40%'}
              flex={{ shrink: 0, grow: 0 }}
            >
              <DiamondChart
                dimensions={getDimensions()}
                showLabels={false}
                hideZeroLabels
                hoverEnabled={false}
                small
                indicateBetterBelow
              />
            </Box>
            <Box
              width={isMinSize(size, 'medium') ? '35%' : '30%'}
              flex={{ shrink: 0, grow: 0 }}
            >
              <Box height="50%" flex={{ shrink: 0 }} justify="end" />
              <Box height="50%" flex={{ shrink: 0 }}>
                <Text size="xsmall">
                  <FormattedMessage {...rootMessages.labels.better} />
                </Text>
                <Text
                  size={isMinSize(size, 'medium') ? 'small' : 'xsmall'}
                  margin={{ top: 'small' }}
                >
                  <FormattedMessage {...messages.welcome.better} />
                </Text>
              </Box>
            </Box>
          </Box>
          <StyledButtonHighlight style={{ margin: '0 auto' }} onClick={dismiss}>
            <FormattedMessage {...messages.welcome.buttonExplore} />
          </StyledButtonHighlight>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

WelcomePanel.propTypes = {
  dismiss: PropTypes.func.isRequired,
};

export default WelcomePanel;
