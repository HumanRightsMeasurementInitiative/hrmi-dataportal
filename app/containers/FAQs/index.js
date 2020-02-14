import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import {
  Accordion,
  AccordionPanel,
  Box,
  Text,
  Heading,
  Paragraph,
} from 'grommet';
import { Down, Up } from 'grommet-icons';

import { navigate } from 'containers/App/actions';
import BenchmarkOverlay from 'components/Tooltip/BenchmarkOverlay';
import StandardOverlay from 'components/Tooltip/StandardOverlay';

import ButtonIcon from 'styled/ButtonIcon';
import MethodologyLink from './MethodologyLink';

import messages from './messages';

const renderAnswer = (question, intl, metric, navMethodology) => {
  if (question === 'measureRightESR') {
    return (
      <>
        <Paragraph margin={{ vertical: 'xsmall' }}>
          <Text size="small">
            <FormattedMessage
              {...messages.answers.measureRightESR}
              values={{ metric }}
            />
          </Text>
        </Paragraph>
        <Paragraph margin={{ vertical: 'xsmall' }}>
          <Text size="small">
            <FormattedMessage
              {...messages.answers.measureRightESRNotesIntro}
              values={{ metric }}
            />
          </Text>
        </Paragraph>
        <Box margin={{ vertical: 'xsmall' }}>
          <ol>
            <li>
              <Text size="small">
                <FormattedMessage
                  {...messages.answers.measureRightESRNotesOne}
                  values={{ metric }}
                />
              </Text>
            </li>
            <li>
              <Text size="small">
                <FormattedMessage
                  {...messages.answers.measureRightESRNotesTwo}
                  values={{ metric }}
                />
              </Text>
            </li>
            <li>
              <Text size="small">
                <FormattedMessage
                  {...messages.answers.measureRightESRNotesThree}
                  values={{ metric }}
                />
              </Text>
            </li>
          </ol>
        </Box>
        <MethodologyLink onClick={() => navMethodology()} />
      </>
    );
  }
  if (question === 'standards') {
    return (
      <>
        <StandardOverlay />
        <MethodologyLink onClick={() => navMethodology()} />
      </>
    );
  }
  if (question === 'benchmarks') {
    return (
      <>
        <BenchmarkOverlay />
        <MethodologyLink onClick={() => navMethodology()} />
      </>
    );
  }
  return (
    <>
      <Paragraph margin={{ vertical: 'xsmall' }}>
        <Text size="small">
          <FormattedMessage
            {...messages.answers[question]}
            values={{ metric }}
          />
        </Text>
      </Paragraph>
      <MethodologyLink onClick={() => navMethodology()} />
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
                    style={{ fontWeight: 'normal' }}
                  >
                    <FormattedMessage
                      {...messages.questions[q]}
                      values={{ metric }}
                    />
                  </Heading>
                </Box>
                <Box margin={{ left: 'auto' }}>
                  {!actives.includes(index) && (
                    <ButtonIcon as="span" subtle small>
                      <Down size="small" />
                    </ButtonIcon>
                  )}
                  {actives.includes(index) && (
                    <ButtonIcon as="span" subtle small>
                      <Up size="small" />
                    </ButtonIcon>
                  )}
                </Box>
              </Box>
            }
          >
            <Box pad="small" background="light-1">
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
