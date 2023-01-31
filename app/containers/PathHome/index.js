/**
 *
 * Overview
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { injectIntl } from 'react-intl';

import {
  getNumberCountriesWithScores,
  getFeaturedCountries,
  getLocale,
  getPeopleAtRiskCountryNo,
} from 'containers/App/selectors';
import {
  loadDataIfNeeded,
  navigate,
  selectCountry,
  selectMetric,
} from 'containers/App/actions';
import {
  RIGHTS,
  PATHS,
  COUNTRY_FILTERS,
  AT_RISK_GROUPS,
} from 'containers/App/constants';

import saga from 'containers/App/saga';
import { useInjectSaga } from 'utils/injectSaga';

import SectionRights from 'components/Sections/SectionRights';
import SectionIntro from 'components/Sections/SectionIntro';
import SectionOurData from 'components/Sections/SectionOurData';
import SectionDataCards from 'components/Sections/SectionDataCards';
import SectionCountries from 'components/Sections/SectionCountries';
import SectionSearch from 'components/Sections/SectionSearch';
import SectionPeople from 'components/Sections/SectionPeople';
import SectionAbout from 'components/Sections/SectionAbout';
import SectionFooter from 'components/Sections/SectionFooter';

// styles
import ContentWrap from 'styled/ContentWrap';

import rootMessages from 'messages';

const DEPENDENCIES = [
  'countries',
  'featured',
  'atRisk',
  'esrScores',
  'cprScores',
];

export function PathHome({
  onLoadData,
  nav,
  countryCount,
  countriesFeatured,
  onSelectMetric,
  onSelectCountry,
  onSelectCountryCategory,
  locale,
  countryCountAtRisk,
  intl,
}) {
  useInjectSaga({ key: 'app', saga });
  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);

  const metaTitle = intl.formatMessage(rootMessages.app.metaTitle);
  const metaDescription = intl.formatMessage(rootMessages.app.metaTitle);

  return (
    <ContentWrap>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:description" content={metaDescription} />
      </Helmet>
      <SectionIntro />
      <SectionDataCards
        noCountries={countryCount}
        noRights={RIGHTS.length}
        noGroups={AT_RISK_GROUPS.length}
        navCountries={() => nav(PATHS.COUNTRIES)}
        navRights={() => nav(PATHS.METRICS)}
        navGroups={() => nav(PATHS.GROUPS)}
      />
      <SectionRights
        rights={RIGHTS}
        onSelectRight={onSelectMetric}
        navAllRights={() => nav(PATHS.METRICS)}
        allCats
        marginTop
      />
      <SectionCountries
        countries={countriesFeatured}
        onSelectCountry={onSelectCountry}
        navAllCountries={() => nav(PATHS.COUNTRIES)}
        onCatClick={cat => onSelectCountryCategory('featured', cat)}
      />
      <SectionSearch />
      <SectionPeople nav={nav} countryNo={countryCountAtRisk} />
      <SectionOurData locale={locale} nav={nav} />
      <SectionAbout locale={locale} nav={nav} />
      <SectionFooter locale={locale} nav={nav} />
    </ContentWrap>
  );
}

PathHome.propTypes = {
  nav: PropTypes.func.isRequired,
  onLoadData: PropTypes.func.isRequired,
  // dataReady: PropTypes.bool,
  countryCount: PropTypes.number,
  countryCountAtRisk: PropTypes.number,
  countriesFeatured: PropTypes.array,
  onSelectMetric: PropTypes.func,
  onSelectCountry: PropTypes.func,
  onSelectCountryCategory: PropTypes.func,
  locale: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  countriesFeatured: state => getFeaturedCountries(state),
  countryCount: state => getNumberCountriesWithScores(state),
  locale: state => getLocale(state),
  countryCountAtRisk: state => getPeopleAtRiskCountryNo(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () => {
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key)));
    },
    onSelectCountry: country => dispatch(selectCountry(country)),
    onSelectMetric: metric => dispatch(selectMetric(metric)),
    onSelectCountryCategory: (key, value) =>
      dispatch(
        navigate(
          {
            pathname: `/${PATHS.COUNTRIES}`,
            search: `?${key}=${value}`,
          },
          {
            replace: false,
            deleteParams: COUNTRY_FILTERS.ALL,
            multiple: true,
            trackEvent: {
              category: 'Data',
              action: 'Country filter (Overview)',
              value: `${key}/${value}`,
            },
          },
        ),
      ),
    // navigate to location
    nav: location => {
      dispatch(
        navigate(location, {
          keepTab: true,
          trackEvent: {
            category: 'Content',
            action: 'Home: navigate',
            value: typeof location === 'object' ? location.pathname : location,
          },
        }),
      );
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(PathHome));
