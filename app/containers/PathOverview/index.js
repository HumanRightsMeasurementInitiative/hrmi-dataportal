/**
 *
 * Overview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Heading } from 'grommet';
import styled from 'styled-components';

import { getCountriesFiltered } from 'containers/App/selectors';

import OverviewMetrics from 'containers/OverviewMetrics';
import OverviewCountries from 'containers/OverviewCountries';
import TabContainer from 'containers/TabContainer';

import rootMessages from 'messages';

// styles
import ContentWrap from 'styled/ContentWrap';
import ContentContainer from 'styled/ContentContainer';
import PageTitle from 'styled/PageTitle';

import messages from './messages';

const SuperHeading = props => <Heading level={4} {...props} />;
const SuperHeadingStyled = styled(SuperHeading)`
  font-weight: normal;
  margin-bottom: 5px;
  margin-top: 0;
`;

export function PathOverview({ countries, intl }) {
  return (
    <ContentWrap>
      <ContentContainer paddingTop>
        {countries && (
          <span>
            <SuperHeadingStyled>
              <FormattedMessage {...messages.aboveTitle} />
            </SuperHeadingStyled>
            <PageTitle>
              <FormattedMessage
                {...messages.title}
                values={{ number: countries.length }}
              />
            </PageTitle>
          </span>
        )}
      </ContentContainer>
      <TabContainer
        tabs={[
          {
            key: 'countries',
            title: intl.formatMessage(rootMessages.tabs.countries),
            content: <OverviewCountries countries={countries} />,
          },
          {
            key: 'metrics',
            title: intl.formatMessage(rootMessages.tabs.metrics),
            content: <OverviewMetrics />,
          },
        ]}
      />
    </ContentWrap>
  );
}

PathOverview.propTypes = {
  countries: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  countries: state => getCountriesFiltered(state),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(injectIntl(PathOverview));

// <ResponsiveContext.Consumer>
//   {size => {
//     console.log('RC', size);
//     return (
//       <B>
//         <Heading>{`${countries.length} countries`}</Heading>
//         <Heading level={1}>Heading 1</Heading>
//         <Heading level={2}>Heading 2</Heading>
//         <Heading level={3}>Heading 3</Heading>
//         <Heading level={4}>Heading 4</Heading>
//         <Heading level={5}>Heading 5</Heading>
//         <Heading level={6}>Heading 6</Heading>
//         <Text as="div" size="xxlarge">Text xxlarge</Text>
//         <Text as="div" size="xlarge">Text xlarge</Text>
//         <Text as="div" size="large">Text large</Text>
//         <Text as="div" size="medium">Text medium</Text>
//         <Text>Text</Text>
//         <Text as="div" size="small">Text small</Text>
//         <Text as="div" size="xsmall">Text xsmall</Text>
//         <Paragraph size="small">Paragraph small</Paragraph>
//         <Paragraph size="medium">Paragraph medium</Paragraph>
//         <Paragraph margin="none">Paragraph</Paragraph>
//       </B>
//     );
//   }}
// </ResponsiveContext.Consumer>
