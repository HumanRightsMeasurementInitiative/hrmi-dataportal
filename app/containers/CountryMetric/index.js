/**
 *
 * CountryMetric
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
import { Heading, Button, Box, Paragraph } from 'grommet';

import rootMessages from 'messages';

import HTMLWrapper from 'components/HTMLWrapper';
import Loading from 'components/Loading';
import WordCloud from 'components/WordCloud';
import Close from 'containers/Close';

import { RIGHTS } from 'containers/App/constants';

import getMetricDetails from 'utils/metric-details';

import {
  getCountry,
  getScaleSearch,
  getStandardSearch,
  getBenchmarkSearch,
  getPeopleAtRisk,
  getModalTabSearch,
  getContentByKey,
  getLocale,
} from 'containers/App/selectors';

import {
  navigate,
  setModalTab,
  selectCountry,
  selectMetric,
  loadContentIfNeeded,
} from 'containers/App/actions';

import messages from './messages';

const RightHeading = props => (
  <Heading level={4} margin={{ vertical: '15px' }} {...props} />
);
const StyledRightHeading = styled(RightHeading)`
  font-weight: normal;
`;
const hasSubrights = metric => {
  const subrights = RIGHTS.filter(r => r.aggregate === metric.key);
  return subrights.length > 0;
};

const generateKey = (metricCode, countryCode) => {
  const metric = getMetricDetails(metricCode);
  if (metric.metricType === 'rights') {
    if (metric.type === 'esr') {
      return `esr/${countryCode}`;
    }
    return `${metricCode}/${countryCode}`;
  }
  if (metric.metricType === 'dimensions' && metric.key === 'esr') {
    return `esr/${countryCode}`;
  }
  return null;
};

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
  atRiskAnalysis,
  onLoadContent,
  locale,
}) {
  const metric = getMetricDetails(metricCode);
  useEffect(() => {
    const key = generateKey(metricCode, countryCode);
    if (key) onLoadContent(key);
  }, []);

  const countryTitle =
    countryCode && intl.formatMessage(rootMessages.countries[countryCode]);
  const metricTitle =
    metric && intl.formatMessage(rootMessages[metric.metricType][metric.key]);

  const hasAnalysis =
    (metric.metricType === 'rights' && !hasSubrights(metric)) ||
    (metric.metricType === 'dimensions' && metric.key === 'esr');

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
      {metric.metricType === 'rights' && (
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
      )}
      {metric.metricType === 'dimensions' && (
        <div>
          {Object.values(atRisk).map(i => (
            <div key={i.key}>
              <StyledRightHeading>
                <FormattedMessage {...rootMessages.rights[i.key]} />
              </StyledRightHeading>
              {Object.values(i.atRiskData).map((d, index, array) => (
                <WordCloud
                  key={d.code}
                  data={d}
                  dimension={i.dimension}
                  showTitle={array.length > 1}
                />
              ))}
            </div>
          ))}
        </div>
      )}
      {hasAnalysis && atRiskAnalysis && (
        <span>
          {atRiskAnalysis.locale !== locale && (
            <Paragraph>
              <FormattedMessage {...messages.noAnalysisInLanguage} />
            </Paragraph>
          )}
          <HTMLWrapper innerhtml={atRiskAnalysis.content} />
        </span>
      )}
      {hasAnalysis && !atRiskAnalysis && <Loading />}
    </Box>
  );
}

CountryMetric.propTypes = {
  intl: intlShape.isRequired,
  onClose: PropTypes.func,
  onSelectMetric: PropTypes.func,
  onLoadContent: PropTypes.func,
  onSelectCountry: PropTypes.func,
  metricCode: PropTypes.string,
  locale: PropTypes.string,
  countryCode: PropTypes.string,
  base: PropTypes.string,
  // tabIndex: PropTypes.number,
  atRisk: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  atRiskAnalysis: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  locale: state => getLocale(state),
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
  atRiskAnalysis: (state, { countryCode, metricCode }) =>
    getContentByKey(state, generateKey(metricCode, countryCode)),
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
    onLoadContent: path => {
      dispatch(loadContentIfNeeded(path, 'atrisk'));
    },
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
