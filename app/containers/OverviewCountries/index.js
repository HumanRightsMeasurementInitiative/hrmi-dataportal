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
import { Box, Button } from 'grommet';
import { FormClose } from 'grommet-icons';

import { getRegionSearch, getIncomeSearch } from 'containers/App/selectors';
import { navigate } from 'containers/App/actions';

import CountryPreview from 'containers/CountryPreview';

import rootMessages from 'messages';

const getScoresForCountry = (countryCode, scores) => ({
  esr: scores.esr && scores.esr[countryCode],
  cpr: scores.cpr && scores.cpr[countryCode],
  indicators: scores.indicators && scores.indicators[countryCode],
});

const dimensionCount = countryScores =>
  (countryScores.esr && countryScores.esr.esr ? 1 : 0) +
  (countryScores.cpr && countryScores.cpr.empowerment ? 1 : 0) +
  (countryScores.cpr && countryScores.cpr.physint ? 1 : 0);

const rightsCount = countryScores =>
  (countryScores.esr ? Object.keys(countryScores.esr).length : 0) +
  (countryScores.cpr ? Object.keys(countryScores.cpr).length : 0);

const indicatorsCount = countryScores =>
  countryScores.indicators ? Object.keys(countryScores.indicators).length : 0;

export function OverviewCountries({
  countries,
  scoresAllCountries,
  regionFilterValue,
  incomeFilterValue,
  onRemoveFilter,
  intl,
}) {
  if (!scoresAllCountries) return null;
  const sortedCountries =
    countries &&
    countries
      .sort((a, b) =>
        intl.formatMessage(rootMessages.countries[a.country_code]) >
        intl.formatMessage(rootMessages.countries[b.country_code])
          ? 1
          : -1,
      )
      .sort((a, b) => {
        const countryScoresA = getScoresForCountry(
          a.country_code,
          scoresAllCountries,
        );
        const countryScoresB = getScoresForCountry(
          b.country_code,
          scoresAllCountries,
        );
        const dimensionsA = dimensionCount(countryScoresA);
        const dimensionsB = dimensionCount(countryScoresB);
        if (dimensionsA > dimensionsB) return -1;
        if (dimensionsA < dimensionsB) return 1;

        const rightsA = rightsCount(countryScoresA);
        const rightsB = rightsCount(countryScoresB);
        if (rightsA > rightsB) return -1;
        if (rightsA < rightsB) return 1;

        const indicatorsA = indicatorsCount(countryScoresA);
        const indicatorsB = indicatorsCount(countryScoresB);
        if (indicatorsA > indicatorsB) return -1;
        if (indicatorsA < indicatorsB) return 1;

        return 1;
      });
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
          {sortedCountries.map(c => (
            <CountryPreview key={c.country_code} country={c} />
          ))}
        </Box>
      )}
    </Box>
  );
}

OverviewCountries.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  countries: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  scoresAllCountries: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
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
