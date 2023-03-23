import React, { useState } from 'react';
import { Heading, Box, AccordionPanel, Accordion, Text } from 'grommet';
import { Down, Up } from 'grommet-icons';
import { injectIntl } from 'react-intl';

import { formatScore } from 'utils/scores';

import rootMessages from 'messages';

function AltTextCPR({ cprScores, intl }) {
  const [expanded, setExpanded] = useState(false);

  if (cprScores.filter(s => s.score).length === 0) {
    return null;
  }

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
          {cprScores
            .filter(s => s.score)
            .map(s => (
              <Text>
                {intl.formatMessage(rootMessages['rights-shortened'][s.key])} -{' '}
                {formatScore(s.score.mean, 1, intl)}
              </Text>
            ))}
        </Box>
      </AccordionPanel>
    </Accordion>
  );
}

export default injectIntl(AltTextCPR);
