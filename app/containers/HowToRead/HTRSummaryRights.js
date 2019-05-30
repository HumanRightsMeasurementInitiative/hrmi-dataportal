import React from 'react';
// import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Text, Paragraph, Heading } from 'grommet';

import { DIMENSIONS } from 'containers/App/constants';
import { rightsForDimension } from 'utils/rights';
import UL from 'styled/UL';
import rootMessages from 'messages';
import messages from './messages';

const Styled = styled.div``;
const StyledUL = styled(UL)`
  margin: 2px;
  padding: 0;
`;
const StyledLI = styled.li`
  list-style: none;
`;

function HTRSummaryRights({ intl }) {
  return (
    <Styled>
      <Paragraph>
        <FormattedMessage {...messages.summary.rights.intro} />
      </Paragraph>
      {DIMENSIONS.map(d => (
        <span key={d.key}>
          <Heading level={4}>
            <FormattedMessage {...rootMessages.dimensions[d.key]} />
          </Heading>
          <Paragraph>
            <FormattedMessage {...messages.summary.rights[d.key]} />
          </Paragraph>
          <Heading level={6} margin={{ vertical: 'xxsmall' }}>
            <FormattedMessage {...messages.summary.rights.rightsListTitle} />
          </Heading>
          <StyledUL>
            {rightsForDimension(d.key).map(r => (
              <StyledLI key={r.key}>
                <Text size="small">
                  <FormattedMessage {...rootMessages.rights[r.key]} />
                </Text>
              </StyledLI>
            ))}
          </StyledUL>
          {d.key === 'esr' && (
            <>
              <Paragraph>
                <FormattedMessage {...messages.general.benchmarkIntro} />
                <Text
                  style={{ fontWeight: 600 }}
                  margin={{ horizontal: 'xsmall' }}
                >
                  <FormattedMessage {...rootMessages.settings.benchmark.name} />
                </Text>
              </Paragraph>
              <Paragraph margin={{ vertical: 'xsmall' }}>
                <Text size="small" style={{ fontWeight: 600 }}>
                  {`${intl.formatMessage(
                    rootMessages.settings.benchmark.adjusted,
                  )}: `}
                </Text>
                <Text size="small">
                  {intl.formatMessage(rootMessages.tooltip.benchmark.adjusted)}
                </Text>
              </Paragraph>
              <Paragraph margin={{ vertical: 'xsmall' }}>
                <Text size="small" style={{ fontWeight: 600 }}>
                  {`${intl.formatMessage(
                    rootMessages.settings.benchmark.best,
                  )}: `}
                </Text>
                <Text size="small">
                  <FormattedMessage {...rootMessages.tooltip.benchmark.best} />
                </Text>
              </Paragraph>
            </>
          )}
        </span>
      ))}
    </Styled>
  );
}

HTRSummaryRights.propTypes = {
  // data: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  intl: intlShape.isRequired,
};

export default injectIntl(HTRSummaryRights);
