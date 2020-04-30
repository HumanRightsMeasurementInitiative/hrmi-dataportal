import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Accordion, AccordionPanel, Box, Heading, Paragraph } from 'grommet';
import { Down, Up } from 'grommet-icons';

import { navigate } from 'containers/App/actions';
import InfoBenchmark from 'containers/LayerSettings/InfoBenchmark';
import InfoStandard from 'containers/LayerSettings/InfoStandard';

import MethodologyLink from './MethodologyLink';

import messages from './messages';

const OL = styled.ol`
  padding-left: 20px;
  margin: 0;
`;
const LI = styled.li`
  margin-bottom: 8px;
`;

const renderAnswer = (question, intl, metric, navMethodology) => {
  if (question === 'measureRightESR') {
    return (
      <>
        <Paragraph margin={{ vertical: 'xsmall' }} size="small">
          <FormattedMessage
            {...messages.answers.measureRightESR}
            values={{ metric }}
          />
        </Paragraph>
        <Paragraph margin={{ vertical: 'xsmall' }} size="small">
          <FormattedMessage
            {...messages.answers.measureRightESRNotesIntro}
            values={{ metric }}
          />
        </Paragraph>
        <Paragraph size="small">
          <OL>
            <LI>
              <FormattedMessage
                {...messages.answers.measureRightESRNotesOne}
                values={{ metric }}
              />
            </LI>
            <LI>
              <FormattedMessage
                {...messages.answers.measureRightESRNotesTwo}
                values={{ metric }}
              />
            </LI>
            <LI>
              <FormattedMessage
                {...messages.answers.measureRightESRNotesThree}
                values={{ metric }}
              />
            </LI>
          </OL>
        </Paragraph>
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
        <Paragraph margin={{ vertical: 'xsmall' }} size="small">
          <FormattedMessage {...messages.answers.uncertainty} />
        </Paragraph>
        <Paragraph margin={{ vertical: 'xsmall' }} size="small">
          <FormattedMessage {...messages.answers.uncertaintyLong} />
        </Paragraph>
        <MethodologyLink
          href={intl.formatMessage(messages.methodologyUncertaintyURL)}
          target="_blank"
          text={<FormattedMessage {...messages.methodologyUncertainty} />}
        />
      </>
    );
  }
  return (
    <>
      <Paragraph margin={{ vertical: 'xsmall' }} size="small">
        <FormattedMessage {...messages.answers[question]} values={{ metric }} />
      </Paragraph>
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

function FAQs({ questions, intl, metric, navMethodology }) {
  const [actives, setActive] = useState([]);
  return (
    <Box pad={{ vertical: 'large' }}>
      <Accordion
        multiple
        activeIndex={actives}
        onActive={newActive => setActive(newActive)}
      >
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
                      values={{ metric }}
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
              {renderAnswer(q, intl, metric, navMethodology)}
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
