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

import {
  getCountriesFiltered,
  getScoresByCountry,
} from 'containers/App/selectors';

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

export function PathOverview({ countries, scoresAllCountries, intl }) {
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
            content: (
              <OverviewCountries
                countries={countries}
                scoresAllCountries={scoresAllCountries}
              />
            ),
          },
          {
            key: 'metrics',
            title: intl.formatMessage(rootMessages.tabs.metrics),
            content: (
              <OverviewMetrics
                countries={countries}
                scoresAllCountries={scoresAllCountries}
              />
            ),
          },
        ]}
      />
    </ContentWrap>
  );
}

PathOverview.propTypes = {
  countries: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  scoresAllCountries: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  countries: state => getCountriesFiltered(state),
  scoresAllCountries: state => getScoresByCountry(state),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(injectIntl(PathOverview));
