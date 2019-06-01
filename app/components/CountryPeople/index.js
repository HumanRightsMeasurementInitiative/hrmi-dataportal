/**
 *
 * CountryPeople
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Heading, Paragraph } from 'grommet';

import rootMessages from 'messages';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import WordCloud from 'components/WordCloud';
import MainColumn from 'styled/MainColumn';

import { needsArticle, isPlural } from 'utils/narrative';

import messages from './messages';

// const Styled = styled(Box)`
//   margin: 0 auto;
//   max-width: 1000px;
// `;

const DimensionHeading = props => (
  <Heading level={3} margin={{ vertical: '15px' }} {...props} />
);
const StyledDimensionHeading = styled(DimensionHeading)`
  font-weight: normal;
`;
const RightHeading = props => (
  <Heading level={4} margin={{ top: 'none', bottom: '15px' }} {...props} />
);
const StyledRightHeading = styled(RightHeading)`
  font-weight: normal;
`;

function CountryPeople({ data, countryTitle, countryCode, intl }) {
  return (
    <MainColumn>
      <Heading level={2}>
        <FormattedMessage
          {...messages.title}
          values={{
            country: countryTitle,
            isPlural: isPlural(intl.locale, countryCode),
            needsArticle: needsArticle(intl.locale, countryCode),
          }}
        />
      </Heading>
      <div>
        <Paragraph>
          <FormattedMessage {...messages.intro} />
        </Paragraph>
      </div>
      {data &&
        data.map(dim => (
          <div key={dim.key}>
            <StyledDimensionHeading>
              <FormattedMessage {...rootMessages.dimensions[dim.key]} />
            </StyledDimensionHeading>
            {dim.rights &&
              Object.values(dim.rights).map(i => (
                <div key={i.key}>
                  {Object.values(i.atRiskData).length > 1 && (
                    <StyledRightHeading>
                      <FormattedMessage {...rootMessages.rights[i.key]} />
                    </StyledRightHeading>
                  )}
                  {Object.values(i.atRiskData).map((d, index, array) => (
                    <WordCloud
                      key={d.code}
                      data={d}
                      dimension={i.dimension}
                      subright={array.length > 1}
                    />
                  ))}
                </div>
              ))}
          </div>
        ))}
    </MainColumn>
  );
}

CountryPeople.propTypes = {
  countryCode: PropTypes.string,
  countryTitle: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  intl: intlShape.isRequired,
};

export default injectIntl(CountryPeople);
