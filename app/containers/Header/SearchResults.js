import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Box, Heading } from 'grommet';

import { DIMENSIONS, RIGHTS, INDICATORS } from 'containers/App/constants';
import { getCountries } from 'containers/App/selectors';
import { selectCountry, selectMetric } from 'containers/App/actions';

import rootMessages from 'messages';
import messages from './messages';

import { prepMetrics, prepCountries } from './search';

import NavOptionGroup from './NavOptionGroup';

export function SearchResults({
  countries,
  onSelectCountry,
  onSelectMetric,
  intl,
  onClose,
  search,
}) {
  const sortedCountries = countries && prepCountries(countries, search, intl);
  const dimensions = prepMetrics(DIMENSIONS, 'dimensions', search, intl);
  const rights = prepMetrics(RIGHTS, 'rights', search, intl);
  const indicators = prepMetrics(INDICATORS, 'indicators', search, intl);
  const hasMetrics =
    dimensions.length > 0 || rights.length > 0 || indicators.length > 0;
  const hasCountries = sortedCountries && sortedCountries.length > 0;
  return (
    <Box direction="column" pad="medium">
      {!hasCountries && !hasMetrics && (
        <FormattedMessage {...messages.search.noResults} />
      )}
      {hasCountries && (
        <div>
          <Heading responsive={false} level="5" margin={{ bottom: 'xsmall' }}>
            <FormattedMessage {...messages.countries} />
          </Heading>
          <NavOptionGroup
            options={sortedCountries}
            onClick={key => {
              onClose();
              onSelectCountry(key);
            }}
          />
        </div>
      )}
      {hasMetrics && (
        <div>
          <Heading responsive={false} level="5" margin={{ bottom: 'xsmall' }}>
            <FormattedMessage {...messages.metrics} />
          </Heading>
          {dimensions.length > 0 && (
            <NavOptionGroup
              label={intl.formatMessage(rootMessages.metricTypes.dimensions)}
              options={dimensions}
              onClick={key => {
                onClose();
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
                onSelectMetric(key);
              }}
            />
          )}
        </div>
      )}
    </Box>
  );
}

SearchResults.propTypes = {
  onSelectCountry: PropTypes.func,
  onSelectMetric: PropTypes.func,
  countries: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onClose: PropTypes.func,
  search: PropTypes.string,
  intl: intlShape.isRequired,
};

const mapStateToProps = state => ({
  countries: getCountries(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSelectMetric: metric => dispatch(selectMetric(metric)),
    onSelectCountry: country => dispatch(selectCountry(country)),
    intl: intlShape.isRequired,
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(SearchResults));
