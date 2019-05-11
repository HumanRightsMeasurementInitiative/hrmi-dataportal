/**
 *
 * Country
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import styled from 'styled-components';
import { Heading, Box, Text, Button } from 'grommet';

import rootMessages from 'messages';

import Close from 'containers/Close';

// import { useInjectSaga } from 'utils/injectSaga';
// import { useInjectReducer } from 'utils/injectReducer';
// import H1 from 'styled/H1';
import {
  getDimensionsForCountry,
  getRightsForCountry,
  getIndicatorsForCountry,
  getCountry,
} from 'containers/App/selectors';

import { loadDataIfNeeded, navigate } from 'containers/App/actions';

import { INCOME_GROUPS } from 'containers/App/constants';
import quasiEquals from 'utils/quasi-equals';
// import reducer from './reducer';
// import saga from './saga';
// import messages from './messages';

const Header = styled.div``;
const HeaderCategories = styled(Box)``;
const CategoryLink = styled(Button)``;
const HeaderTitle = styled.div``;
const Body = styled.div``;
const MainColumn = styled.div``;
const Sidebar = styled.div``;

const DEPENDENCIES = [
  'countries',
  'cprScores',
  'esrScores',
  'esrIndicatorScores',
];

export function PathCountry({
  onLoadData,
  onCategoryClick,
  match,
  dimensions,
  rights,
  indicators,
  country,
}) {
  // useInjectReducer({ key: 'country', reducer });
  // useInjectSaga({ key: 'country', saga });
  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);
  const group =
    country &&
    INCOME_GROUPS.find(g => quasiEquals(g.value, country.high_income_country));
  return (
    <div>
      <Helmet>
        <title>Country</title>
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
          <Heading margin={{ top: '5px' }}>
            {match.params.country && (
              <FormattedMessage
                {...rootMessages.countries[match.params.country]}
              />
            )}
          </Heading>
        </HeaderTitle>
      </Header>
      <Body>
        <MainColumn>
          <Heading level={2}>Human Rights Report</Heading>
          <div>Dimensions</div>
          <div>CPR: {dimensions && dimensions.cpr.length}</div>
          <div>ESR: {dimensions && dimensions.esr.length}</div>
          <div>Rights</div>
          <div>CPR: {rights && rights.cpr.length}</div>
          <div>ESR: {rights && rights.esr.length}</div>
          <div>Indicators</div>
          <div>ESR: {indicators && indicators.length}</div>
        </MainColumn>
        <Sidebar>
          <Heading level={3}>Country details</Heading>
        </Sidebar>
      </Body>
    </div>
  );
}

PathCountry.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  onLoadData: PropTypes.func.isRequired,
  onCategoryClick: PropTypes.func,
  match: PropTypes.object,
  indicators: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  rights: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dimensions: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  country: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  country: (state, { match }) => getCountry(state, match.params.country),
  indicators: (state, { match }) =>
    getIndicatorsForCountry(state, match.params.country),
  rights: (state, { match }) =>
    getRightsForCountry(state, match.params.country),
  dimensions: (state, { match }) =>
    getDimensionsForCountry(state, match.params.country),
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
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PathCountry);
