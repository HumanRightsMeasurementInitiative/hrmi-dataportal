/**
 *
 * AboutMetricContainer
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { Box, Heading, Text } from 'grommet';

import { STANDARDS, RIGHTS, INDICATORS, FAQS } from 'containers/App/constants';
import { getIndicatorInfo, getESRIndicators } from 'containers/App/selectors';
import { loadDataIfNeeded, selectMetric } from 'containers/App/actions';
import FAQs from 'containers/FAQs';

import AboutMetric from 'components/AboutMetric';

import ButtonHero from 'styled/ButtonHero';

import getMetricDetails from 'utils/metric-details';
import { lowerCase } from 'utils/string';

import rootMessages from 'messages';
import messages from './messages';
import ButtonRelative from './ButtonRelative';

const Pad = styled(Box)`
  padding-bottom: 16px;
`;

const DEPENDENCIES_INDICATORS = ['esrIndicators'];

export function AboutMetricContainer({
  metricCode,
  ancestors,
  metricInfo,
  allIndicators,
  onLoadData,
  onSelectMetric,
  intl,
  showRelated,
  showFAQs,
  showMetricLink,
  showTitle,
  showSources,
  countryScoreMsg,
  inverse,
  dateRange,
  countryCode,
  showAboutMetric,
  isSubright,
  hasMultipleIndicators,
  asideRef,
}) {
  useEffect(() => {
    // kick off loading of data
    onLoadData(metric);
  }, [metric]);

  const metric = getMetricDetails(metricCode);
  const { metricType } = metric;

  // N.B. not the ideal way to handle clicking subrights / indicators, but could be re-worked in a rebuild
  /* eslint-disable no-nested-ternary */
  // prettier-ignore
  const subMetricType =
    typeof isSubright === 'undefined'
      ? metric.metricType
      : isSubright 
        ? 'subrights'
        : 'indicators-raw';
  /* eslint-enable */

  const standard =
    metricType === 'indicators'
      ? STANDARDS.find(s => metricInfo.standard === s.code)
      : null;

  let children = [];
  let questions = [];
  if (showRelated || isSubright !== false) {
    if (metricType === 'dimensions') {
      children = RIGHTS.filter(
        r => r.dimension === metric.key && typeof r.aggregate === 'undefined',
      );
      questions =
        metric.type === 'cpr' ? FAQS.CPR_DIMENSION : FAQS.ESR_DIMENSION;
    }
    if (metricType === 'rights' && metric.type === 'cpr') {
      children = RIGHTS.filter(r => r.aggregate === metric.key);
      questions = FAQS.CPR_RIGHT;
    }
    if (allIndicators && metricType === 'rights' && metric.type === 'esr') {
      children = STANDARDS.map(as => ({
        ...as,
        indicators: INDICATORS.filter(i => {
          const indicator = allIndicators.find(ii => ii.metric_code === i.code);
          return (
            i.right === metric.key &&
            (indicator.standard === 'Both' || indicator.standard === as.code)
          );
        }),
      }));
      questions = FAQS.ESR_RIGHT;
    }
    if (metricType === 'indicators' && metric.right !== 'violence') {
      questions = FAQS.ESR_INDICATOR;
    }
    if (metric.right === 'violence') {
      questions = FAQS.PACIFIC_INDICATOR;
    }
  }

  return (
    <Box
      direction="column"
      pad={{ horizontal: 'medium', bottom: 'medium', top: 'xlarge' }}
    >
      <div ref={asideRef}>
        {showRelated && (
          <div justify="start">
            {metricType !== 'dimensions' && metric.right !== 'violence' && (
              <Pad>
                <Heading
                  responsive={false}
                  size="18px"
                  margin={{ vertical: 'xsmall' }}
                >
                  {typeof metric.aggregate === 'undefined' && (
                    <FormattedMessage {...messages.titleParent[metricType]} />
                  )}
                </Heading>
                <ButtonRelative
                  onClick={evt => {
                    if (evt) evt.preventDefault();
                    onSelectMetric(ancestors[ancestors.length - 1].key);
                  }}
                  previous
                  text={
                    <FormattedMessage
                      {...rootMessages[ancestors[ancestors.length - 1].type][
                        ancestors[ancestors.length - 1].key
                      ]}
                    />
                  }
                />
              </Pad>
            )}
            {metricType !== 'indicators' && children.length > 0 && (
              <Pad>
                <Heading
                  responsive={false}
                  size="18px"
                  margin={{ vertical: 'xsmall' }}
                >
                  {metricType === 'dimensions' && (
                    <FormattedMessage {...messages.titleChildren[metricType]} />
                  )}
                  {metricType === 'rights' && (
                    <FormattedMessage
                      {...messages.titleChildren[metricType][metric.type]}
                    />
                  )}
                </Heading>
                {((metricType === 'rights' && metric.type === 'cpr') ||
                  metricType === 'dimensions') && (
                  <>
                    {children.map(child => (
                      <ButtonRelative
                        key={child.key}
                        onClick={evt => {
                          if (evt) evt.preventDefault();
                          onSelectMetric(child.key);
                        }}
                        text={
                          <FormattedMessage
                            {...rootMessages['rights-short'][child.key]}
                          />
                        }
                      />
                    ))}
                  </>
                )}
                {metricType === 'rights' && metric.type === 'esr' && (
                  <>
                    {children.map(as => (
                      <Pad key={as.key}>
                        <Text
                          size="14px"
                          color="#262064"
                          margin={{ bottom: 'xxsmall' }}
                        >
                          {`${intl.formatMessage(
                            rootMessages.settings.standard.name,
                          )}: '${intl.formatMessage(
                            rootMessages.settings.standard[as.key],
                          )}'`}
                        </Text>
                        <>
                          {as.indicators.map(child => (
                            <ButtonRelative
                              key={child.key}
                              onClick={evt => {
                                if (evt) evt.preventDefault();
                                onSelectMetric(child.key);
                              }}
                              text={
                                <Text size="small">
                                  {intl.formatMessage(
                                    rootMessages.subrights.rightTo[child.key],
                                  )}
                                </Text>
                              }
                            />
                          ))}
                        </>
                      </Pad>
                    ))}
                  </>
                )}
              </Pad>
            )}
          </div>
        )}
        {showTitle && (
          <Heading responsive={false} level={3}>
            {isSubright ? (
              intl.formatMessage(
                rootMessages[subMetricType].rightTo[metric.key],
              )
            ) : (
              <FormattedMessage {...rootMessages[subMetricType][metric.key]} />
            )}
          </Heading>
        )}
        {countryScoreMsg && isSubright !== false && (
          <div>
            <Text color={inverse ? 'white' : 'dark'}>{countryScoreMsg}</Text>
          </div>
        )}
        {showMetricLink && (
          <div>
            <ButtonHero onClick={() => onSelectMetric(metricCode)}>
              {isSubright ? (
                <FormattedMessage
                  {...messages['metricLink-subrights']}
                  values={{
                    metric: lowerCase(
                      intl.formatMessage(
                        rootMessages[subMetricType][metricCode],
                      ),
                    ),
                  }}
                />
              ) : (
                <FormattedMessage
                  {...messages.metricLink}
                  values={{
                    metric: lowerCase(
                      intl.formatMessage(
                        rootMessages[subMetricType][metricCode],
                      ),
                    ),
                  }}
                />
              )}
            </ButtonHero>
          </div>
        )}
        {isSubright === false && (
          <div style={{ marginTop: 12 }}>
            <Text weight="bold">
              {`${intl.formatMessage(messages.indicator, {
                right: intl
                  .formatMessage(rootMessages['rights-short'][metric.right])
                  .toLowerCase(),
                isPlural: hasMultipleIndicators,
              })} ${countryScoreMsg}`}
            </Text>
          </div>
        )}
        {showAboutMetric && (
          <AboutMetric
            metric={metric}
            metricInfo={metricInfo}
            standard={standard}
            onSelectMetric={onSelectMetric}
            showSources={showSources}
            dateRange={dateRange}
            countryCode={countryCode}
            isSubright={isSubright}
            childrenIndicators={children}
          />
        )}
      </div>
      {showFAQs && (
        <FAQs
          questions={questions}
          metric={intl.formatMessage(
            rootMessages[metric.metricType][metric.key],
          )}
          metrics={metric}
          metricInfo={metricInfo}
          standard={standard}
          onSelectMetric={onSelectMetric}
          showSources={showSources}
          dateRange={dateRange}
          countryCode={countryCode}
        />
      )}
    </Box>
  );
}

