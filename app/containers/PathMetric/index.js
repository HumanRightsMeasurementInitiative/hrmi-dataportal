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
import { Layer, Box } from 'grommet';
import { FormNext } from 'grommet-icons';

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

  const ancestors = [];

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
        <Layer
          full
          margin="small"
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
      <ContentContainer direction="column" header>
        <ContentMaxWidth>
          <Close topRight />
          <Box direction="column">
            {ancestors.length > 0 && (
              <HeaderLinks
                onItemClick={key => onMetricClick(key)}
                spacer={<FormNext />}
                items={ancestors.map(ancestor => ({
                  key: ancestor.key,
                  label: intl.formatMessage(
                    rootMessages[ancestor.type][ancestor.key],
                  ),
                }))}
              />
            )}
            {ancestors.length === 0 && (
              <HeaderLinks
                onItemClick={() => false}
                items={[
                  {
                    key: 'x',
                    label: '',
                  },
                ]}
              />
            )}
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
              content: <SingleMetric metric={metric} />,
            },
            {
              key: 'about',
              title: intl.formatMessage(rootMessages.tabs.about),
              content: <MetricAside metric={metric} ancestors={ancestors} />,
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
    onMetricClick: code => dispatch(navigate({ pathname: `/metric/${code}` })),
    onCloseMetricOverlay: code =>
      dispatch(
        navigate(
          {
            pathname: `/metric/${code}`,
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
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(PathMetric));
