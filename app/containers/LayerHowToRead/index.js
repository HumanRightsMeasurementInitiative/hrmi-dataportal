import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { withTheme } from 'styled-components';
import { Box, Heading } from 'grommet';

import asArray from 'utils/as-array';

import { DIMENSIONS } from 'containers/App/constants';

import rootMessages from 'messages';
import messages from './messages';

import HTROverviewDimensions from './HTROverviewDimensions';
import HTROverviewRights from './HTROverviewRights';
import HTRBulletCPR from './HTRBulletCPR';
import HTRBar from './HTRBar';
import HTRTrendESR from './HTRTrendESR';
import HTRTrendCPR from './HTRTrendCPR';

function LayerHowToRead({ layer }) {
  const { contxt, scale, dimension, chart, chartName, noIntro } = layer;
  const charts = chart ? asArray(chart) : [];
  return (
    <Box
      direction="column"
      pad={{ left: 'medium', bottom: 'medium', top: 'small' }}
    >
      <Heading level={2}>
        {chartName && (
          <FormattedMessage
            {...messages.labelWithName}
            values={{ name: chartName.toLowerCase() }}
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
              <HTRBulletCPR
                contxt={contxt}
                dimension={dimension}
                noIntro={noIntro}
              />
            )}
            {chrt === 'Bar' && <HTRBar contxt={contxt} dimension={dimension} />}
            {chrt === 'Snapshot' && (
              <>
                {DIMENSIONS.map(d => {
                  if (d.type === 'esr') {
                    return (
                      <span key={d.key}>
                        <Heading level={4}>
                          <FormattedMessage
                            {...rootMessages.dimensions[d.key]}
                          />
                        </Heading>
                        <HTRBar contxt={contxt} dimension={d.key} />
                      </span>
                    );
                  }
                  return (
                    <span key={d.key}>
                      <Heading level={4}>
                        <FormattedMessage {...rootMessages.dimensions[d.key]} />
                      </Heading>
                      <HTRBulletCPR contxt={contxt} dimension={d.key} />
                    </span>
                  );
                })}
              </>
            )}
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
