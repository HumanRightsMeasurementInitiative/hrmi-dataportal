import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { withTheme } from 'styled-components';
import { Box, Heading } from 'grommet';

import asArray from 'utils/as-array';

import HTROverviewDimensions from './HTROverviewDimensions';
import HTROverviewRights from './HTROverviewRights';
import HTRBulletCPR from './HTRBulletCPR';
import HTRBarESR from './HTRBarESR';
import HTRTrendESR from './HTRTrendESR';
import HTRTrendCPR from './HTRTrendCPR';
import messages from './messages';

function LayerHowToRead({ layer }) {
  const { contxt, scale, dimension, chart, chartName } = layer;
  const charts = chart ? asArray(chart) : [];
  return (
    <Box>
      <Heading level={2}>
        {chartName && (
          <FormattedMessage
            {...messages.labelWithName}
            values={{ name: chartName }}
          />
        )}
        {!chartName && <FormattedMessage {...messages.label} />}
      </Heading>
      {charts &&
        charts.map(chrt => (
          <div key={chrt}>
            {chrt === 'Diamonds' && scale === 'd' && <HTROverviewDimensions />}
            {chrt === 'Diamonds' && scale === 'r' && <HTROverviewRights />}
            {chrt === 'Bullet' && (
              <HTRBulletCPR contxt={contxt} dimension={dimension} />
            )}
            {chrt === 'Bar' && <HTRBarESR contxt={contxt} />}
            {chrt === 'Trend' && scale === 'esr' && <HTRTrendESR />}
            {chrt === 'Trend' && scale === 'cpr' && <HTRTrendCPR />}
          </div>
        ))}
    </Box>
  );
}

LayerHowToRead.propTypes = {
  layer: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default withTheme(LayerHowToRead);
