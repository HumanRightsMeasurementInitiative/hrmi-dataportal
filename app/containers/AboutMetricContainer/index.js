/**
 *
 * AboutCountryContainer
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
import { FormNext, FormPrevious } from 'grommet-icons';

import { STANDARDS, RIGHTS, INDICATORS, FAQS } from 'containers/App/constants';
import { getIndicatorInfo, getESRIndicators } from 'containers/App/selectors';
import { loadDataIfNeeded, selectMetric } from 'containers/App/actions';
import saga from 'containers/App/saga';
import AboutMetricSources from 'containers/AboutMetricSources';
import FAQs from 'containers/FAQs';

import AboutMetric from 'components/AboutMetric';
import Button from 'styled/Button';
import ButtonHighlight from 'styled/ButtonHighlight';

import { useInjectSaga } from 'utils/injectSaga';
import rootMessages from 'messages';
import messages from './messages';

const TextRelative = styled.span`
  vertical-align: middle;
`;
// prettier-ignore
const ButtonRelative = styled(Button)`
  display: block;
  border-radius: 3px;
  color: ${({ theme }) => theme.global.colors.text.light};
  background-color: ${({ theme }) => theme.global.colors['light-3']};
  padding: 2px 6px;
  padding-left: ${({ previous }) => previous ? 2 : 6}px;
  padding-right: ${({ previous }) => previous ? 6 : 2}px;
  margin: 0.5em 0;
  font-weight: 600;
  font-size: ${({ theme }) => theme.text.small.size};
  text-align: left;
  &:hover {
    color: ${({ theme }) => theme.global.colors.text.light};
    background-color: ${({ theme }) => theme.global.colors.highlight};
  }
  &:focus {
    background-color: ${({ theme }) => theme.global.colors.highlight};
    outline-color: transparent;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 2px 10px;
    padding-left: ${({ previous }) => previous ? 3 : 10}px;
    padding-right: ${({ previous }) => previous ? 10 : 3}px;
    font-size: ${({ theme }) => theme.text.small.size};
    font-weight: 600;
  }
`;

const Pad = styled.div`
  padding-bottom: 16px;
`;

const DEPENDENCIES_INDICATORS = ['esrIndicators'];

export function AboutMetricContainer({
  metric,
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
}) {
  useInjectSaga({ key: 'app', saga });

  useEffect(() => {
    // kick off loading of data
    onLoadData(metric);
  }, [metric]);

  const { metricType } = metric;

  const standard =
    metricType === 'indicators'
      ? STANDARDS.find(s => metricInfo.standard === s.code)
      : null;

  let children = [];
  let questions = [];
  if (showRelated) {
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
    if (metricType === 'indicators') {
      questions = FAQS.ESR_INDICATOR;
    }
  }

  return (
    <Box direction="column">
      <AboutMetric
        metric={metric}
        metricInfo={metricInfo}
        standard={standard}
        showTitle={showTitle}
      />
      <Box
        direction="column"
        pad={{ vertical: 'medium', horizontal: 'medium' }}
        justify="start"
      >
        {showRelated && metricType !== 'dimensions' && (
          <Pad>
            <Heading
              responsive={false}
              level={5}
              margin={{ vertical: 'xsmall' }}
            >
              {typeof metric.aggregate === 'undefined' && (
                <FormattedMessage {...messages.titleParent[metricType]} />
              )}
              {typeof metric.aggregate !== 'undefined' && (
                <FormattedMessage {...messages.titleParent.subrights} />
              )}
            </Heading>
            <ButtonRelative
              onClick={evt => {
                if (evt) evt.preventDefault();
                onSelectMetric(ancestors[ancestors.length - 1].key);
              }}
              previous
            >
              <FormPrevious size="large" />
              <TextRelative>
                <FormattedMessage
                  {...rootMessages[ancestors[ancestors.length - 1].type][
                    ancestors[ancestors.length - 1].key
                  ]}
                />
              </TextRelative>
            </ButtonRelative>
          </Pad>
        )}
        {showRelated && metricType !== 'indicators' && children.length > 0 && (
          <Pad>
            <Heading
              responsive={false}
              level={5}
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
                  >
                    <TextRelative>
                      <FormattedMessage {...rootMessages.rights[child.key]} />
                    </TextRelative>
                    <FormNext size="large" />
                  </ButtonRelative>
                ))}
              </>
            )}
            {metricType === 'rights' && metric.type === 'esr' && (
              <>
                {children.map(as => (
                  <Pad key={as.key}>
                    <Text size="small">
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
                        >
                          <TextRelative>
                            <FormattedMessage
                              {...rootMessages.indicators[child.key]}
                            />
                          </TextRelative>
                          <FormNext size="large" />
                        </ButtonRelative>
                      ))}
                    </>
                  </Pad>
                ))}
              </>
            )}
          </Pad>
        )}
        {showFAQs && (
          <FAQs
            questions={questions}
            metric={intl.formatMessage(
              rootMessages[metric.metricType][metric.key],
            )}
          />
        )}
        {showMetricLink && (
          <Box>
            <ButtonHighlight onClick={() => onSelectMetric(metricCode)}>
              {`Explore ${intl.formatMessage(
                rootMessages[metric.metricType][metricCode],
              )} for all countries`}
            </ButtonHighlight>
          </Box>
        )}
        {showSources && (
          <AboutMetricSources
            metric={metric}
            indicatorInfo={metricInfo}
            onSelectMetric={onSelectMetric}
          />
        )}
      </Box>
    </Box>
  );
}

AboutMetricContainer.propTypes = {
  metricCode: PropTypes.object,
  metric: PropTypes.object,
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
};

const mapStateToProps = createStructuredSelector({
  metricInfo: (state, { metric }) => {
    if (metric.metricType === 'indicators') {
      return getIndicatorInfo(state, metric.code);
    }
    return false;
  },
  allIndicators: (state, { metric }) => {
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
