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
import { Box, ResponsiveContext, Image as GImage } from 'grommet';

import { navigate } from 'containers/App/actions';
import { getCloseTargetMetric } from 'containers/App/selectors';
import { PATHS, IMAGE_PATH } from 'containers/App/constants';
import LayerInfo from 'containers/LayerInfo';
import ChartContainerMetric from 'containers/ChartContainerMetric';
import TabContainer from 'containers/TabContainer';
import AboutMetricContainer from 'containers/AboutMetricContainer';
import AboutCountryContainer from 'containers/AboutCountryContainer';

import HeaderLinks from 'components/HeaderLinks';
import AsideBackground from 'components/AsideBackground';
import Aside from 'components/Aside';

import ContentWrap from 'styled/ContentWrap';
import MainColumn from 'styled/MainColumn';
import ContentContainer from 'styled/ContentContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import PageTitle from 'styled/PageTitle';
import rootMessages from 'messages';

import getMetricDetails from 'utils/metric-details';
import { isMinSize } from 'utils/responsive';

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
    <ResponsiveContext.Consumer>
      {size => (
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
          <Box style={{ position: 'relative' }}>
            {isMinSize(size, 'large') && <AsideBackground />}
            <ContentContainer direction="column" header>
              <ContentMaxWidth
                header
                height="280px"
                hasAside={isMinSize(size, 'large')}
              >
                <MainColumn hasAside={isMinSize(size, 'large')} header>
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
                </MainColumn>
                {isMinSize(size, 'large') && (
                  <Aside>
                    <GImage src={`${IMAGE_PATH}/Empowerment.jpg`} fit="cover" />
                  </Aside>
                )}
              </ContentMaxWidth>
            </ContentContainer>
          </Box>
          <TabContainer
            size={size}
            tabs={[
              {
                key: 'ChartContainerMetric',
                title: intl.formatMessage(
                  rootMessages.tabs.ChartContainerMetric,
                ),
                content: props => (
                  <ChartContainerMetric
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
      )}
    </ResponsiveContext.Consumer>
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
