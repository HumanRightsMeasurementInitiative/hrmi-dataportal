/**
 *
 * Overview
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Paragraph, ResponsiveContext } from 'grommet';
import styled, { withTheme } from 'styled-components';

import { STANDARDS, RIGHTS } from 'containers/App/constants';

import {
  getCountriesFiltered,
  getScoresByCountry,
  getStandardSearch,
  getAssessedSearch,
  getDependenciesReady,
  getAuxIndicatorsLatest,
  getFeaturedValues,
  getFeatured,
  getScaleSearch,
} from 'containers/App/selectors';
import { loadDataIfNeeded, selectMetric } from 'containers/App/actions';

import saga from 'containers/App/saga';
import { useInjectSaga } from 'utils/injectSaga';

import OverviewCountries from 'containers/OverviewCountries';

import Aside from 'components/Aside';
import HINote from 'components/HINote';

// styles
import MainColumn from 'styled/MainColumn';
import ContentWrap from 'styled/ContentWrap';
import ContentContainer from 'styled/ContentContainer';
import SectionContainer from 'styled/SectionContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import PageTitle from 'styled/PageTitle';
import ButtonTextIcon from 'styled/ButtonTextIcon';

import { filterByAssessment } from 'utils/filters';

import { isMinSize } from 'utils/responsive';

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
  'featured',
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
  featuredValues,
  featuredCountries,
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
  const filteredCountries = assessed
    ? countries && countries.filter(c =>
      filterByAssessment(
        c,
        scoresAllCountries,
        assessed,
        STANDARDS.find(s => s.key === standard),
      ),
    )
    : countries;
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <ContentWrap>
          <HINote />
          <ContentContainer direction="column" header>
            <ContentMaxWidth
              header
              height={`${theme.sizes.top.height}px`}
              hasAside={isMinSize(size, 'large')}
            >
              <MainColumn hasAside={isMinSize(size, 'large')} header>
                <PageTitle>
                  <FormattedMessage
                    {...messages.title}
                    values={{ no: filteredCountries.length }}
                  />
                </PageTitle>
                {scale && (
                  <Paragraph size="large">
                    <FormattedMessage
                      {...messages.header[scale]}
                      values={{
                        no: RIGHTS.length,
                        esrLink: (
                          <ButtonTextIcon
                            color="esrDark"
                            label={intl.formatMessage(
                              rootMessages.dimensions.esr,
                            )}
                            onClick={() => onSelectMetric('esr')}
                          />
                        ),
                        physintLink: (
                          <ButtonTextIcon
                            color="physintDark"
                            label={intl.formatMessage(
                              rootMessages.dimensions.physint,
                            )}
                            onClick={() => onSelectMetric('physint')}
                          />
                        ),
                        empowerLink: (
                          <ButtonTextIcon
                            color="empowermentDark"
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
                <Aside align="start" justify="center">
                  <Image src={graphic} />
                </Aside>
              )}
            </ContentMaxWidth>
          </ContentContainer>
          <SectionContainer background="sectionCountries">
            <ContentMaxWidth column>
              <OverviewCountries
                countries={filteredCountries}
                scoresAllCountries={scoresAllCountries}
                auxIndicators={auxIndicators}
                dataReady={dataReady}
                featuredValues={featuredValues}
                featuredCountries={featuredCountries}
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
  featuredValues: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  featuredCountries: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
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
  featuredValues: state => getFeaturedValues(state),
  featuredCountries: state => getFeatured(state),
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
