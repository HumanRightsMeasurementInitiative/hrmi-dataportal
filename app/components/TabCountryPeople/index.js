/**
 *
 * TabCountryPeople
 *
 */

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  Heading,
  Paragraph,
  Box,
  Text,
  ResponsiveContext,
  Button,
  Drop,
} from 'grommet';
import { Up, Down, FormDown, FormUp } from 'grommet-icons';

import rootMessages from 'messages';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import ChartWordCloud from 'components/ChartWordCloud';
import Loading from 'components/LoadingIndicator';
import HTMLWrapper from 'components/HTMLWrapper';

import Hint from 'styled/Hint';
import ButtonAccordian from 'styled/ButtonAccordian';
import DropOption from 'styled/DropOption';

import { isMinSize, isMaxSize } from 'utils/responsive';
import { truncateText } from 'utils/string';

import { prepGroups } from 'containers/Search/search';
import { AT_RISK_GROUPS } from 'containers/App/constants';
import messages from './messages';

const DimensionHeading = props => (
  <Heading
    responsive={false}
    level={3}
    margin={{ top: 'small', bottom: 'none' }}
    {...props}
  />
);
const RightHeading = props => (
  <Heading
    responsive={false}
    level={4}
    margin={{ top: 'small', bottom: 'none' }}
    {...props}
  />
);
// prettier-ignore
const StyledHeading = styled(Heading)`
  font-size: ${({ theme, level = 1 }) => theme.heading.level[level].small.size};
  line-height: ${({ theme, level = 1 }) => theme.heading.level[level].small.height};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    font-size: ${({ theme, level = 1 }) => theme.heading.level[level].medium.size};
    line-height: ${({ theme, level = 1 }) => theme.heading.level[level].medium.height};
  }
`;
// prettier-ignore
const ButtonDropdown = styled(Button)`
  display: inline;
  padding: 0px 3px;
  margin: 0px 3px;
  border-bottom: 1px solid;
  background-color: transparent;
  font-weight: 600;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 0 3px;
    width: auto;
  }
`;

const Styled = styled.div``;

// const OptionButton = props => <Button plain {...props} />;
// prettier-ignore
const StyledOption = styled(DropOption)`
  padding-left: ${({ level }) => {
    if (level === 2) {
      return 15;
    }
    if (level === 3) {
      return 20;
    }
    return 10;
  }}px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding-left: ${({ level }) => {
    if (level === 2) {
      return 22;
    }
    if (level === 3) {
      return 32;
    }
    return 12;
  }}px;
  }
`;

// N.B. same as ChartCountryMetricPeople
const renderAnalysis = (atRiskAnalysis, intl) => (
  <Box>
    {atRiskAnalysis && atRiskAnalysis.content && (
      <>
        {atRiskAnalysis.locale !== intl.locale && (
          <Paragraph>
            <Hint italic>
              <FormattedMessage {...messages.noAnalysisInLanguage} />
            </Hint>
          </Paragraph>
        )}
        <HTMLWrapper innerhtml={atRiskAnalysis.content} />
      </>
    )}
    {(!atRiskAnalysis || !atRiskAnalysis.content) && <Loading />}
  </Box>
);

const QualitativeData = ({ right, index, arr, content, countryCode, intl }) => {
  const [analysis, setAnalysis] = useState(false);
  const isLast = index === arr.length - 1;

  return (
    <>
      {analysis && renderAnalysis(content[`${right.key}/${countryCode}`], intl)}
      <ButtonAccordian
        onClick={() => setAnalysis(!analysis)}
        icon={
          analysis ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '8px',
              }}
            >
              <Up size="small" />
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '8px',
              }}
            >
              <Down size="small" />
            </div>
          )
        }
        size="small"
        textSize="large"
        label={
          <FormattedMessage
            {...messages[analysis ? 'hideAnalysis' : 'showAnalysis']}
          />
        }
        border={isLast ? '1px solid lightgrey' : 'none'}
        spaced={false}
      />
    </>
  );
};

QualitativeData.propTypes = {
  right: PropTypes.any,
  index: PropTypes.number,
  arr: PropTypes.array,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  countryCode: PropTypes.string,
  intl: intlShape,
};

