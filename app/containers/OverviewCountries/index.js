/**
 *
 * Overview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import styled from 'styled-components';
// import { Paragraph, Text, Button, Heading, InfiniteScroll, ResponsiveContext } from 'grommet';
import { Box, Button, InfiniteScroll } from 'grommet';
import { FormClose } from 'grommet-icons';

import { getRegionSearch, getIncomeSearch } from 'containers/App/selectors';
import { navigate } from 'containers/App/actions';

import CountryPreview from 'containers/CountryPreview';

import rootMessages from 'messages';

export function OverviewCountries({
  countries,
  regionFilterValue,
  incomeFilterValue,
  onRemoveFilter,
  intl,
}) {
  const sortedCountries =
    countries &&
    countries.sort((a, b) =>
      intl.formatMessage(rootMessages.countries[a.country_code]) <
      intl.formatMessage(rootMessages.countries[b.country_code])
        ? -1
        : 1,
    );
  return (
    <Box pad={{ horizontal: 'medium' }}>
      {regionFilterValue && (
        <span>
          <Button
            primary
            icon={<FormClose />}
            reverse
            onClick={() => onRemoveFilter('region')}
            label={intl.formatMessage(rootMessages.regions[regionFilterValue])}
          />
        </span>
      )}
      {incomeFilterValue && (
        <span>
          <Button
            primary
            icon={<FormClose />}
            reverse
            onClick={() => onRemoveFilter('income')}
            label={intl.formatMessage(rootMessages.income[incomeFilterValue])}
          />
        </span>
      )}
      {sortedCountries && (
        <Box direction="row" wrap width="100%">
          <InfiniteScroll items={sortedCountries} step={40}>
            {c => <CountryPreview key={c.country_code} country={c} />}
          </InfiniteScroll>
        </Box>
      )}
    </Box>
  );
}

OverviewCountries.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  countries: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  onRemoveFilter: PropTypes.func,
  regionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  incomeFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  regionFilterValue: state => getRegionSearch(state),
  incomeFilterValue: state => getIncomeSearch(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onRemoveFilter: key =>
      dispatch(
        navigate({ pathname: '' }, { replace: false, deleteParams: [key] }),
      ),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(OverviewCountries));
