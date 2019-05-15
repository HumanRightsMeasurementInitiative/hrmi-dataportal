/**
 *
 * Country
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import styled from 'styled-components';
import { Heading, Box, Text, Button, Tabs, Tab } from 'grommet';

import rootMessages from 'messages';

import Close from 'containers/Close';
import CountryReport from 'components/CountryReport';
import CountryPeople from 'components/CountryPeople';
import CountryAbout from 'components/CountryAbout';

import {
  getDimensionsForCountry,
  getRightsForCountry,
  getIndicatorsForCountry,
  getCountry,
  getScaleSearch,
  getStandardSearch,
  getBenchmarkSearch,
  getPeopleAtRiskForCountry,
  getTabSearch,
} from 'containers/App/selectors';

import { loadDataIfNeeded, navigate, setTab } from 'containers/App/actions';

import { INCOME_GROUPS } from 'containers/App/constants';
import quasiEquals from 'utils/quasi-equals';

import messages from './messages';

const Header = styled.div``;
const HeaderCategories = styled(Box)``;
const CategoryLink = styled(Button)``;
const HeaderTitle = styled.div``;
const Body = styled.div``;
// const MainColumn = styled.div``;
// const Sidebar = styled.div``;

const DEPENDENCIES = [
  'countries',
  'cprScores',
  'esrScores',
  'esrIndicatorScores',
  'esrIndicators',
  'atRisk',
];

export function PathCountry({
  intl,
  onLoadData,
  onCategoryClick,
  match,
  dimensions,
  rights,
  indicators,
  country,
  scale,
  benchmark,
  atRisk,
  tabIndex,
  onTabClick,
}) {
  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);

  // const [tabIndex, setTabIndex] = useState(0);
  const group =
    country &&
    INCOME_GROUPS.find(g => quasiEquals(g.value, country.high_income_country));

  const countryTitle =
    match.params.country &&
    intl.formatMessage(rootMessages.countries[match.params.country]);

  return (
    <div>
      <Helmet>
        <title>{countryTitle}</title>
        <meta name="description" content="Description of Country page" />
      </Helmet>
      <Header>
        <Close />
        <HeaderCategories direction="row">
          <Text size="small">
            <CategoryLink
              onClick={() =>
                onCategoryClick('region', country.region_code, ['income'])
              }
            >
              {country && (
                <FormattedMessage
                  {...rootMessages.regions[country.region_code]}
                />
              )}
            </CategoryLink>
            <Text>&nbsp;|&nbsp;</Text>
            <CategoryLink
              onClick={() => onCategoryClick('income', group.key, ['region'])}
            >
              {group && (
                <FormattedMessage {...rootMessages.income[group.key]} />
              )}
            </CategoryLink>
          </Text>
        </HeaderCategories>
        <HeaderTitle>
          <Heading margin={{ top: '5px' }}>{countryTitle}</Heading>
        </HeaderTitle>
      </Header>
      <Body>
        <Tabs
          justify="start"
          activeIndex={tabIndex}
          onActive={index => onTabClick(index)}
        >
          <Tab title={intl.formatMessage(messages.tabs.report)}>
            <CountryReport
              countryTitle={countryTitle}
              dimensions={dimensions}
              rights={rights}
              indicators={indicators}
              country={country}
              scale={scale}
              benchmark={benchmark}
            />
          </Tab>
          <Tab title={intl.formatMessage(messages.tabs['people-at-risk'])}>
            <CountryPeople data={atRisk} countryTitle={countryTitle} />
          </Tab>
          <Tab title={intl.formatMessage(messages.tabs.about)}>
            <CountryAbout />
          </Tab>
        </Tabs>
      </Body>
    </div>
  );
}

PathCountry.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  onLoadData: PropTypes.func.isRequired,
  onCategoryClick: PropTypes.func,
  onTabClick: PropTypes.func,
  match: PropTypes.object,
  atRisk: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  indicators: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  rights: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dimensions: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  country: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  scale: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  tabIndex: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
};

const mapStateToProps = createStructuredSelector({
  country: (state, { match }) => getCountry(state, match.params.country),
  indicators: (state, { match }) =>
    getIndicatorsForCountry(state, match.params.country),
  rights: (state, { match }) =>
    getRightsForCountry(state, match.params.country),
  dimensions: (state, { match }) =>
    getDimensionsForCountry(state, match.params.country),
  atRisk: (state, { match }) => getPeopleAtRiskForCountry(state, match.params),
  scale: state => getScaleSearch(state),
  standard: state => getStandardSearch(state),
  benchmark: state => getBenchmarkSearch(state),
  tabIndex: state => getTabSearch(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () => {
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key)));
    },
    onCategoryClick: (key, value, deleteParams) =>
      dispatch(
        navigate(
          { pathname: '', search: `?${key}=${value}` },
          {
            replace: false,
            deleteParams,
          },
        ),
      ),
    onClose: () => dispatch(navigate('')),
    onTabClick: index => dispatch(setTab(index)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(PathCountry));
