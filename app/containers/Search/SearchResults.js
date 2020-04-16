import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Box } from 'grommet';

import {
  DIMENSIONS,
  RIGHTS,
  INDICATORS,
  AT_RISK_GROUPS,
} from 'containers/App/constants';
import { getCountries } from 'containers/App/selectors';
import {
  selectCountry,
  selectMetric,
  selectGroup,
} from 'containers/App/actions';
import Hint from 'styled/Hint';

import rootMessages from 'messages';
import messages from './messages';

import { prepMetrics, prepCountries, prepGroups } from './search';

import NavOptionGroup from './NavOptionGroup';

export function SearchResults({
  countries,
  onSelectCountry,
  onSelectMetric,
  onSelectGroup,
  onSelect,
  intl,
  onClose,
  search,
}) {
  const sortedCountries = countries && prepCountries(countries, search, intl);
  const dimensions = prepMetrics(DIMENSIONS, 'dimensions', search, intl);
  const rights = prepMetrics(RIGHTS, 'rights', search, intl);
  const indicators = prepMetrics(INDICATORS, 'indicators', search, intl);
  const groups = prepGroups(AT_RISK_GROUPS, search, intl);
  const hasMetrics =
    dimensions.length > 0 || rights.length > 0 || indicators.length > 0;
  const hasCountries = sortedCountries && sortedCountries.length > 0;
  const hasGroups = groups && groups.length > 0;
  return (
    <Box direction="column" pad="medium">
      {!hasCountries && !hasMetrics && (
        <Hint italic>
          <FormattedMessage {...messages.noResults} />
        </Hint>
      )}
      {dimensions.length > 0 && (
        <NavOptionGroup
          label={intl.formatMessage(rootMessages.metricTypes.dimensions)}
          options={dimensions}
          onClick={key => {
            onClose();
            onSelect();
            onSelectMetric(key);
          }}
        />
      )}
      {rights.length > 0 && (
        <NavOptionGroup
          label={intl.formatMessage(rootMessages.metricTypes.rights)}
          options={rights}
          onClick={key => {
            onClose();
            onSelect();
            onSelectMetric(key);
          }}
        />
      )}
      {indicators.length > 0 && (
        <NavOptionGroup
          label={intl.formatMessage(rootMessages.metricTypes.indicators)}
          options={indicators}
          onClick={key => {
            onClose();
            onSelect();
            onSelectMetric(key);
          }}
        />
      )}
      {hasCountries && (
        <NavOptionGroup
          label={intl.formatMessage(rootMessages.labels.countries)}
          options={sortedCountries}
          onClick={key => {
            onClose();
            onSelect();
            onSelectCountry(key);
          }}
        />
      )}
      {hasGroups && (
        <NavOptionGroup
          label={intl.formatMessage(rootMessages.labels.people)}
          options={groups}
          onClick={key => {
            onClose();
            onSelect();
            onSelectGroup(key);
          }}
        />
      )}
    </Box>
  );
}

SearchResults.propTypes = {
  onSelectCountry: PropTypes.func,
  onSelectMetric: PropTypes.func,
  onSelectGroup: PropTypes.func,
  countries: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
  search: PropTypes.string,
  intl: intlShape.isRequired,
};

const mapStateToProps = state => ({
  countries: getCountries(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSelectMetric: code => dispatch(selectMetric(code)),
    onSelectCountry: code => dispatch(selectCountry(code)),
    onSelectGroup: code => dispatch(selectGroup(code)),
    intl: intlShape.isRequired,
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(SearchResults));
