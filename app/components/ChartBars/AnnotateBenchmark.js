/**
 *
 * AnnotateBenchmark
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Text, ResponsiveContext } from 'grommet';
import { injectIntl, intlShape } from 'react-intl';
import { lowerCase } from 'utils/string';
import rootMessages from 'messages';

import InfoBenchmark from 'containers/LayerSettings/InfoBenchmark';
import Tooltip from 'components/Tooltip';

import { isMaxSize } from 'utils/responsive';

import AnnotateRef from './styled/AnnotateRef';
import AnnotateRefLine from './styled/AnnotateRefLine';
import AnnotateRefInner from './styled/AnnotateRefInner';

// prettier-ignore
const StyledText = styled(Text)`
  border-bottom: 3px solid
    ${({ theme, hasWhiteBG = true }) =>
    hasWhiteBG
      ? theme.global.colors.buttonSecondaryOnWhiteHover
      : theme.global.colors.buttonSecondaryHover};
`;

function AnnotateBenchmark({ intl, benchmarkKey, label, type, hasBetter }) {
  const tooltip = type !== 'htr';
  const iconOnly = type === 'diamond' || type === 'icon';
  // prettier-ignore
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <AnnotateRef
          type={iconOnly ? 'icon' : type}
          isRotated={type==='diamond'}
          offsetTop={hasBetter}
        >
          {!iconOnly && (
            <AnnotateRefLine type={type} offsetTop={hasBetter} />
          )}
          <AnnotateRefInner type={type} offsetTop={hasBetter}>
            {tooltip && (
              <Tooltip
                textAnchor={!iconOnly && (
                  <Text
                    size="xsmall"
                    color="highlight2"
                    style={
                      {
                        display: 'inline',
                        verticalAlign: 'middle',
                      }
                    }
                  >
                    {label || `${intl.formatMessage(
                      rootMessages.settings.benchmark[benchmarkKey]
                    )} ${isMaxSize(size, 'sm') ? '' : lowerCase(intl.formatMessage(
                      rootMessages.settings.benchmark.nameShort
                    ))}`}
                  </Text>
                )}
                insideButton
                margin={{ left: 'xsmall' }}
                iconSize="medium"
                maxWidth="300px"
                large
                component={
                  <InfoBenchmark
                    size="xsmall"
                    singleBenchmark={iconOnly}
                    benchmarkKey={benchmarkKey}
                  />
                }
              />
            )}
            {iconOnly && (
              <Box
                style={{ transform: "translateX(50%)" }}
              >
                <StyledText
                  size="xsmall"
                  color='#262064'
                  style={{ marginRight: 4 }}
                >HRMI Score</StyledText>
              </Box>
            )}
            {!tooltip && (
              <Text
                size="xsmall"
                style={
                  {
                    display: 'inline',
                    verticalAlign: 'middle',
                  }
                }
              >
                {label || `${intl.formatMessage(
                  rootMessages.settings.benchmark[benchmarkKey]
                )} ${isMaxSize(size, 'sm') ? '' : lowerCase(intl.formatMessage(
                  rootMessages.settings.benchmark.nameShort
                ))}`}
              </Text>
            )}
          </AnnotateRefInner>
        </AnnotateRef>
      )}
    </ResponsiveContext.Consumer>
  );
}

AnnotateBenchmark.propTypes = {
  benchmarkKey: PropTypes.string,
  type: PropTypes.string,
  hasBetter: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  intl: intlShape.isRequired,
};

export default injectIntl(AnnotateBenchmark);
