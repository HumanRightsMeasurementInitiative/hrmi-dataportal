/**
 *
 * Metric
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl, intlShape } from 'react-intl';
import { Helmet } from 'react-helmet';
import { Layer, Box, ResponsiveContext } from 'grommet';

import CountryMetric from 'containers/CountryMetric';
import Close from 'containers/Close';

import SingleMetric from 'containers/SingleMetric';

import TabContainer from 'containers/TabContainer';
import MetricAside from 'containers/MetricAside';
import ContentWrap from 'styled/ContentWrap';
import ContentContainer from 'styled/ContentContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import PageTitle from 'styled/PageTitle';
import HeaderLinks from 'components/HeaderLinks';

import rootMessages from 'messages';

import getMetricDetails from 'utils/metric-details';
import { isMinSize } from 'utils/responsive';

import { navigate } from 'containers/App/actions';

export function PathMetric({
  match,
  intl,
  onCloseMetricOverlay,
  onMetricClick,
}) {
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
  return (
    <ContentWrap>
      <Helmet>
        <title>{metricTitle}</title>
        <meta name="description" content="Description of metric" />
      </Helmet>
      {match.params.country && (
        <ResponsiveContext.Consumer>
          {size => (
            <Layer
              animate={false}
              full="vertical"
              margin={{
                top: isMinSize(size, 'xlarge') ? 'large' : 'small',
                bottom: 'ms',
              }}
              onEsc={() => onCloseMetricOverlay(metricCode)}
              onClickOutside={() => onCloseMetricOverlay(metricCode)}
            >
              <CountryMetric
                metricCode={metricCode}
                countryCode={match.params.country}
                base="metric"
              />
            </Layer>
          )}
        </ResponsiveContext.Consumer>
      )}
      <ContentContainer direction="column" header>
        <ContentMaxWidth>
          <Close float />
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
      <ContentMaxWidth>
        <TabContainer
          tabs={[
            {
              key: 'singleMetric',
              title: intl.formatMessage(rootMessages.tabs.singleMetric),
              content: props => <SingleMetric {...props} metric={metric} />,
              howToRead: {
                contxt: 'PathMetric',
                chart: metric.type === 'cpr' ? 'Bullet' : 'Bar',
                data: metric.color,
              },
            },
            {
              key: 'about',
              title: intl.formatMessage(rootMessages.tabs.about),
              content: props => (
                <MetricAside {...props} metric={metric} ancestors={ancestors} />
              ),
            },
          ]}
        />
      </ContentMaxWidth>
    </ContentWrap>
  );
}

PathMetric.propTypes = {
  intl: intlShape.isRequired,
  onCloseMetricOverlay: PropTypes.func,
  onMetricClick: PropTypes.func,
  match: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    onMetricClick: code =>
      dispatch(
        navigate(
          { pathname: code === 'all' ? '' : `/metric/${code}` },
          {
            trackEvent: {
              category: 'Content',
              action: 'Metric: change metric',
              value: code,
            },
          },
        ),
      ),
    onCloseMetricOverlay: code =>
      dispatch(
        navigate(
          {
            pathname: `/metric/${code}`,
          },
          {
            replace: false,
            deleteParams: ['mtab'],
            trackEvent: {
              category: 'Content',
              action: 'Metric-country close',
              value: `Metric: ${code}`,
            },
          },
        ),
      ),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(PathMetric));