function TabCountryPeople({
  data,
  highlight,
  setHighlight,
  content,
  countryCode,
  intl,
  onSelectCountry,
}) {
  const metrics = prepGroups(AT_RISK_GROUPS, '', intl).map(g => ({
    key: g.label,
    code: g.code,
    disabled: false,
  }));
  // N.B. start with fake active metric with code 99 to represent the un-selectable 'peopleHeader' message
  const [activeMetric, setActiveMetric] = useState(99);
  const [open, setOpen] = useState(false);
  const dropButton = useRef(null);

  return (
    <>
      <StyledHeading responsive={false} level={2}>
        <FormattedMessage {...messages.title} />
      </StyledHeading>
      <Paragraph>
        <FormattedMessage {...messages.intro} />
      </Paragraph>
      <ResponsiveContext.Consumer>
        {size => (
          <Text size={isMinSize(size, 'large') ? 'medium' : 'small'}>
            <FormattedMessage
              {...messages.people}
              values={{
                dropdown: (
                  <ButtonDropdown
                    plain
                    first
                    onClick={() => setOpen(!open)}
                    label={
                      <span>
                        <Text
                          style={{ whiteSpace: 'nowrap', paddingRight: '5px' }}
                          size={isMinSize(size, 'large') ? 'medium' : 'small'}
                        >
                          {/* eslint-disable */}
                          {activeMetric === 99
                            ? intl.formatMessage(messages.peopleHeader)
                            : truncateText(
                              intl.formatMessage(
                                rootMessages['people-at-risk'][activeMetric],
                              ),
                              isMaxSize(size, 'sm') ? 30 : 60,
                            )}
                            {/* eslint-enable */}
                        </Text>
                        {open && <FormUp size="large" />}
                        {!open && <FormDown size="large" />}
                      </span>
                    }
                    ref={dropButton}
                  />
                ),
              }}
            />
            {open && (
              <Drop
                align={{ top: 'bottom', left: 'left' }}
                target={dropButton.current}
                onClickOutside={() => setOpen(false)}
                overflow="scroll"
              >
                {/* N.B. This is similar to MetricSelect, but specific functionality for this dropdown */}
                <Styled>
                  <StyledOption disabled noBorderLast>
                    <FormattedMessage {...messages.peopleHeader} />
                  </StyledOption>
                  {metrics.map(m => (
                    <div key={m.code}>
                      <StyledOption
                        level={1}
                        fill="horizontal"
                        active={m.code === activeMetric}
                        disabled={m.code === activeMetric}
                        onClick={() => {
                          onSelectCountry(countryCode, m.code);
                          setActiveMetric(m.code);
                          setOpen(false);
                        }}
                        noBorderLast
                      >
                        <FormattedMessage
                          {...rootMessages['people-at-risk'][m.code]}
                        />
                      </StyledOption>
                    </div>
                  ))}
                </Styled>
              </Drop>
            )}
          </Text>
        )}
      </ResponsiveContext.Consumer>
      {data &&
        data.map(dim => (
          <Box key={dim.key} border="top" margin={{ top: 'large' }}>
            <DimensionHeading>
              <FormattedMessage {...rootMessages.dimensions[dim.key]} />
            </DimensionHeading>
            {dim.rights &&
              Object.values(dim.rights).map((right, index, arr) => (
                <div key={right.key}>
                  {Object.values(right.atRiskData).length > 1 && (
                    <Box border="top">
                      <RightHeading margin={{ bottom: 'none' }}>
                        <FormattedMessage {...rootMessages.rights[right.key]} />
                      </RightHeading>
                    </Box>
                  )}
                  {Object.values(right.atRiskData).map(
                    (d, indexInner, array) => (
                      <ChartWordCloud
                        highlight={highlight}
                        setHighlight={setHighlight}
                        key={d.code}
                        data={d}
                        dimension={right.dimension}
                        subright={array.length > 1}
                        border={
                          (array.length === 1 && index > 0) ||
                          (array.length > 1 && indexInner > 0)
                        }
                        showTitle
                        onClickWord={code => {
                          onSelectCountry(countryCode, code);
                          setActiveMetric(code);
                        }}
                      />
                    ),
                  )}
                  <QualitativeData
                    right={right}
                    index={index}
                    arr={arr}
                    content={content}
                    countryCode={countryCode}
                    intl={intl}
                  />
                </div>
              ))}
          </Box>
        ))}
    </>
  );
}

TabCountryPeople.propTypes = {
  hasAside: PropTypes.bool,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  highlight: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  setHighlight: PropTypes.func,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  countryCode: PropTypes.string,
  intl: intlShape,
  onSelectCountry: PropTypes.func,
};

export default injectIntl(TabCountryPeople);
