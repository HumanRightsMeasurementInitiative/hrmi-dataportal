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
import { Box } from 'grommet';
// import Carousel from 'react-multi-carousel';
// import Slider from 'react-styled-carousel';

import { getCountriesFeaturedOnly } from 'containers/App/selectors';
import {
  loadDataIfNeeded,
  navigate,
  selectCountry,
  selectMetric,
} from 'containers/App/actions';
import { RIGHTS, PATHS } from 'containers/App/constants';

// styles
import ContentWrap from 'styled/ContentWrap';
import SectionContainer from 'styled/SectionContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';

import ButtonText from 'styled/ButtonText';

import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/App/saga';

import SectionIntro from './SectionIntro';
import SectionCountries from './SectionCountries';
import SectionRights from './SectionRights';
// import messages from './messages';

const Bar = props => (
  <Box
    direction="row"
    align="center"
    height={`${props.theme.sizes.header.heightBottom}px`}
    background="dark"
    {...props}
  />
);
Bar.propTypes = {
  theme: PropTypes.object,
};

const Card = props => (
  <Box
    height="250px"
    elevation="small"
    width="300px"
    responsive={false}
    margin="small"
    padding="small"
    {...props}
  />
);
Card.propTypes = {
  theme: PropTypes.object,
};

const DEPENDENCIES = ['countries', 'featured'];

export function PathHome({
  onLoadData,
  nav,
  countries,
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
      <SectionCountries
        countries={countries}
        onSelectCountry={onSelectCountry}
        navAllCountries={() => nav(PATHS.COUNTRIES)}
      />
      <SectionRights
        rights={RIGHTS}
        onSelectRight={onSelectMetric}
        navAllRights={() => nav(PATHS.METRICS)}
      />
      <SectionContainer border>
        <ContentMaxWidth maxWidth="1024px" column>
          Section Groups
          <ButtonText onClick={() => nav('page/at-risk')}>
            About Groups At Risk
          </ButtonText>
        </ContentMaxWidth>
      </SectionContainer>
      <SectionContainer border>
        <ContentMaxWidth maxWidth="1024px" column>
          Section Other
          <ButtonText onClick={() => nav('page/download')}>
            Download Data
          </ButtonText>
          <ButtonText onClick={() => nav('page/methodology')}>
            About our methodology
          </ButtonText>
          <ButtonText onClick={() => nav('page/about')}>About HRMI</ButtonText>
        </ContentMaxWidth>
      </SectionContainer>
    </ContentWrap>
  );
}

PathHome.propTypes = {
  nav: PropTypes.func.isRequired,
  onLoadData: PropTypes.func.isRequired,
  // dataReady: PropTypes.bool,
  countries: PropTypes.array,
  onSelectMetric: PropTypes.func,
  onSelectCountry: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  countries: state => getCountriesFeaturedOnly(state),
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
