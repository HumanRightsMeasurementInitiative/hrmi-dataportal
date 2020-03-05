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
import { Heading } from 'grommet';

import {
  getCountries,
  getCountriesFeaturedOnly,
  getPeopleAtRiskGroups,
} from 'containers/App/selectors';
import {
  loadDataIfNeeded,
  navigate,
  selectCountry,
  selectMetric,
} from 'containers/App/actions';
import { RIGHTS, PATHS, PAGES } from 'containers/App/constants';
import saga from 'containers/App/saga';

import SectionRights from 'components/Sections/SectionRights';
import SectionIntro from 'components/Sections/SectionIntro';
import SectionData from 'components/Sections/SectionData';
import SectionCountries from 'components/Sections/SectionCountries';

// styles
import ContentWrap from 'styled/ContentWrap';
import SectionContainer from 'styled/SectionContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import ButtonText from 'styled/ButtonText';

import { useInjectSaga } from 'utils/injectSaga';

const DEPENDENCIES = ['countries', 'featured', 'atRisk'];

export function PathHome({
  onLoadData,
  nav,
  countries,
  countriesFeatured,
  groups,
  onSelectMetric,
  onSelectCountry,
}) {
  useInjectSaga({ key: 'app', saga });

  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);

  return (
    <ContentWrap>
      <SectionIntro />
      <SectionData
        noCountries={countries ? countries.length : 0}
        noRights={RIGHTS.length}
        noGroups={groups ? groups.length : 0}
        navCountries={() => nav(PATHS.COUNTRIES)}
        navRights={() => nav(PATHS.METRICS)}
        navGroups={() => nav(`${PATHS.PAGE}/${PAGES.atRisk.key}`)}
      />
      <SectionCountries
        countries={countriesFeatured}
        onSelectCountry={onSelectCountry}
        navAllCountries={() => nav(PATHS.COUNTRIES)}
        labelAllCountries="Countries overview"
        title="Featured countries"
      />
      <SectionRights
        rights={RIGHTS}
        onSelectRight={onSelectMetric}
        navAllRights={() => nav(PATHS.METRICS)}
        labelAllRights="Rights overview"
        title="Explore rights"
      />
      <SectionContainer>
        <ContentMaxWidth maxWidth="medium" column>
          <Heading level={2}>Explore people at risk</Heading>
          <ButtonText onClick={() => nav(`${PATHS.PAGE}/${PAGES.atRisk.key}`)}>
            About Groups At Risk
          </ButtonText>
        </ContentMaxWidth>
      </SectionContainer>
      <SectionContainer>
        <ContentMaxWidth maxWidth="medium" column>
          Section Other
          <ButtonText
            onClick={() => nav(`${PATHS.PAGE}/${PAGES.download.key}`)}
          >
            Download Data
          </ButtonText>
          <ButtonText
            onClick={() => nav(`${PATHS.PAGE}/${PAGES.methodology.key}`)}
          >
            About our methodology
          </ButtonText>
          <ButtonText onClick={() => nav(`${PATHS.PAGE}/${PAGES.about.key}`)}>
            About HRMI
          </ButtonText>
        </ContentMaxWidth>
      </SectionContainer>
    </ContentWrap>
  );
}

PathHome.propTypes = {
  nav: PropTypes.func.isRequired,
  onLoadData: PropTypes.func.isRequired,
  // dataReady: PropTypes.bool,
  countries: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  countriesFeatured: PropTypes.array,
  groups: PropTypes.array,
  onSelectMetric: PropTypes.func,
  onSelectCountry: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  countriesFeatured: state => getCountriesFeaturedOnly(state),
  countries: state => getCountries(state),
  groups: state => getPeopleAtRiskGroups(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () => {
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key)));
    },
    onSelectCountry: country => dispatch(selectCountry(country)),
    onSelectMetric: metric => dispatch(selectMetric(metric)),
    // navigate to location
    nav: location => {
      dispatch(
        navigate(location, {
          keepTab: true,
          trackEvent: {
            category: 'Content',
            action: 'Header: navigate',
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

export default compose(withConnect)(PathHome);