AboutMetricContainer.propTypes = {
  metricCode: PropTypes.string,
  onSelectMetric: PropTypes.func,
  onLoadData: PropTypes.func.isRequired,
  metricInfo: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  allIndicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  intl: intlShape.isRequired,
  ancestors: PropTypes.array,
  showTitle: PropTypes.bool,
  showMetricLink: PropTypes.bool,
  showFAQs: PropTypes.bool,
  showRelated: PropTypes.bool,
  showSources: PropTypes.bool,
  inverse: PropTypes.bool,
  countryScoreMsg: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  countryCode: PropTypes.string,
  dateRange: PropTypes.object,
  showAboutMetric: PropTypes.bool,
  isSubright: PropTypes.bool,
  hasMultipleIndicators: PropTypes.bool,
  asideRef: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  metricInfo: (state, { metricCode }) => {
    const metric = getMetricDetails(metricCode);
    if (metric.metricType === 'indicators' && metric.right !== 'violence') {
      return getIndicatorInfo(state, metric.code);
    }
    return false;
  },
  allIndicators: (state, { metricCode }) => {
    const metric = getMetricDetails(metricCode);
    if (metric.metricType === 'rights' && metric.type === 'esr') {
      return getESRIndicators(state);
    }
    return false;
  },
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: metric => {
      if (metric.metricType === 'indicators') {
        return DEPENDENCIES_INDICATORS.forEach(key =>
          dispatch(loadDataIfNeeded(key)),
        );
      }
      return false;
    },
    onSelectMetric: metric => dispatch(selectMetric(metric)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(AboutMetricContainer));
