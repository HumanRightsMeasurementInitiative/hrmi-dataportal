/**
 *
 * AnnotateBenchmark
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'grommet';
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
}) {
  // prettier-ignore
  return (
    <AnnotateRef rotate={rotate} margin={margin} above={above}>
      <AnnotateRefLine above={above}/>
      <AnnotateRefInner above={above}>
        <Text size="xsmall">
          {`${intl.formatMessage(
            rootMessages.settings.benchmark[benchmarkKey]
          )} ${lowerCase(intl.formatMessage(
            rootMessages.settings.benchmark.nameShort
          ))}`}
        </Text>
        <Tooltip
          insideButton
          margin={above ? { left: 'xsmall' } : { top: 'xsmall' }}
          iconSize="medium"
          maxWidth="300px"
          component={<BenchmarkOverlay size="xsmall" />}
        />
      </AnnotateRefInner>
    </AnnotateRef>
  );
}

AnnotateBenchmark.propTypes = {
  margin: PropTypes.string,
  benchmarkKey: PropTypes.string,
  above: PropTypes.bool,
  rotate: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  intl: intlShape.isRequired,
};

export default injectIntl(AnnotateBenchmark);
