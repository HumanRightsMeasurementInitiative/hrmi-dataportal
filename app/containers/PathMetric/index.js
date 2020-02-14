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
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { Box } from 'grommet';

import Close from 'containers/Close';

import SingleMetric from 'containers/SingleMetric';

import TabContainer from 'containers/TabContainer';
import MetricAside from 'containers/MetricAside';
import ContentWrap from 'styled/ContentWrap';
import ContentContainer from 'styled/ContentContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import PageTitle from 'styled/PageTitle';
import HeaderLinks from 'components/HeaderLinks';
import { PATHS } from 'containers/App/constants';
import rootMessages from 'messages';

import getMetricDetails from 'utils/metric-details';

import { navigate } from 'containers/App/actions';
import { getCloseTargetMetric } from 'containers/App/selectors';

export function PathMetric({ match, intl, onMetricClick, closeTarget }) {
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
      <ContentContainer direction="column" header>
        <ContentMaxWidth>
          <Close closeTarget={closeTarget} />
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
  onMetricClick: PropTypes.func,
  closeTarget: PropTypes.object,
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
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(PathMetric));
