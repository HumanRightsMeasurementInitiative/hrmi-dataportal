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

import { STANDARDS } from 'containers/App/constants';

import {
  getCountriesFiltered,
  getScoresByCountry,
  getStandardSearch,
  getAssessedSearch,
  getScaleSearch,
} from 'containers/App/selectors';

import OverviewMetrics from 'containers/OverviewMetrics';
import OverviewCountries from 'containers/OverviewCountries';
import TabContainer from 'containers/TabContainer';

import rootMessages from 'messages';

// styles
import ContentWrap from 'styled/ContentWrap';
import ContentContainer from 'styled/ContentContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';

import PageTitle from 'styled/PageTitle';

import { filterByAssessment } from 'utils/scores';

import messages from './messages';

export function PathOverview({
  countries,
  scoresAllCountries,
  intl,
  standard,
  assessed,
  scale,
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
      <ContentContainer header>
        <ContentMaxWidth>
          <PageTitle level={1}>
            <FormattedMessage {...messages.aboveTitle} />
          </PageTitle>
        </ContentMaxWidth>
      </ContentContainer>
      <ContentMaxWidth>
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
              howToRead: {
                context: 'PathOverview',
                chart: 'Diamonds',
                data: scale,
              },
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
      </ContentMaxWidth>
    </ContentWrap>
  );
}

PathOverview.propTypes = {
  countries: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  scoresAllCountries: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  intl: intlShape.isRequired,
  standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  assessed: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  scale: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

const mapStateToProps = createStructuredSelector({
  countries: state => getCountriesFiltered(state),
  scoresAllCountries: state => getScoresByCountry(state),
  standard: state => getStandardSearch(state),
  assessed: state => getAssessedSearch(state),
  scale: state => getScaleSearch(state),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(injectIntl(PathOverview));
