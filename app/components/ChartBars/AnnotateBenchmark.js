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

import AnnotateRef from './styled/AnnotateRef';
import AnnotateRefLine from './styled/AnnotateRefLine';
import AnnotateRefInner from './styled/AnnotateRefInner';

function AnnotateBenchmark({ intl, benchmarkKey, label, type, hasBetter }) {
  let tooltip = true;
  let labelOrIcon = 'label';
  if (type === 'diamond') {
    tooltip = true;
    labelOrIcon = 'icon';
  }
  if (type === 'htr') {
    tooltip = false;
  }
  // prettier-ignore
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <AnnotateRef type={type} offsetTop={hasBetter}>
          {type !== 'diamond' && (
            <AnnotateRefLine type={type} offsetTop={hasBetter} />
          )}
          <AnnotateRefInner type={type} offsetTop={hasBetter}>
            {tooltip && (
              <Tooltip
                textAnchor={labelOrIcon === 'label' && (
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
                    )} ${size === 'small' ? '' : lowerCase(intl.formatMessage(
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
                )} ${size === 'small' ? '' : lowerCase(intl.formatMessage(
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
