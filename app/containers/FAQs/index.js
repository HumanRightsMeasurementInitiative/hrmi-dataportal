import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  injectIntl,
  intlShape,
  FormattedMessage,
  FormattedHTMLMessage,
} from 'react-intl';
import styled from 'styled-components';
import { Accordion, AccordionPanel, Box, Heading, Text } from 'grommet';
import { Down, Up } from 'grommet-icons';

import { STANDARDS } from 'containers/App/constants';
import AboutMetricSources from 'containers/AboutMetricSources';
import FormattedMarkdown from 'components/FormattedMarkdown';

import { navigate } from 'containers/App/actions';
import InfoBenchmark from 'containers/LayerSettings/InfoBenchmark';
import InfoStandard from 'containers/LayerSettings/InfoStandard';

import { lowerCase } from 'utils/string';

import UL from 'styled/UL';

import rootMessages from 'messages';
import aboutMessages from 'components/AboutMetric/messages';
import MethodologyLink from './MethodologyLink';
import messages from './messages';

const OL = styled.ol`
  padding-left: 20px;
  margin: 0;
`;
const LI = styled.li`
  margin-bottom: 8px;
`;
const StyledUL = styled(UL)`
  margin-top: 0;
`;
const StyledText = styled(Text)`
  font-size: 14px;
`;

const renderAnswer = (question, intl, msgValues, navMethodology, questions) => {
  if (question === 'measureRightESR') {
    return (
      <>
        <Text size="small">
          <FormattedMarkdown
            {...messages.answers.measureRightESR}
            values={msgValues}
          />
        </Text>
        <Text size="small">
          <FormattedMarkdown
            {...messages.answers.measureRightESRNotesIntro}
            values={msgValues}
          />
        </Text>
        <Text size="small">
          <OL>
            <LI>
              <FormattedMarkdown
                {...messages.answers.measureRightESRNotesOne}
                values={msgValues}
              />
            </LI>
            <LI>
              <FormattedMarkdown
                {...messages.answers.measureRightESRNotesTwo}
                values={msgValues}
              />
            </LI>
            <LI>
              <FormattedMarkdown
                {...messages.answers.measureRightESRNotesThree}
                values={msgValues}
              />
            </LI>
          </OL>
        </Text>
        <MethodologyLink
          onClick={() => navMethodology()}
          text={<FormattedMessage {...messages.methodology} />}
        />
      </>
    );
  }
  if (question === 'standards') {
    return (
      <>
        <InfoStandard />
        <MethodologyLink
          onClick={() => navMethodology()}
          text={<FormattedMessage {...messages.methodology} />}
        />
      </>
    );
  }
  if (question === 'benchmarks') {
    return (
      <>
        <InfoBenchmark />
        <MethodologyLink
          onClick={() => navMethodology()}
          text={<FormattedMessage {...messages.methodology} />}
        />
      </>
    );
  }
  if (question === 'uncertainty') {
    return (
      <>
        <Text size="small">
          <FormattedMarkdown {...messages.answers.uncertainty} />
        </Text>
        <Text size="small">
          <FormattedMarkdown {...messages.answers.uncertaintyLong} />
        </Text>
        <MethodologyLink
          href={intl.formatMessage(messages.methodologyUncertaintyURL)}
          target="_blank"
          text={<FormattedMessage {...messages.methodologyUncertainty} />}
        />
      </>
    );
  }
  if (question === 'where') {
    // HACK: a horrible hack to produce the right part of the FAQ answer for the 'where' question, but the FAQ container has no knowledge of what other tab is active and no easy way to pass that information down - this is as a result of treating the aside as a tab when it isn't the same as the other tabs (i.e. it is present when others are present), and with the FAQ's system not being designed to handle interchangeable multi-part answers.
    return (
      <>
        <Text size="small" style={{ whiteSpace: 'pre-line' }}>
          {/* eslint-disable no-nested-ternary */}
          {/* prettier-ignore */}
          <FormattedHTMLMessage
            {...messages.answers[question][
              questions[2] === 'difference'
                ? 'esr'
                : questions[2] === 'grades'
                  ? 'cpr'
                  : 'both'
            ]}
          />
          {/* eslint-enable no-nested-ternary */}
        </Text>
        <MethodologyLink
          onClick={() => navMethodology()}
          text={<FormattedMessage {...messages.methodology} />}
        />
      </>
    );
  }
  if (question === 'difference') {
    return (
      <>
        <Text size="small" style={{ whiteSpace: 'pre-line' }}>
          <FormattedHTMLMessage {...messages.answers[question]} />
        </Text>
        <MethodologyLink
          onClick={() => navMethodology()}
          text={<FormattedMessage {...messages.methodology} />}
        />
      </>
    );
  }
  if (question === 'how' || question === 'why') {
    return (
      <>
        <Text size="small" style={{ whiteSpace: 'pre-line' }}>
          <FormattedMessage {...messages.answers[question]} />
        </Text>
      </>
    );
  }
  if (question === 'whereViolence') {
    return (
      <>
        <Text size="small" style={{ whiteSpace: 'pre-line' }}>
          <FormattedMessage {...messages.answers[question]} />
        </Text>
      </>
    );
  }
  if (question === 'whereViolence-indicator') {
    return (
      <>
        <Text size="small" style={{ whiteSpace: 'pre-line' }}>
          <FormattedMessage {...messages.answers[question]} />
        </Text>
      </>
    );
  }
  if (question === 'violenceResponsibility') {
    return (
      <>
        <Text size="small" style={{ whiteSpace: 'pre-line' }}>
          <FormattedMessage {...messages.answers[question]} />
        </Text>
      </>
    );
  }
  return (
    <>
      <Text size="small">
        <FormattedMarkdown {...messages.answers[question]} values={msgValues} />
      </Text>
      <MethodologyLink
        onClick={() => navMethodology()}
        text={
          question === 'grades' ? (
            <FormattedMessage {...messages.methodologyGrades} />
          ) : (
            <FormattedMessage {...messages.methodology} />
          )
        }
      />
    </>
  );
};

