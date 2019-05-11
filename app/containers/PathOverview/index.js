/**
 *
 * Overview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import { Button, Heading } from 'grommet';
import { FormClose } from 'grommet-icons';

// import { useInjectSaga } from 'utils/injectSaga';
// import { useInjectReducer } from 'utils/injectReducer';
import {
  getCountriesFiltered,
  getRegionSearch,
  getIncomeSearch,
} from 'containers/App/selectors';
import { selectCountry, navigate } from 'containers/App/actions';

// import makeSelectOverview from './selectors';
// import reducer from './reducer';
// import saga from './saga';
// import messages from './messages';
import rootMessages from 'messages';

const Styled = styled.div``;

export function PathOverview({
  countries,
  onSelectCountry,
  regionFilterValue,
  incomeFilterValue,
  onRemoveFilter,
  intl,
}) {
  // useInjectReducer({ key: 'overview', reducer });
  // useInjectSaga({ key: 'overview', saga });
  // <FormattedMessage {...messages.header} />
  const sortedCountries =
    countries &&
    countries
      .map(country => country.country_code)
      .sort((a, b) =>
        intl.formatMessage(rootMessages.countries[a]) <
        intl.formatMessage(rootMessages.countries[b])
          ? -1
          : 1,
      );
  return (
    <Styled>
      <div>
        <Heading>{`${countries.length} countries`}</Heading>
      </div>
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
      {sortedCountries.map(c => (
        <div key={c}>
          <Button onClick={() => onSelectCountry(c)}>
            <FormattedMessage {...rootMessages.countries[c]} />
          </Button>
        </div>
      ))}
    </Styled>
  );
}

PathOverview.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  countries: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  onSelectCountry: PropTypes.func,
  onRemoveFilter: PropTypes.func,
  regionFilterValue: PropTypes.string,
  incomeFilterValue: PropTypes.string,
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  countries: state => getCountriesFiltered(state),
  regionFilterValue: state => getRegionSearch(state),
  incomeFilterValue: state => getIncomeSearch(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSelectCountry: country => dispatch(selectCountry(country)),
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
