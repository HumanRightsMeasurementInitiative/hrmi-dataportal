/**
 *
 * AnnotateBenchmark
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Text, ResponsiveContext } from 'grommet';
import { injectIntl, intlShape } from 'react-intl';
import { lowerCase } from 'utils/string';
import rootMessages from 'messages';

import Tooltip from 'components/Tooltip';
import BenchmarkOverlay from 'components/Tooltip/BenchmarkOverlay';

import AnnotateRefInner from './styled/AnnotateRefInner';
import AnnotateRefLine from './styled/AnnotateRefLine';
import AnnotateRef from './styled/AnnotateRef';

function AnnotateBenchmark({
  intl,
  rotate,
  benchmarkKey,
  margin,
  above = false,
  relative = false,
  left,
  align,
  label,
  tooltip = true,
  benchmarkTooltipOnly,
}) {
  // prettier-ignore
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <AnnotateRef
          rotate={rotate}
          margin={margin}
          above={above}
          relative={relative}
          left={left}
          align={align}
        >
          {!above && (
            <AnnotateRefLine
              above={above || relative}
              relative={relative}
              align={align}
              horizontal={!!rotate}
            />
          )}
          <AnnotateRefInner
            above={above || relative}
            relative={relative}
            style={{ textAlign: align }}
            horizontal={!!rotate}
          >
            {!relative && tooltip &&
              <Tooltip
                textAnchor={!benchmarkTooltipOnly && (
                  <Text
                    size="xsmall"
                    color="highlight2"
                    style={
                      {
                        textAlign: align,
                        display: above ? 'inline ': 'block',
                        verticalAlign: 'middle',
                      }
                    }
                  >
                    {label || `${intl.formatMessage(
                      rootMessages.settings.benchmark[benchmarkKey]
                    )} ${relative || size === 'small' ? '' : lowerCase(intl.formatMessage(
                      rootMessages.settings.benchmark.nameShort
                    ))}`}
                  </Text>
                )}
                insideButton
                margin={above ? { left: 'xsmall' } : { top: 'xsmall' }}
                iconSize="medium"
                maxWidth="300px"
                large
                component={<BenchmarkOverlay size="xsmall" />}
              />
            }
          </AnnotateRefInner>
        </AnnotateRef>
      )}
    </ResponsiveContext.Consumer>
  );
}

AnnotateBenchmark.propTypes = {
  margin: PropTypes.string,
  benchmarkKey: PropTypes.string,
  align: PropTypes.string,
  above: PropTypes.bool,
  relative: PropTypes.bool,
  tooltip: PropTypes.bool,
  benchmarkTooltipOnly: PropTypes.bool,
  left: PropTypes.number,
  label: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  rotate: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  intl: intlShape.isRequired,
};

export default injectIntl(AnnotateBenchmark);
