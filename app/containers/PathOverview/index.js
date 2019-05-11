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
import styled from 'styled-components';
import { Button, Heading } from 'grommet';
import { FormClose } from 'grommet-icons';

import {
  getCountriesFiltered,
  getRegionSearch,
  getIncomeSearch,
} from 'containers/App/selectors';
import { navigate } from 'containers/App/actions';

import CountryPreview from 'containers/CountryPreview';

import rootMessages from 'messages';

const Styled = styled.div``;

export function PathOverview({
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
    <Styled>
      {countries && (
        <div>
          <Heading>{`${countries.length} countries`}</Heading>
        </div>
      )}
      <div>
        {regionFilterValue && (
          <span>
            <Button
              primary
              icon={<FormClose />}
              reverse
              onClick={() => onRemoveFilter('region')}
              label={intl.formatMessage(
                rootMessages.regions[regionFilterValue],
              )}
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
      </div>
      {sortedCountries &&
        sortedCountries.map(c => (
          <CountryPreview key={c.country_code} country={c} />
        ))}
    </Styled>
  );
}

PathOverview.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  countries: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  onRemoveFilter: PropTypes.func,
  regionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  incomeFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  countries: state => getCountriesFiltered(state),
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

export default compose(withConnect)(injectIntl(PathOverview));
