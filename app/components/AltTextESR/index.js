import React, { useState } from 'react';
import { Heading, Box, AccordionPanel, Accordion, Text } from 'grommet';
import { Down, Up } from 'grommet-icons';
import { injectIntl } from 'react-intl';

import rootMessages from 'messages';

function AltTextESR({ esrScores, standard, benchmark, intl }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion onActive={() => setExpanded(!expanded)}>
      <AccordionPanel
        header={
          <Box direction="row" gap="xsmall" align="center" justify="between">
            <Box>
              <Heading
                responsive={false}
                level={6}
                margin={{ vertical: 'xsmall' }}
                style={{ fontWeight: 400 }}
              >
                {expanded ? (
                  <Text>
                    {intl.formatMessage(rootMessages.app.hideGraphData)}
                  </Text>
                ) : (
                  <Text>
                    {intl.formatMessage(rootMessages.app.showGraphData)}
                  </Text>
                )}
              </Heading>
            </Box>
            <Box margin={{ left: 'auto' }}>
              {expanded ? <Up size="small" /> : <Down size="small" />}
            </Box>
          </Box>
        }
      >
        <Box pad={{ vertical: 'small', horizontal: 'xsmall' }} border="top">
          {esrScores
            .filter(s => s.score.standard == standard.code)
            .map(s => (
              <Text>
                {intl.formatMessage(rootMessages.rights[s.key])} -{' '}
                {(Math.round(s.score[benchmark.column] * 10) / 10).toFixed(1)}%
              </Text>
            ))}
        </Box>
      </AccordionPanel>
    </Accordion>
  );
}

export default injectIntl(AltTextESR);
