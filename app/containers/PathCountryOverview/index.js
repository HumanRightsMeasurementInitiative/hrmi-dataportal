/**
 *
 * Overview
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import { Box } from 'grommet';

import { STANDARDS } from 'containers/App/constants';

import {
  getCountriesFiltered,
  getScoresByCountry,
  getStandardSearch,
  getAssessedSearch,
  getScaleSearch,
  getDependenciesReady,
  getAuxIndicatorsLatest,
} from 'containers/App/selectors';
import { loadDataIfNeeded } from 'containers/App/actions';

import OverviewCountries from 'containers/OverviewCountries';
import Close from 'containers/Close';

import rootMessages from 'messages';

import HowToRead from 'containers/HowToRead';

// styles
import ContentWrap from 'styled/ContentWrap';
import ContentContainer from 'styled/ContentContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import ColumnContent from 'styled/ColumnContent';
import PageTitle from 'styled/PageTitle';

import { filterByAssessment } from 'utils/filters';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/App/saga';

import messages from './messages';

const HowToReadWrapper = styled.div`
  position: relative;
  right: 0px;
  top: 4px;
  text-align: right;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    position: absolute;
    right: ${({ theme }) => theme.global.edgeSize.medium};
    top: 0;
  }
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
  scale,
  onLoadData,
  dataReady,
  auxIndicators,
}) {
  useInjectSaga({ key: 'app', saga });

  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);

  const standardDetails = STANDARDS.find(s => s.key === standard);
  // prettier-ignore
  const filteredCountries = assessed
    ? countries && countries.filter(c =>
      filterByAssessment(c, scoresAllCountries, assessed, standardDetails),
    )
    : countries;

  return (
    <ContentWrap>
      <ContentContainer header>
        <ContentMaxWidth>
          <Close />
          <PageTitle level={2}>
            <FormattedMessage {...messages.title} />
          </PageTitle>
        </ContentMaxWidth>
      </ContentContainer>
      <ContentMaxWidth>
        <Box direction="row" margin="0 auto" width="100%">
          <Box direction="column" flex style={{ position: 'relative' }}>
            <div>
              <FormattedMessage
                {...rootMessages.tabs.countries}
                values={{
                  count: filteredCountries
                    ? `${filteredCountries.length} `
                    : '',
                }}
              />
            </div>
            <HowToReadWrapper>
              <HowToRead
                htr="tab-countries"
                contxt="PathCountryOverview"
                chart="Diamonds"
                data={scale}
              />
            </HowToReadWrapper>
            <ColumnContent>
              <OverviewCountries
                countries={filteredCountries}
                scoresAllCountries={scoresAllCountries}
                auxIndicators={auxIndicators}
                dataReady={dataReady}
              />
            </ColumnContent>
          </Box>
        </Box>
      </ContentMaxWidth>
    </ContentWrap>
  );
}

PathCountryOverview.propTypes = {
  onLoadData: PropTypes.func.isRequired,
  countries: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  scoresAllCountries: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  auxIndicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  dataReady: PropTypes.bool,
  standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  assessed: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  scale: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
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
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PathCountryOverview);
