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
import AnnotateRef from './styled/AnnotateRef';

function AnnotateBenchmark({ intl, benchmarkKey, label, type, hasBetter }) {
  let rotate;
  let margin = 0;
  let relative = false;
  let tooltip = true;
  let hasLabel = true;
  let hasLine = true;
  if (type === 'diamond') {
    rotate = 45;
    margin = 0;
    tooltip = true;
    hasLabel = false;
    hasLine = false;
    relative = false;
  }
  if (type === 'htr') {
    margin = '1px -1px 1px 0';
    tooltip = false;
    relative = true;
  }
  // prettier-ignore
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <AnnotateRef
          rotate={rotate}
          margin={margin}
          relative={relative}
          offsetTop={hasBetter}
          hasBorder={hasLine}
        >
          <AnnotateRefInner
            relative={relative}
            horizontal={!!rotate}
            offsetTop={hasBetter}
          >
            {tooltip && (
              <Tooltip
                textAnchor={hasLabel && (
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
                    )} ${relative || size === 'small' ? '' : lowerCase(intl.formatMessage(
                      rootMessages.settings.benchmark.nameShort
                    ))}`}
                  </Text>
                )}
                insideButton
                margin={{ left: 'xsmall' }}
                iconSize="medium"
                maxWidth="300px"
                large
                component={<BenchmarkOverlay size="xsmall" onlyBenchmark={benchmarkKey} />}
              />
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
                )} ${relative || size === 'small' ? '' : lowerCase(intl.formatMessage(
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
