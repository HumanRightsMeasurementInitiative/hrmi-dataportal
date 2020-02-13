/**
 *
 * Overview
 *
 */

import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Box, Button, Drop } from 'grommet';
import { FormDown, FormUp } from 'grommet-icons';

import styled, { withTheme } from 'styled-components';

import { getCountriesFeaturedOnly } from 'containers/App/selectors';
import {
  loadDataIfNeeded,
  navigate,
  selectCountry,
  selectMetric,
} from 'containers/App/actions';
import { COLUMNS, RIGHTS } from 'containers/App/constants';

import Search from 'containers/Search';
import NavCountry from 'containers/Search/NavCountry';
import NavMetric from 'containers/Search/NavMetric';

import Icon from 'components/Icon';

// styles
import ContentWrap from 'styled/ContentWrap';
import SectionContainer from 'styled/SectionContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';

import PageTitle from 'styled/PageTitle';
import ButtonText from 'styled/ButtonText';
import ButtonPlain from 'styled/ButtonPlain';

import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/App/saga';
import rootMessages from 'messages';

import messages from './messages';

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

// prettier-ignore
const DropdownButton = styled(Button)`
  height: 56px;
  padding: 5px 10px;
  min-width: 160px;
  width: 50%;
  background-color: ${({ active, theme }) =>
    active ? theme.global.colors['dark-2'] : 'transparent'};
  border-right: ${({ last }) => last ? 2 : 1}px solid;
  border-left: ${({ first }) => first ? 0 : 1}px solid;
  border-color: ${({ theme }) => theme.global.colors['dark-2']};
  &:hover {
    background-color: ${({ active, theme }) =>
    theme.global.colors[active ? 'dark-2' : 'dark-3']};
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 5px 10px 5px 12px;
    width: auto;
  }
`;

const DEPENDENCIES = ['countries', 'featured'];

export function PathOverview({
  onLoadData,
  nav,
  intl,
  theme,
  countries,
  onSelectMetric,
  onSelectCountry,
}) {
  useInjectSaga({ key: 'app', saga });

  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);

  const [showCountries, setShowCountries] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const countryTarget = useRef(null);
  const metricTarget = useRef(null);

  return (
    <ContentWrap>
      <SectionContainer border>
        <ContentMaxWidth maxWidth="1024px" column>
          <PageTitle level={3}>
            <FormattedMessage {...messages.title} />
          </PageTitle>
          <FormattedMessage {...messages.intro} />
        </ContentMaxWidth>
      </SectionContainer>
      <SectionContainer border background="dark">
        <ContentMaxWidth maxWidth="1024px" column>
          Section Search
          <Search />
          <Bar theme={theme}>
            <DropdownButton
              plain
              first
              active={showCountries}
              onClick={() => {
                setShowMetrics(false);
                setShowCountries(!showCountries);
              }}
              icon={<Icon name="COUNTRY" style={{ minWidth: '24px' }} />}
              label={
                <Box
                  direction="row"
                  align="center"
                  justify="between"
                  fill="horizontal"
                >
                  <FormattedMessage {...rootMessages.labels.countries} />
                  {showCountries && <FormUp size="large" />}
                  {!showCountries && <FormDown size="large" />}
                </Box>
              }
              ref={countryTarget}
            />
            {showCountries && (
              <Drop
                align={{ top: 'bottom', left: 'left' }}
                target={countryTarget.current}
                onClickOutside={() => setShowCountries(false)}
                overflow="hidden"
              >
                <NavCountry onClose={() => setShowCountries(false)} />
              </Drop>
            )}
            <DropdownButton
              plain
              active={showMetrics}
              onClick={() => {
                setShowCountries(false);
                setShowMetrics(!showMetrics);
              }}
              icon={<Icon name="METRICS" style={{ minWidth: '24px' }} />}
              justify="between"
              label={
                <Box
                  direction="row"
                  align="center"
                  justify="between"
                  fill="horizontal"
                >
                  <FormattedMessage {...rootMessages.labels.metrics} />
                  {showCountries && <FormUp size="large" />}
                  {!showCountries && <FormDown size="large" />}
                </Box>
              }
              ref={metricTarget}
            />
            {showMetrics && (
              <Drop
                align={{ top: 'bottom', left: 'left' }}
                target={metricTarget.current}
                onClickOutside={() => setShowMetrics(false)}
              >
                <NavMetric onClose={() => setShowMetrics(false)} />
              </Drop>
            )}
          </Bar>
        </ContentMaxWidth>
      </SectionContainer>
      <SectionContainer border>
        <ContentMaxWidth maxWidth="1024px" column>
          Section Featured Countries Carousel
          <ButtonText onClick={() => nav('countries')}>
            Countries overview
          </ButtonText>
          <div>
            {countries &&
              countries.map(country => {
                if (!rootMessages.countries[country[COLUMNS.COUNTRIES.CODE]]) {
                  console.log(
                    'Country code not in language files:',
                    country[COLUMNS.COUNTRIES.CODE],
                  );
                  return null;
                }
                const cats = country.featured.split(',');
                const catLabels = cats.reduce(
                  (memo, cat) =>
                    `${memo}${memo === '' ? '' : ', '}${intl.formatMessage(
                      rootMessages.featured[cat],
                    )}`,
                  '',
                );
                return (
                  <div>
                    <ButtonPlain
                      onClick={() =>
                        onSelectCountry(country[COLUMNS.COUNTRIES.CODE])
                      }
                    >
                      {rootMessages.countries[
                        country[COLUMNS.COUNTRIES.CODE]
                      ] && (
                        <FormattedMessage
                          {...rootMessages.countries[
                            country[COLUMNS.COUNTRIES.CODE]
                          ]}
                        />
                      )}
                      {!rootMessages.countries[
                        country[COLUMNS.COUNTRIES.CODE]
                      ] && <span>{country[COLUMNS.COUNTRIES.CODE]}</span>}
                      {` (${catLabels})`}
                    </ButtonPlain>
                  </div>
                );
              })}
          </div>
        </ContentMaxWidth>
      </SectionContainer>
      <SectionContainer border>
        <ContentMaxWidth maxWidth="1024px" column>
          Section Rights Carousel
          <ButtonText onClick={() => nav('metrics')}>
            Rights overview
          </ButtonText>
          <div>
            {RIGHTS &&
              RIGHTS.map(r => (
                <div>
                  <ButtonPlain
                    onClick={() => {
                      onSelectMetric(r.key);
                    }}
                  >
                    {`${intl.formatMessage(rootMessages.rights[r.key])} (${
                      r.dimension
                    })`}
                  </ButtonPlain>
                </div>
              ))}
          </div>
        </ContentMaxWidth>
      </SectionContainer>
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

PathOverview.propTypes = {
  nav: PropTypes.func.isRequired,
  onLoadData: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  dataReady: PropTypes.bool,
  theme: PropTypes.object,
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

export default compose(withConnect)(injectIntl(withTheme(PathOverview)));
