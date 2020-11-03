/**
 *
 * TabCountryPeople
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Heading, Paragraph, Box } from 'grommet';

import rootMessages from 'messages';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import ChartWordCloud from 'components/ChartWordCloud';
import Loading from 'components/LoadingIndicator';
import HTMLWrapper from 'components/HTMLWrapper';
import Hint from 'styled/Hint';

import messages from './messages';

const DimensionHeading = props => (
  <Heading
    responsive={false}
    level={3}
    margin={{ top: 'small', bottom: 'none' }}
    {...props}
  />
);
const RightHeading = props => (
  <Heading
    responsive={false}
    level={4}
    margin={{ top: 'small', bottom: 'none' }}
    {...props}
  />
);
// prettier-ignore
const StyledHeading = styled(Heading)`
  font-size: ${({ theme, level = 1 }) => theme.heading.level[level].small.size};
  line-height: ${({ theme, level = 1 }) => theme.heading.level[level].small.height};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    font-size: ${({ theme, level = 1 }) => theme.heading.level[level].medium.size};
    line-height: ${({ theme, level = 1 }) => theme.heading.level[level].medium.height};
  }
`;

// N.B. same as ChartCountryMetricPeople
const renderAnalysis = (atRiskAnalysis, intl) => (
  <Box>
    {atRiskAnalysis && atRiskAnalysis.content && (
      <>
        {atRiskAnalysis.locale !== intl.locale && (
          <Paragraph>
            <Hint italic>
              <FormattedMessage {...messages.noAnalysisInLanguage} />
            </Hint>
          </Paragraph>
        )}
        <HTMLWrapper innerhtml={atRiskAnalysis.content} />
      </>
    )}
    {(!atRiskAnalysis || !atRiskAnalysis.content) && <Loading />}
  </Box>
);

function TabCountryPeople({
  data,
  highlight,
  setHighlight,
  content,
  countryCode,
  intl,
}) {
  return (
    <>
      <StyledHeading responsive={false} level={2}>
        <FormattedMessage {...messages.title} />
      </StyledHeading>
      <Paragraph>
        <FormattedMessage {...messages.intro} />
      </Paragraph>
      {data &&
        data.map(dim => (
          <Box key={dim.key} border="top" margin={{ top: 'large' }}>
            <DimensionHeading>
              <FormattedMessage {...rootMessages.dimensions[dim.key]} />
            </DimensionHeading>
            {dim.rights &&
              Object.values(dim.rights).map((right, index) => (
                <div key={right.key}>
                  {Object.values(right.atRiskData).length > 1 && (
                    <Box border="top">
                      <RightHeading margin={{ bottom: 'none' }}>
                        <FormattedMessage {...rootMessages.rights[right.key]} />
                      </RightHeading>
                    </Box>
                  )}
                  {Object.values(right.atRiskData).map(
                    (d, indexInner, array) => (
                      <ChartWordCloud
                        highlight={highlight}
                        setHighlight={setHighlight}
                        key={d.code}
                        data={d}
                        dimension={right.dimension}
                        subright={array.length > 1}
                        border={
                          (array.length === 1 && index > 0) ||
                          (array.length > 1 && indexInner > 0)
                        }
                        showTitle
                      />
                    ),
                  )}
                  {renderAnalysis(content[`${right.key}/${countryCode}`], intl)}
                </div>
              ))}
          </Box>
        ))}
    </>
  );
}

TabCountryPeople.propTypes = {
  hasAside: PropTypes.bool,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  highlight: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  setHighlight: PropTypes.func,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  countryCode: PropTypes.string,
  intl: intlShape,
};

export default injectIntl(TabCountryPeople);
