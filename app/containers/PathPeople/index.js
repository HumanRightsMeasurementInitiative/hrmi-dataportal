/**
 *
 * Country
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { groupBy, map } from 'lodash/collection';

import { Text, Box, ResponsiveContext, Image as GImage } from 'grommet';
import styled, { withTheme } from 'styled-components';

import rootMessages from 'messages';

import {
  getPeopleAtRiskCountryNo,
  getPeopleAtRiskForGroup,
  getCountries,
  getDependenciesReady,
  getMaxYearAtRisk,
} from 'containers/App/selectors';

import {
  loadDataIfNeeded,
  navigate,
  selectCountry,
} from 'containers/App/actions';
import { PATHS, IMAGE_PATH, COLUMNS, REGIONS } from 'containers/App/constants';

import saga from 'containers/App/saga';
import { useInjectSaga } from 'utils/injectSaga';

import Breadcrumb from 'components/Breadcrumb';
import AsideBackground from 'components/AsideBackground';
import Aside from 'components/Aside';

import ContentWrap from 'styled/ContentWrap';
import SectionContainer from 'styled/SectionContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import PageTitle from 'styled/PageTitle';
import ContentContainer from 'styled/ContentContainer';
import MainColumn from 'styled/MainColumn';
import ButtonText from 'styled/ButtonText';

import { isMinSize } from 'utils/responsive';
import quasiEquals from 'utils/quasi-equals';
import { sortCountriesByName } from 'utils/scores';
import { lowerCase } from 'utils/string';

import messages from './messages';

const Styled = styled.div`
  margin-top: 60px;
  margin-bottom: 20px;
`;
const Top = styled.div``;

const DEPENDENCIES = ['atRisk', 'countries'];

export function PathPeople({
  intl,
  onLoadData,
  nav,
  match,
  atRiskCountryCodes,
  countries,
  dataReady,
  onSelectCountry,
  theme,
  atRiskYear,
  countryNo,
}) {
  useInjectSaga({ key: 'app', saga });
  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);

  const peopleCode = match.params.group;
  let groupTitle = peopleCode;
  /* eslint-disable no-console */
  if (rootMessages['people-at-risk'][peopleCode]) {
    groupTitle = intl.formatMessage(rootMessages['people-at-risk'][peopleCode]);
  } else {
    console.log('People code not in language files:', peopleCode);
  }
  const groupedCountries =
    dataReady &&
    groupBy(
      atRiskCountryCodes
        .map(countryCode => {
          const country = countries.find(c =>
            quasiEquals(c[COLUMNS.COUNTRIES.CODE], countryCode),
          );
          if (!country)
            console.log('Country code not in country list', countryCode);
          return country;
        })
        .filter(c => !!c)
        .sort((a, b) =>
          REGIONS.values.indexOf(a[COLUMNS.COUNTRIES.REGION]) >
          REGIONS.values.indexOf(b[COLUMNS.COUNTRIES.REGION])
            ? 1
            : -1,
        ),
      c => c[COLUMNS.COUNTRIES.REGION],
    );

  const metaDescription =
    intl.formatMessage(rootMessages.app.metaTitle) + ' - ' + groupTitle;

  /* eslint-enable no-console */
  return (
    <ResponsiveContext.Consumer>
      {size => {
        let basis = '1';
        let direction = 'column';
        if (isMinSize(size, 'medium')) {
          basis = '1/2';
          direction = 'row';
        }
        if (isMinSize(size, 'large')) {
          basis = '1/3';
        }
        return (
          <ContentWrap>
            <Helmet>
              <title>{groupTitle}</title>
              <meta name="description" content={metaDescription} />
              <meta property="og:description" content={metaDescription} />
            </Helmet>
            <Box style={{ position: 'relative' }}>
              {isMinSize(size, 'large') && <AsideBackground color="white" />}
              <ContentContainer direction="column" header>
                <ContentMaxWidth
                  header
                  height={
                    isMinSize(size, 'large')
                      ? `${theme.sizes.top.height}px`
                      : 'auto'
                  }
                  hasAside={isMinSize(size, 'large')}
                >
                  <MainColumn
                    hasAside={isMinSize(size, 'large')}
                    header
                    hasLinks
                  >
                    <Breadcrumb
                      onItemClick={() => nav(PATHS.GROUPS)}
                      breadcrumb
                      items={[
                        {
                          key: 'all',
                          label: intl.formatMessage(
                            rootMessages.labels.allPeople,
                          ),
                        },
                      ]}
                    />
                    <PageTitle>{groupTitle}</PageTitle>
                    <p style={{ fontSize: '21px', lineHeight: '38px' }}>
                      <FormattedMessage
                        {...messages.header}
                        values={{
                          no: dataReady ? countryNo : 0,
                          year: dataReady ? atRiskYear : 0,
                        }}
                      />
                    </p>
                  </MainColumn>
                  {isMinSize(size, 'large') && (
                    <Aside image>
                      <GImage
                        src={`${IMAGE_PATH}/people_${peopleCode}.png`}
                        fit="cover"
                      />
                    </Aside>
                  )}
                </ContentMaxWidth>
              </ContentContainer>
            </Box>
            <SectionContainer background="sectionPeople">
              <ContentMaxWidth column>
                <Styled>
                  <Top>
                    <Text margin={{ bottom: 'xsmall', top: '0' }} size="medium">
                      <FormattedMessage
                        {...messages.text}
                        values={{
                          no: dataReady ? atRiskCountryCodes.length : 0,
                          group: lowerCase(groupTitle),
                        }}
                      />
                    </Text>
                  </Top>
                  {dataReady && (
                    <Box wrap direction={direction}>
                      {map(groupedCountries, (groupCountries, regionCode) => (
                        <Box
                          basis={basis}
                          margin={{ vertical: 'medium' }}
                          key={regionCode}
                        >
                          <FormattedMessage
                            {...rootMessages.regions[regionCode]}
                          />
                          <Box>
                            {groupCountries
                              .sort((a, b) =>
                                sortCountriesByName(a, b, 'asc', intl),
                              )
                              .map(c => {
                                const code = c[COLUMNS.COUNTRIES.CODE];
                                return (
                                  <ButtonText
                                    onClick={() =>
                                      onSelectCountry(code, peopleCode)
                                    }
                                    key={code}
                                  >
                                    {rootMessages.countries[code] && (
                                      <FormattedMessage
                                        {...rootMessages.countries[code]}
                                      />
                                    )}
                                  </ButtonText>
                                );
                              })}
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Styled>
              </ContentMaxWidth>
            </SectionContainer>
          </ContentWrap>
        );
      }}
    </ResponsiveContext.Consumer>
  );
}

PathPeople.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  onLoadData: PropTypes.func.isRequired,
  nav: PropTypes.func,
  onSelectCountry: PropTypes.func,
  match: PropTypes.object,
  atRiskCountryCodes: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  countries: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  countryNo: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  dataReady: PropTypes.bool,
  theme: PropTypes.object,
  atRiskYear: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  dataReady: state => getDependenciesReady(state, DEPENDENCIES),
  atRiskCountryCodes: (state, { match }) =>
    getPeopleAtRiskForGroup(state, match.params),
  countries: state => getCountries(state),
  atRiskYear: state => getMaxYearAtRisk(state),
  countryNo: state => getPeopleAtRiskCountryNo(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () => {
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key)));
    },
    onSelectCountry: (countryCode, peopleCode) => {
      dispatch(selectCountry(countryCode, 'atrisk', peopleCode));
    },
    nav: location => {
      dispatch(
        navigate(location, {
          keepTab: true,
          trackEvent: {
            category: 'Content',
            action: 'At risk group: navigate',
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

export default compose(withConnect)(injectIntl(withTheme(PathPeople)));