function FAQs({
  questions,
  intl,
  metric,
  navMethodology,
  metrics,
  metricInfo,
  standard,
  showSources,
  onSelectMetric,
  dateRange,
  countryCode,
}) {
  const [actives, setActive] = useState([]);
  const msgValues = {
    metric,
    metricLower: lowerCase(metric),
  };

  let metricType;
  let hasIndicator;
  let hasAbout;
  const aboutIndex = 0;
  let indicatorIndex;
  let sourceIndex;

  // for metric pages
  if (metrics) {
    /* eslint-disable prefer-destructuring */
    metricType = metrics.metricType;
    /* eslint-enable prefer-destructuring */
    hasIndicator = metricType === 'indicators' && metricInfo;
    hasAbout = rootMessages[`${metricType}-about`];
    indicatorIndex = hasIndicator && hasAbout ? 1 : 0;
    sourceIndex = aboutIndex + indicatorIndex + 1;
  }

  return (
    <Box
      pad={metrics && metrics.right === 'violence' ? {} : { vertical: 'large' }}
    >
      <Heading responsive={false} level={3}>
        <FormattedMessage {...messages.title} />
      </Heading>
      <Accordion
        multiple
        activeIndex={actives}
        onActive={newActive => setActive(newActive)}
      >
        {/* for metric pages */}
        {hasAbout && metrics.right !== 'violence' && (
          <AccordionPanel
            header={
              <Box
                direction="row"
                gap="xsmall"
                align="center"
                justify="between"
              >
                <Box>
                  <Heading
                    responsive={false}
                    level={6}
                    margin={{ vertical: 'xsmall' }}
                    style={{ fontWeight: 400 }}
                  >
                    <FormattedMessage {...aboutMessages.title[metricType]} />
                  </Heading>
                </Box>
                <Box margin={{ left: 'auto' }}>
                  {!actives.includes(aboutIndex) && <Down size="small" />}
                  {actives.includes(aboutIndex) && <Up size="small" />}
                </Box>
              </Box>
            }
          >
            <Box pad={{ vertical: 'small', horizontal: 'xsmall' }} border="top">
              <StyledText>
                <FormattedMessage
                  {...rootMessages[`${metricType}-about`][metrics.key]}
                />
                {showSources && hasIndicator && (
                  <Box pad={{ vertical: 'small' }}>
                    <AboutMetricSources
                      metric={metrics}
                      indicatorInfo={metricInfo}
                      onSelectMetric={onSelectMetric}
                      countryCode={countryCode}
                      dateRange={dateRange}
                    />
                  </Box>
                )}
              </StyledText>
            </Box>
          </AccordionPanel>
        )}
        {hasIndicator && (
          <AccordionPanel
            header={
              <Box
                direction="row"
                gap="xsmall"
                align="center"
                justify="between"
              >
                <Box>
                  <Heading
                    responsive={false}
                    level={6}
                    margin={{ vertical: 'xsmall' }}
                    style={{ fontWeight: 400 }}
                  >
                    <FormattedMessage {...aboutMessages.titleStandards} />
                  </Heading>
                </Box>
                <Box margin={{ left: 'auto' }}>
                  {!actives.includes(indicatorIndex) && <Down size="small" />}
                  {actives.includes(indicatorIndex) && <Up size="small" />}
                </Box>
              </Box>
            }
          >
            <Box pad={{ vertical: 'small', horizontal: 'xsmall' }} border="top">
              {metricInfo.standard === 'Both' && (
                <StyledUL>
                  {STANDARDS.map(s => (
                    <li key={s.key}>
                      <FormattedMessage
                        {...rootMessages.settings.standard[s.key]}
                      />
                    </li>
                  ))}
                </StyledUL>
              )}
              {metricInfo.standard !== 'Both' && standard && (
                <FormattedMessage
                  {...rootMessages.settings.standard[standard.key]}
                />
              )}
            </Box>
          </AccordionPanel>
        )}
        {showSources && !hasIndicator && metrics.right !== 'violence' && (
          <AccordionPanel
            header={
              <Box
                direction="row"
                gap="xsmall"
                align="center"
                justify="between"
              >
                <Box>
                  <Heading
                    responsive={false}
                    level={6}
                    margin={{ vertical: 'xsmall' }}
                    style={{ fontWeight: 400 }}
                  >
                    {metricType === 'indicators' && (
                      <FormattedMessage {...aboutMessages.titleSource} />
                    )}
                    {metricType !== 'indicators' && (
                      <FormattedMessage
                        {...aboutMessages.titleSourcesByIndicator}
                      />
                    )}
                  </Heading>
                </Box>
                <Box margin={{ left: 'auto' }}>
                  {!actives.includes(sourceIndex) && <Down size="small" />}
                  {actives.includes(sourceIndex) && <Up size="small" />}
                </Box>
              </Box>
            }
          >
            <Box pad={{ vertical: 'small', horizontal: 'xsmall' }} border="top">
              <AboutMetricSources
                metric={metrics}
                indicatorInfo={metricInfo}
                onSelectMetric={onSelectMetric}
                countryCode={countryCode}
                dateRange={dateRange}
              />
            </Box>
          </AccordionPanel>
        )}

        {/* for all pages */}
        {questions.map((q, index) => (
          <AccordionPanel
            key={q}
            header={
              <Box direction="row" gap="xsmall" align="center">
                <Box>
                  <Heading
                    responsive={false}
                    level={6}
                    margin={{ vertical: 'xsmall' }}
                    style={{ fontWeight: 400 }}
                  >
                    <FormattedMessage
                      {...messages.questions[q]}
                      values={msgValues}
                    />
                  </Heading>
                </Box>
                <Box margin={{ left: 'auto' }}>
                  {!actives.includes(index) && <Down size="small" />}
                  {actives.includes(index) && <Up size="small" />}
                </Box>
              </Box>
            }
          >
            <Box pad={{ vertical: 'small', horizontal: 'xsmall' }} border="top">
              {renderAnswer(q, intl, msgValues, navMethodology, questions)}
            </Box>
          </AccordionPanel>
        ))}
      </Accordion>
    </Box>
  );
}

FAQs.propTypes = {
  navMethodology: PropTypes.func,
  metric: PropTypes.string,
  questions: PropTypes.array,
  intl: intlShape.isRequired,
  metrics: PropTypes.object,
  metricInfo: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  standard: PropTypes.object,
  showSources: PropTypes.bool,
  onSelectMetric: PropTypes.func,
  countryCode: PropTypes.string,
  dateRange: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  // navigate to location
  navMethodology: () => {
    dispatch(
      navigate('page/methodology', {
        trackEvent: {
          category: 'Content',
          action: 'FAQs: open page',
          value: 'methodology',
        },
      }),
    );
  },
});

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(FAQs));
