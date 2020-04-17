/**
 *
 * Metric
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { Box, ResponsiveContext, Image as GImage, Paragraph } from 'grommet';
import { withTheme } from 'styled-components';

import { navigate, setAsideLayer } from 'containers/App/actions';
import { getCloseTargetMetric, getAsideLayer } from 'containers/App/selectors';
import { PATHS, IMAGE_PATH, PAGES } from 'containers/App/constants';
import ChartContainerMetric from 'containers/ChartContainerMetric';
import TabContainer from 'containers/TabContainer';
import AboutMetricContainer from 'containers/AboutMetricContainer';

import Breadcrumb from 'components/Breadcrumb';
import AsideBackground from 'components/AsideBackground';
import Aside from 'components/Aside';

import ContentWrap from 'styled/ContentWrap';
import MainColumn from 'styled/MainColumn';
import ContentContainer from 'styled/ContentContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import PageTitle from 'styled/PageTitle';
import ButtonTextIcon from 'styled/ButtonTextIcon';

import getMetricDetails from 'utils/metric-details';
import { isMinSize } from 'utils/responsive';

import rootMessages from 'messages';
import messages from './messages';

const images = {
  empowerment: `${IMAGE_PATH}/Empowerment-768x512.jpg`,
  physint: `${IMAGE_PATH}/Safety-from-the-State-1-768x490.jpg`,
  esr: `${IMAGE_PATH}/Quality-of-LIfe-768x512.jpg`,
};

export function PathMetric({
  match,
  intl,
  onMetricClick,
  nav,
  theme,
  onSetAsideLayer,
  asideLayer,
}) {
  const metricCode = match.params.metric;
  const metric = getMetricDetails(metricCode);
  const metricTitle = intl.formatMessage(
    rootMessages[metric.metricType][metric.key],
  );

  const ancestors = [{ key: 'all' }];
  let imageSrc;

  if (metric.metricType === 'dimensions') {
    imageSrc = images[metricCode];
  }
  if (metric.metricType === 'rights') {
    imageSrc = images[metric.dimension];
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
    imageSrc = images.esr;
    ancestors.push({
      type: 'dimensions',
      key: 'esr',
    });
    ancestors.push({
      type: 'rights-short',
      key: metric.right,
    });
  }
  const onCountryClick = code => {
    if (asideLayer && asideLayer.key === code) {
      onSetAsideLayer(false);
    } else {
      onSetAsideLayer({
        type: 'aboutCountry',
        key: code,
        code,
      });
    }
  };
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <ContentWrap>
          <Helmet>
            <title>{metricTitle}</title>
            <meta name="description" content="Description of metric" />
          </Helmet>
          <Box style={{ position: 'relative' }}>
            {isMinSize(size, 'large') && <AsideBackground />}
            <ContentContainer direction="column" header>
              <ContentMaxWidth
                header
                height={`${theme.sizes.top.height}px`}
                hasAside={isMinSize(size, 'large')}
              >
                <MainColumn hasAside={isMinSize(size, 'large')} header hasLinks>
                  <Breadcrumb
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
                  {messages[metric.metricType][metricCode].header.a && (
                    <Paragraph>
                      <FormattedMessage
                        {...messages[metric.metricType][metricCode].header.a}
                      />
                    </Paragraph>
                  )}
                  {messages[metric.metricType][metricCode].header.b && (
                    <Paragraph>
                      <FormattedMessage
                        {...messages[metric.metricType][metricCode].header.b}
                      />
                    </Paragraph>
                  )}
                  {messages[metric.metricType][metricCode].link && (
                    <Paragraph>
                      <ButtonTextIcon
                        label={intl.formatMessage(
                          messages[metric.metricType][metricCode].link,
                        )}
                        onClick={() =>
                          nav(`${PATHS.PAGE}/${PAGES.methodology.key}`)
                        }
                      />
                    </Paragraph>
                  )}
                </MainColumn>
                {isMinSize(size, 'large') && (
                  <Aside image>
                    <GImage src={imageSrc} fit="cover" />
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
                title: metricTitle,
                content: props => (
                  <ChartContainerMetric
                    {...props}
                    metric={metric}
                    onCountryClick={onCountryClick}
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
  nav: PropTypes.func,
  match: PropTypes.object,
  theme: PropTypes.object,
  onSetAsideLayer: PropTypes.func,
  asideLayer: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  closeTarget: state => getCloseTargetMetric(state),
  asideLayer: state => getAsideLayer(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSetAsideLayer: config => {
      dispatch(setAsideLayer(config));
    },
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
    nav: location => {
      dispatch(
        navigate(location, {
          keepTab: true,
          trackEvent: {
            category: 'Content',
            action: 'Header: navigate',
            value: typeof location === 'object' ? location.pathname : location,
          },
        }),
      );
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(withTheme(PathMetric)));
