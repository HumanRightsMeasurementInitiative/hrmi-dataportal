/**
 *
 * Metric
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { Box } from 'grommet';

import { PATHS } from 'containers/App/constants';
import LayerInfo from 'containers/LayerInfo';
import SingleMetric from 'containers/SingleMetric';
import TabContainer from 'containers/TabContainer';
import AboutMetricContainer from 'containers/AboutMetricContainer';
import AboutCountryContainer from 'containers/AboutCountryContainer';

import HeaderLinks from 'components/HeaderLinks';

import ContentWrap from 'styled/ContentWrap';
import ContentContainer from 'styled/ContentContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import PageTitle from 'styled/PageTitle';
import rootMessages from 'messages';

import getMetricDetails from 'utils/metric-details';

import { navigate } from 'containers/App/actions';
import { getCloseTargetMetric } from 'containers/App/selectors';

export function PathMetric({ match, intl, onMetricClick }) {
  const [aboutCountry, setAboutCountry] = useState(null);
  const metricCode = match.params.metric;
  const metric = getMetricDetails(metricCode);
  const metricTitle = intl.formatMessage(
    rootMessages[metric.metricType][metric.key],
  );

  const ancestors = [{ key: 'all' }];

  if (metric.metricType === 'rights') {
    ancestors.push({
      type: 'dimensions',
      key: metric.dimension,
    });
    if (metric.aggregate) {
      ancestors.push({
        type: 'rights-short',
        key: metric.aggregate,
      });
    }
  }
  if (metric.metricType === 'indicators') {
    ancestors.push({
      type: 'dimensions',
      key: 'esr',
    });
    ancestors.push({
      type: 'rights-short',
      key: metric.right,
    });
  }
  // onCategoryClick={(key, value) => {
  //   onAddFilter(key, value);
  // }}
  return (
    <ContentWrap>
      <Helmet>
        <title>{metricTitle}</title>
        <meta name="description" content="Description of metric" />
      </Helmet>
      {aboutCountry && (
        <LayerInfo
          content={
            <AboutCountryContainer
              countryCode={aboutCountry}
              showTitle
              showCountryLink
            />
          }
          onClose={() => setAboutCountry(null)}
        />
      )}
      <ContentContainer direction="column" header>
        <ContentMaxWidth>
          <Box direction="column">
            <HeaderLinks
              onItemClick={key => onMetricClick(key)}
              breadcrumb
              items={ancestors.map(ancestor => ({
                key: ancestor.key,
                label: intl.formatMessage(
                  ancestor.key === 'all'
                    ? rootMessages.labels.allMetrics
                    : rootMessages[ancestor.type][ancestor.key],
                ),
              }))}
            />
            <PageTitle>{metricTitle}</PageTitle>
          </Box>
        </ContentMaxWidth>
      </ContentContainer>
      <TabContainer
        tabs={[
          {
            key: 'singleMetric',
            title: intl.formatMessage(rootMessages.tabs.singleMetric),
            content: props => (
              <SingleMetric
                {...props}
                metric={metric}
                onCountryClick={code => setAboutCountry(code)}
              />
            ),
          },
          {
            aside: true,
            key: 'about',
            title: intl.formatMessage(rootMessages.tabs.about),
            content: props => (
              <AboutMetricContainer
                {...props}
                metric={metric}
                metricCode={metricCode}
                ancestors={ancestors}
                showFAQs
                showRelated
                showSources
              />
            ),
          },
        ]}
      />
    </ContentWrap>
  );
}

PathMetric.propTypes = {
  intl: intlShape.isRequired,
  onMetricClick: PropTypes.func,
  // onAddFilter: PropTypes.func,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  closeTarget: state => getCloseTargetMetric(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onMetricClick: code =>
      dispatch(
        navigate(
          {
            pathname:
              code === 'all' ? `/${PATHS.METRICS}` : `/${PATHS.METRIC}/${code}`,
          },
          {
            trackEvent: {
              category: 'Data',
              action: 'Change metric (Metric, header links)',
              value: code,
            },
          },
        ),
      ),
    // onAddFilter: (key, value) =>
    //   dispatch(
    //     navigate(
    //       { search: `?${key}=${value}` },
    //       {
    //         replace: false,
    //         multiple: true,
    //         trackEvent: {
    //           category: 'Data',
    //           action: 'Country filter (Metric)',
    //           value: `${key}/${value}`,
    //         },
    //       },
    //     ),
    //   ),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(PathMetric));
