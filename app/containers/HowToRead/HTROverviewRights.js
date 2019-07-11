import React from 'react';
// import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Text, Heading, Box } from 'grommet';
import DiamondChart from 'components/CountryPreview/DiamondChart';

import { DIMENSIONS, RIGHTS } from 'containers/App/constants';
import { rightsForDimension } from 'utils/rights';
import UL from 'styled/UL';
import rootMessages from 'messages';
import messages from './messages';
import HTRParagraph from './HTRParagraph';

const Styled = styled.div``;
const StyledUL = styled(UL)`
  margin: 2px;
  padding: 0;
`;
const StyledLI = styled.li`
  list-style: none;
`;

const randomValue = (min, max) => Math.random() * (max - min) + min;

const getRightGroups = (d, i) => {
  const min = d.type === 'cpr' ? 5 : 50;
  const max = d.type === 'cpr' ? 10 : 95;
  // return DIMENSIONS.map((dim, index) => ({
  //   key: dim.key,
  //   color: dim.key,
  //   value: index === i ? randomValue(min, max) : 0,
  //   maxValue: max,
  //   unit: dim.type === 'esr' ? '%' : '',
  // }));
  return DIMENSIONS.map((dim, index) => ({
    key: dim.key,
    color: dim.key,
    unit: dim.type === 'esr' ? '%' : '',
    maxValue: max,
    showLabels: index === i,
    data: Object.values(RIGHTS)
      .filter(
        r => r.dimension === dim.key && typeof r.aggregate === 'undefined',
      )
      .map(right => ({
        key: right.key,
        value: index === i ? randomValue(min, max) : 0,
      })),
  }));
};

function HTROverviewRights({ intl }) {
  return (
    <Styled>
      <HTRParagraph>
        <FormattedMessage {...messages.overview.rights.intro} />
      </HTRParagraph>
      {DIMENSIONS.map((d, index) => (
        <span key={d.key}>
          <Heading responsive={false} level={4}>
            <FormattedMessage {...rootMessages.dimensions[d.key]} />
          </Heading>
          <Box direction="row" align="center">
            <Box
              width="50%"
              flex={{ shrink: 0 }}
              pad={{ left: 'small', right: 'medium', vertical: 'medium' }}
            >
              <DiamondChart
                rightGroups={getRightGroups(d, index)}
                showLabels
                hideZeroLabels
                hoverEnabled={false}
                small
              />
            </Box>
            <Box width="50%" flex={{ shrink: 0 }} pad={{ left: 'medium' }}>
              <HTRParagraph>
                <FormattedMessage {...messages.overview.rights[d.key]} />
              </HTRParagraph>
            </Box>
          </Box>
          <Heading
            responsive={false}
            level={6}
            margin={{ top: 'xsmall', bottom: '0' }}
          >
            <FormattedMessage {...messages.overview.rights.rightsListTitle} />
          </Heading>
          <StyledUL>
            {rightsForDimension(d.key).map(r => (
              <StyledLI key={r.key}>
                <Text size="xsmall">
                  <FormattedMessage {...rootMessages.rights[r.key]} />
                </Text>
              </StyledLI>
            ))}
          </StyledUL>
          {d.key === 'esr' && (
            <Box margin={{ top: 'small' }} responsive={false}>
              <HTRParagraph>
                <FormattedMessage {...messages.general.benchmarkIntro} />
                <span style={{ fontWeight: 600, margin: '0 3px' }}>
                  <FormattedMessage {...rootMessages.settings.benchmark.name} />
                </span>
              </HTRParagraph>
              <HTRParagraph margin={{ vertical: 'xsmall' }}>
                <span style={{ fontWeight: 600 }}>
                  {`${intl.formatMessage(
                    rootMessages.settings.benchmark.adjusted,
                  )}: `}
                </span>
                <FormattedMessage
                  {...rootMessages.tooltip.benchmark.adjusted}
                />
              </HTRParagraph>
              <HTRParagraph margin={{ vertical: 'xsmall' }}>
                <span style={{ fontWeight: 600 }}>
                  {`${intl.formatMessage(
                    rootMessages.settings.benchmark.best,
                  )}: `}
                </span>
                <FormattedMessage {...rootMessages.tooltip.benchmark.best} />
              </HTRParagraph>
            </Box>
          )}
        </span>
      ))}
    </Styled>
  );
}

HTROverviewRights.propTypes = {
  // data: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  intl: intlShape.isRequired,
};

export default injectIntl(HTROverviewRights);
