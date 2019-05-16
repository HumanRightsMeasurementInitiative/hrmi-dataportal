/**
 *
 * CountryMetric
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
// import styled from 'styled-components';
import { Heading, Button, Box } from 'grommet';

import rootMessages from 'messages';

import WordCloud from 'components/WordCloud';
import Close from 'containers/Close';

import getMetricDetails from 'utils/metric-details';

import {
  getCountry,
  getScaleSearch,
  getStandardSearch,
  getBenchmarkSearch,
  getPeopleAtRisk,
  getModalTabSearch,
} from 'containers/App/selectors';

import {
  navigate,
  setModalTab,
  selectCountry,
  selectMetric,
} from 'containers/App/actions';

// import { INCOME_GROUPS } from 'containers/App/constants';
// import quasiEquals from 'utils/quasi-equals';
// import { hasCPR } from 'utils/scores';

// import messages from './messages';

export function CountryMetric({
  metricCode,
  countryCode,
  // tabIndex = 0,
  onClose,
  onSelectCountry,
  onSelectMetric,
  base,
  intl,
  atRisk,
}) {
  const metric = getMetricDetails(metricCode);
  const countryTitle =
    countryCode && intl.formatMessage(rootMessages.countries[countryCode]);
  const metricTitle =
    metric && intl.formatMessage(rootMessages[metric.metricType][metric.key]);

  return (
    <Box overflow="auto" pad="large">
      <Helmet>
        <title>{`${countryTitle} - ${metricTitle}`}</title>
        <meta name="description" content="Description of Country Metric page" />
      </Helmet>
      <Close
        onClick={() =>
          onClose(base, base === 'country' ? countryCode : metricCode)
        }
      />
      <Heading level="2" margin={{ top: '5px', bottom: '5px;' }}>
        <Button
          onClick={() => {
            if (base === 'country') {
              onClose(base, countryCode);
            } else {
              onSelectCountry(countryCode);
            }
          }}
        >
          {countryTitle}
        </Button>
      </Heading>
      <Heading level="2" margin={{ top: '5px' }}>
        <Button
          onClick={() => {
            if (base === 'metric') {
              onClose(base, metricCode);
            } else {
              onSelectMetric(metricCode);
            }
          }}
        >
          {metricTitle}
        </Button>
      </Heading>
      <div>
        {Object.values(atRisk).map((d, index, array) => (
          <WordCloud
            key={d.code}
            data={d}
            dimension={metric.dimension}
            showTitle={array.length > 1}
          />
        ))}
      </div>
    </Box>
  );
}

CountryMetric.propTypes = {
  intl: intlShape.isRequired,
  onClose: PropTypes.func,
  onSelectMetric: PropTypes.func,
  onSelectCountry: PropTypes.func,
  metricCode: PropTypes.string,
  countryCode: PropTypes.string,
  base: PropTypes.string,
  // tabIndex: PropTypes.number,
  atRisk: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  country: (state, { countryCode }) => getCountry(state, countryCode),
  scale: state => getScaleSearch(state),
  standard: state => getStandardSearch(state),
  benchmark: state => getBenchmarkSearch(state),
  tabIndex: state => getModalTabSearch(state),
  atRisk: (state, { countryCode, metricCode }) =>
    getPeopleAtRisk(state, {
      country: countryCode,
      metric: metricCode,
    }),
});

export function mapDispatchToProps(dispatch) {
  return {
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
    onTabClick: index => dispatch(setModalTab(index)),
    onSelectCountry: country => dispatch(selectCountry(country)),
    onSelectMetric: metric => dispatch(selectMetric(metric)),
    onClose: (base, code) =>
      dispatch(
        navigate(
          {
            pathname: `/${base}/${code}`,
          },
          {
            replace: false,
            deleteParams: ['mtab'],
          },
        ),
      ),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(CountryMetric));
