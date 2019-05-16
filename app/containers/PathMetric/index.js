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
import { Layer } from 'grommet';

import CountryMetric from 'containers/CountryMetric';
import Close from 'containers/Close';

import SingleMetric from 'containers/SingleMetric/Loadable';

import TabContainer from 'containers/TabContainer';
import MetricAside from 'components/MetricAside';
import ContentWrap from 'styled/ContentWrap';
import ContentContainer from 'styled/ContentContainer';
import PageTitle from 'styled/PageTitle';

import rootMessages from 'messages';

import getMetricDetails from 'utils/metric-details';

import { navigate } from 'containers/App/actions';

export function PathMetric({ match, intl, onCloseMetricOverlay }) {
  const metricCode = match.params.metric;
  const metric = getMetricDetails(metricCode);
  const metricTitle = intl.formatMessage(
    rootMessages[metric.metricType][metric.key],
  );
  return (
    <ContentWrap>
      <Helmet>
        <title>{metricTitle}</title>
        <meta name="description" content="Description of metric" />
      </Helmet>
      {match.params.country && (
        <Layer
          full
          margin="large"
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
      <ContentContainer direction="column" paddingTop>
        <Close topRight />
        <PageTitle>{metricTitle}</PageTitle>
      </ContentContainer>
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
            content: <MetricAside />,
          },
        ]}
      />
    </ContentWrap>
  );
}

PathMetric.propTypes = {
  intl: intlShape.isRequired,
  onCloseMetricOverlay: PropTypes.func,
  match: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
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
