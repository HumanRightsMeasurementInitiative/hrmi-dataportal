/**
 *
 * Overview
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
  formatMessage,
} from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Paragraph, ResponsiveContext } from 'grommet';
import styled, { withTheme } from 'styled-components';
import { Helmet } from 'react-helmet';

import { STANDARDS, RIGHTS } from 'containers/App/constants';

import {
  getCountriesFiltered,
  getScoresByCountry,
  getStandardSearch,
  getAssessedSearch,
  getDependenciesReady,
  getAuxIndicatorsLatest,
  getScaleSearch,
} from 'containers/App/selectors';
import { loadDataIfNeeded, selectMetric } from 'containers/App/actions';

import saga from 'containers/App/saga';
import { useInjectSaga } from 'utils/injectSaga';

import OverviewCountries from 'containers/OverviewCountries';

import Aside from 'components/Aside';
import CountryNotes from 'components/CountryNotes';

// styles
import MainColumn from 'styled/MainColumn';
import ContentWrap from 'styled/ContentWrap';
import ContentContainer from 'styled/ContentContainer';
import SectionContainer from 'styled/SectionContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import PageTitle from 'styled/PageTitle';
import ButtonTextIcon from 'styled/ButtonTextIcon';

import { filterByAssessment } from 'utils/filters';

import { isMinSize, isMaxSize } from 'utils/responsive';

import graphic from 'images/graphics/countries_overview.svg';

import rootMessages from 'messages';
import messages from './messages';

const Image = styled.img`
  width: 100%;
  max-width: 200px;
`;

const DEPENDENCIES = [
  'countries',
  'esrIndicators',
  'cprScores',
  'esrScores',
  'auxIndicators',
  // 'esrIndicatorScores', // consider removing to improve IE11/Edge performance
];

export function PathCountryOverview({
  countries,
  scoresAllCountries,
  standard,
  assessed,
  onLoadData,
  dataReady,
  auxIndicators,
  scale,
  intl,
  onSelectMetric,
  theme,
}) {
  useInjectSaga({ key: 'app', saga });
  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);
  // prettier-ignore
  const filteredCountries = assessed && countries
    ? countries && countries.filter(c =>
      filterByAssessment(
        c,
        scoresAllCountries,
        assessed,
        STANDARDS.find(s => s.key === standard),
      ),
    )
    : countries;

  const metaTitle = intl.formatMessage(messages.title);

  const metaDescription =
    intl.formatMessage(rootMessages.app.metaTitle) + ' - ' + metaTitle;

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <ContentWrap>
          <Helmet>
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta property="og:description" content={metaDescription} />
          </Helmet>
          <CountryNotes settingHint />
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
              <MainColumn hasAside={isMinSize(size, 'large')} header>
                <PageTitle>
                  <FormattedMessage {...messages.title} />
                </PageTitle>
                {scale && (
                  <Paragraph size={isMaxSize(size, 'sm') ? 'medium' : 'large'}>
                    <FormattedMessage
                      {...messages.header[scale]}
                      values={{
                        no: RIGHTS.length,
                        esrLink: (
                          <ButtonTextIcon
                            color="esrDark"
                            size={isMaxSize(size, 'sm') ? 'medium' : 'large'}
                            weight={700}
                            label={intl.formatMessage(
                              rootMessages.dimensions.esr,
                            )}
                            onClick={() => onSelectMetric('esr')}
                          />
                        ),
                        physintLink: (
                          <ButtonTextIcon
                            color="physintDark"
                            size={isMaxSize(size, 'sm') ? 'medium' : 'large'}
                            weight={700}
                            label={intl.formatMessage(
                              rootMessages.dimensions.physint,
                            )}
                            onClick={() => onSelectMetric('physint')}
                          />
                        ),
                        empowerLink: (
                          <ButtonTextIcon
                            color="empowermentDark"
                            size={isMaxSize(size, 'sm') ? 'medium' : 'large'}
                            weight={700}
                            label={intl.formatMessage(
                              rootMessages.dimensions.empowerment,
                            )}
                            onClick={() => onSelectMetric('empowerment')}
                          />
                        ),
                      }}
                    />
                  </Paragraph>
                )}
              </MainColumn>
              {isMinSize(size, 'large') && (
                <Aside align="center" justify="center">
                  <Image src={graphic} />
                </Aside>
              )}
            </ContentMaxWidth>
          </ContentContainer>
          <SectionContainer background="sectionCountryOverview">
            <ContentMaxWidth column>
              <OverviewCountries
                countries={filteredCountries}
                scoresAllCountries={scoresAllCountries}
                auxIndicators={auxIndicators}
                dataReady={dataReady}
              />
            </ContentMaxWidth>
          </SectionContainer>
        </ContentWrap>
      )}
    </ResponsiveContext.Consumer>
  );
}

PathCountryOverview.propTypes = {
  onLoadData: PropTypes.func.isRequired,
  countries: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  scoresAllCountries: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  auxIndicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  dataReady: PropTypes.bool,
  standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  assessed: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  scale: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onSelectMetric: PropTypes.func,
  intl: intlShape.isRequired,
  theme: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  countries: state => getCountriesFiltered(state),
  auxIndicators: state => getAuxIndicatorsLatest(state),
  scoresAllCountries: state => getScoresByCountry(state),
  standard: state => getStandardSearch(state),
  assessed: state => getAssessedSearch(state),
  scale: state => getScaleSearch(state),
  dataReady: state => getDependenciesReady(state, DEPENDENCIES),
});
export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () => {
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key)));
    },
    onSelectMetric: metric => dispatch(selectMetric(metric)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(withTheme(PathCountryOverview)));
