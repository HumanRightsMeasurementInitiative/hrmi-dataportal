/**
 *
 * Metric
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { Box, ResponsiveContext, Image as GImage, Paragraph } from 'grommet';

import { navigate, openHowToRead, openSettings } from 'containers/App/actions';
import { getCloseTargetMetric } from 'containers/App/selectors';
import { PATHS, IMAGE_PATH, PAGES } from 'containers/App/constants';
import LayerInfo from 'containers/LayerInfo';
import ChartContainerMetric from 'containers/ChartContainerMetric';
import TabContainer from 'containers/TabContainer';
import AboutMetricContainer from 'containers/AboutMetricContainer';
import AboutCountryContainer from 'containers/AboutCountryContainer';

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

export function PathMetric({ match, intl, onMetricClick, nav, closeLayers }) {
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
                  {metric.metricType !== 'indicators' && (
                    <>
                      <Paragraph>
                        <FormattedMessage
                          {...messages[metric.metricType][metricCode].header}
                        />
                      </Paragraph>
                      <Paragraph>
                        <FormattedMessage
                          {...messages[metric.metricType][metricCode].header2}
                        />
                      </Paragraph>
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
                    </>
                  )}
                </MainColumn>
                {isMinSize(size, 'large') && (
                  <Aside image>
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
                title: metricTitle,
                content: props => (
                  <ChartContainerMetric
                    {...props}
                    metric={metric}
                    onCountryClick={code => {
                      closeLayers();
                      setAboutCountry(aboutCountry ? null : code);
                    }}
                  />
                ),
                tools: {
                  howToReadConfig: {
                    contxt: 'PathMetric',
                    charts: [metric.type === 'cpr' ? 'Bullet' : 'Bar'],
                    dimension: metric.color,
                  },
                  settingsConfig: (metric.type === 'esr' ||
                    metric.metricType === 'indicators') && {
                    key: 'metric',
                    showStandard: metric.metricType !== 'indicators',
                    showBenchmark: true,
                  },
                },
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
  nav: PropTypes.func,
  match: PropTypes.object,
  closeLayers: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  closeTarget: state => getCloseTargetMetric(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    closeLayers: () => {
      dispatch(openHowToRead(null));
      dispatch(openSettings(null));
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

export default compose(withConnect)(injectIntl(PathMetric));
