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
// import { Heading } from 'grommet';
// import styled from 'styled-components';

import { STANDARDS } from 'containers/App/constants';

import {
  getCountriesFiltered,
  getScoresByCountry,
  getStandardSearch,
  getAssessedSearch,
} from 'containers/App/selectors';

import OverviewMetrics from 'containers/OverviewMetrics';
import OverviewCountries from 'containers/OverviewCountries';
import TabContainer from 'containers/TabContainer';

import rootMessages from 'messages';

// styles
import ContentWrap from 'styled/ContentWrap';
import ContentContainer from 'styled/ContentContainer';
import PageTitle from 'styled/PageTitle';

import { filterByAssessment } from 'utils/scores';

import messages from './messages';

// const SuperHeading = props => <Heading level={4} {...props} />;
// const SuperHeadingStyled = styled(SuperHeading)`
//   font-weight: normal;
//   margin-bottom: 5px;
//   margin-top: 0;
// `;

export function PathOverview({
  countries,
  scoresAllCountries,
  intl,
  standard,
  assessed,
}) {
  if (!countries) return null;

  const standardDetails = STANDARDS.find(s => s.key === standard);
  // prettier-ignore
  const filteredCountries = assessed
    ? countries.filter(c =>
      filterByAssessment(c, scoresAllCountries, assessed, standardDetails),
    )
    : countries;
  return (
    <ContentWrap>
      <ContentContainer paddingTop>
        <PageTitle level={1}>
          <FormattedMessage {...messages.aboveTitle} />
        </PageTitle>
      </ContentContainer>
      <TabContainer
        tabs={[
          {
            key: 'countries',
            title: intl.formatMessage(rootMessages.tabs.countries, {
              count: filteredCountries ? `${filteredCountries.length} ` : '',
            }),
            content: (
              <OverviewCountries
                countries={filteredCountries}
                scoresAllCountries={scoresAllCountries}
              />
            ),
          },
          {
            key: 'metrics',
            title: intl.formatMessage(rootMessages.tabs.metrics),
            content: (
              <OverviewMetrics
                countries={filteredCountries}
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
  standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  assessed: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

const mapStateToProps = createStructuredSelector({
  countries: state => getCountriesFiltered(state),
  scoresAllCountries: state => getScoresByCountry(state),
  standard: state => getStandardSearch(state),
  assessed: state => getAssessedSearch(state),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(injectIntl(PathOverview));
