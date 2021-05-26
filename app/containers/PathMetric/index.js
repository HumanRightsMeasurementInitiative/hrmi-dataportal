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
import { ResponsiveContext, Paragraph } from 'grommet';
import { withTheme } from 'styled-components';

import { navigate, setAsideLayer } from 'containers/App/actions';
import {
  getCloseTargetMetric,
  getAsideLayer,
  getAsideLayerActiveCode,
  getMaxYearESR,
  getMaxYearCPR,
} from 'containers/App/selectors';
import { PATHS, IMAGE_PATH, PAGES, RIGHTS } from 'containers/App/constants';
import ChartContainerMetric from 'containers/ChartContainerMetric';
import TabContainer from 'containers/TabContainer';
import AboutMetricContainer from 'containers/AboutMetricContainer';

import Breadcrumb from 'components/Breadcrumb';
import AsideBackground from 'components/AsideBackground';
import Aside from 'components/Aside';
import Tooltip from 'components/Tooltip';

import ContentWrap from 'styled/ContentWrap';
import MainColumn from 'styled/MainColumn';
import ContentContainer from 'styled/ContentContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import PageTitle from 'styled/PageTitle';
import ButtonTextIcon from 'styled/ButtonTextIcon';

import getMetricDetails from 'utils/metric-details';
import { isMinSize, isMaxSize } from 'utils/responsive';

import rootMessages from 'messages';
import messages from './messages';

export function PathMetric({
  match,
  intl,
  onMetricClick,
  nav,
  theme,
  onSetAsideLayer,
  asideLayer,
  activeCode,
  maxYearESR,
  maxYearCPR,
}) {
  // N.B. must declare the year selector state at this level so that ChartContainerMetric can use it passed down as a prop to feed into scores selector
  const [selectedYear, setSelectedYear] = useState(maxYearESR);

  const metricCode = match.params.metric;
  const metric = getMetricDetails(metricCode);
  // N.B. hacky way of handling sub-rights titles... fix later
  // prettier-ignore
  const metricTitle =
    metric.metricType === 'indicators'
      ? intl.formatMessage(rootMessages.subrights.rightTo[metric.key])
      : intl.formatMessage(rootMessages[metric.metricType][metric.key]);

  let metricTitleShort;
  let dimensionCode = metricCode;

  const ancestors = [{ key: 'all' }];
  let imageSrc;

  if (metric.metricType === 'dimensions') {
    imageSrc = `${IMAGE_PATH}/dimension_${metricCode}.png`;
  }
  if (metric.metricType === 'rights') {
    metricTitleShort = intl.formatMessage(
      rootMessages[`${metric.metricType}-xshort`][metric.key],
    );
    const right = RIGHTS.find(r => r.key === metricCode);
    imageSrc = right.icon;
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
    dimensionCode = metric.dimension;
  }
  if (metric.metricType === 'indicators') {
    imageSrc = `${IMAGE_PATH}/indicator_${metricCode}.png`;
    ancestors.push({
      type: 'dimensions',
      key: 'esr',
    });
    ancestors.push({
      type: 'rights-short',
      key: metric.right,
    });
    dimensionCode = 'esr';
  }
  const onCountryClick = code => {
    if (asideLayer && asideLayer.key === code) {
      onSetAsideLayer(false);
    } else {
      onSetAsideLayer({
        type: 'aboutCountry',
        background: `${dimensionCode}Active`,
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
          <div style={{ position: 'relative' }}>
            {isMinSize(size, 'large') && <AsideBackground />}
            <ContentContainer direction="column" header>
              <ContentMaxWidth
                header
                minHeight={
                  isMinSize(size, 'large')
                    ? `${theme.sizes.top.height}px`
                    : 'auto'
                }
                hasAside={isMinSize(size, 'large')}
              >
                <MainColumn hasAside={isMinSize(size, 'large')} header hasLinks>
                  <div>
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
                  </div>
                  <div>
                    <PageTitle>{metricTitle}</PageTitle>
                  </div>
                  {messages[metric.metricType][metricCode].header.a && (
                    <p style={{ fontSize: '21px', lineHeight: '38px' }}>
                      <FormattedMessage
                        {...messages[metric.metricType][metricCode].header.a}
                      />
                      {metric.type === 'esr' && (
                        <Tooltip
                          iconSize="medium"
                          text={intl.formatMessage(messages.rights.tooltip)}
                          inverse={false}
                          inAside={false}
                          superscript
                          large
                        />
                      )}
                    </p>
                  )}
                  {messages[metric.metricType][metricCode].header.b && (
                    <p style={{ fontSize: '21px', lineHeight: '38px' }}>
                      <FormattedMessage
                        {...messages[metric.metricType][metricCode].header.b}
                      />
                    </p>
                  )}
                  {messages[metric.metricType][metricCode].link && (
                    <Paragraph
                      size={isMaxSize(size, 'sm') ? 'small' : 'medium'}
                    >
                      <ButtonTextIcon
                        label={intl.formatMessage(
                          messages[metric.metricType][metricCode].link,
                        )}
                        onClick={() =>
                          nav(`${PATHS.PAGE}/${PAGES.methodology.key}`)
                        }
                        size="medium"
                        hasIcon
                      />
                    </Paragraph>
                  )}
                </MainColumn>
                {isMinSize(size, 'large') && (
                  <Aside image>
                    <img
                      src={imageSrc}
                      alt={metricTitle}
                      fit="cover"
                      style={{
                        overflow: 'hidden',
                        objectFit: 'cover',
                        maxWidth: '350px',
                      }}
                    />
                  </Aside>
                )}
              </ContentMaxWidth>
            </ContentContainer>
          </div>
          <TabContainer
            size={size}
            tabs={[
              {
                key: 'ChartContainerMetric',
                title: metricTitle,
                titleMobile: metricTitleShort,
                content: props => (
                  <ChartContainerMetric
                    {...props}
                    metric={metric}
                    onCountryClick={onCountryClick}
                    activeCode={activeCode}
                    selectedYear={selectedYear}
                    setSelectedYear={setSelectedYear}
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
                    showSources={
                      metric.type === 'esr' ||
                      metric.metricType === 'indicators'
                    }
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
  activeCode: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  maxYearESR: PropTypes.string,
  maxYearCPR: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  closeTarget: state => getCloseTargetMetric(state),
  asideLayer: state => getAsideLayer(state),
  activeCode: state => getAsideLayerActiveCode(state),
  maxYearESR: getMaxYearESR,
  maxYearCPR: getMaxYearCPR,
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
