/**
 *
 * ChartMetricTrend
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Box, ResponsiveContext } from 'grommet';

import { getRegionYearCount } from 'utils/charts';
import { isMinSize } from 'utils/responsive';

import ButtonText from 'styled/ButtonText';

import Hint from 'styled/Hint';

import rootMessages from 'messages';
import messages from './messages';

const Styled = styled(p => <Box gap="xsmall" {...p} />)`
  margin-top: 5px;
`;

const StyledHint = styled(p => <Hint size="xxsmall" as="span" {...p} />)``;

const RangeWrapper = styled(Box)`
  position: relative;
  display: block;
  width: 20px;
  height: 13px;
`;
const Range = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  width: 20px;
  height: 13px;
  background-color: ${({ theme, region }) => theme.global.colors[region]};
  opacity: 0.2;
`;

const Mean = styled.div`
  display: block;
  height: 1px;
  position: absolute;
  top: 50%;
  left: 0;
  width: 20px;
  border-top: 2px solid;
  border-color: ${({ theme, region }) => theme.global.colors[region]};
  margin-top: -1px;
`;
const MeanRegion = styled.div`
  display: block;
  height: 2px;
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  background-image: url("data:image/svg+xml, %3Csvg width='20' height='2' version='1.1' xmlns='http://www.w3.org/2000/svg'%3E%3Cline stroke='black' strokeWidth='3' stroke-dasharray='2, 5' x1='0' y1='1' x2='20' y2='1'%3E%3C/line%3E%3C/svg%3E");
`;

function CardFooter({
  regionScores,
  countryScores,
  currentRegion,
  year,
  column,
  regionTotals,
  onSelectMetric,
  onSelectPage,
  mode,
  type,
}) {
  const notes = {
    regionBias:
      type === 'esr' && mode === 'detail-region' && currentRegion === 'all',
    regionAvg: mode === 'multi-region' || mode === 'detail-region',
    regionIntervalCPR:
      (mode === 'multi-region' || mode === 'detail-region') &&
      currentRegion &&
      regionScores &&
      regionScores[currentRegion] &&
      regionScores[currentRegion][column] &&
      Object.keys(regionScores[currentRegion][column]) &&
      Object.keys(regionScores[currentRegion][column]).length > 0 &&
      type === 'cpr',
    countryIntervalCPR:
      mode === 'multi-country' &&
      countryScores &&
      countryScores[column] &&
      Object.keys(countryScores[column]) &&
      Object.keys(countryScores[column]).length > 0 &&
      type === 'cpr',
    regionIntervalVDEM:
      (mode === 'multi-region' || mode === 'detail-region') &&
      currentRegion &&
      regionScores &&
      regionScores[currentRegion] &&
      regionScores[currentRegion][column] &&
      Object.keys(regionScores[currentRegion][column]) &&
      Object.keys(regionScores[currentRegion][column]).length > 0 &&
      type === 'vdem',
    countryIntervalVDEM:
      mode === 'multi-country' &&
      countryScores &&
      countryScores[column] &&
      Object.keys(countryScores[column]) &&
      Object.keys(countryScores[column]).length > 0 &&
      type === 'vdem',
    countryRegionAvg: mode === 'multi-country',
    countryRegionAvgNA:
      mode === 'multi-country' &&
      regionScores &&
      regionScores[currentRegion] &&
      regionScores[currentRegion][column] &&
      Object.keys(regionScores[currentRegion][column]) &&
      Object.keys(regionScores[currentRegion][column]).length === 0,
  };

  let total;
  let count;
  let valuesAvg;
  let valuesInterval;
  if (notes.regionAvg && regionScores && regionTotals) {
    total = regionTotals[currentRegion];
    count =
      currentRegion &&
      currentRegion !== 'all' &&
      getRegionYearCount(year, regionScores[currentRegion][column]);
    // prettier-ignore
    valuesAvg = {
      year: <strong>{year}</strong>,
      link: (
        <ButtonText
          size="xxsmall"
          onClick={() => onSelectMetric('ranking', year)}
          color={currentRegion}
        >
          {/* <FormattedMessage
            {...messages[count === total ? 'noteRatioLinkAll' : 'noteRatioLink']}
            values={{ count, total }}
          /> */}
          TODO
        </ButtonText>
      ),
    };
  }
  if (notes.countryIntervalCPR) {
    // prettier-ignore
    valuesInterval = {
      link: (
        <ButtonText
          onClick={() => onSelectPage('methodology-cpr')}
          size="xxsmall"
        >
          {/* <FormattedMessage
            {...messages.noteCredibleIntervalLinkCountry}
          /> */}
          TODO
        </ButtonText>
      ),
    };
  }
  if (notes.regionIntervalCPR) {
    // prettier-ignore
    valuesInterval = {
      link: (
        <ButtonText
          onClick={() => onSelectPage('methodology-cpr')}
          size="xxsmall"
        >
          {/* <FormattedMessage
            {...messages.noteCredibleIntervalLinkRegions}
          /> */}
          TODO
        </ButtonText>
      ),
    };
  }
  if (notes.countryIntervalVDEM) {
    // prettier-ignore
    valuesInterval = {
      link: (
        <ButtonText
          onClick={() => onSelectPage('methodology-vdem')}
          size="xxsmall"
        >
          {/* <FormattedMessage
            {...messages.noteCredibleIntervalLinkCountry}
          /> */}
          TODO
        </ButtonText>
      ),
    };
  }
  if (notes.regionIntervalVDEM) {
    // prettier-ignore
    valuesInterval = {
      link: (
        <ButtonText
          onClick={() => onSelectPage('methodology-vdem')}
          size="xxsmall"
        >
          {/* <FormattedMessage
            {...messages.noteCredibleIntervalLinkRegions}
          /> */}
          TODO
        </ButtonText>
      ),
    };
  }
  // prettier-ignore
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Styled>
          {notes.regionBias && (
            <StyledHint>
              {/* <FormattedMessage
                {...rootMessages.charts.noteRegionalBiasESRWithLink}
                values={{
                  link: (
                    <ButtonText
                      size="xxsmall"
                      onClick={() => onSelectPage('methodology-esr')}
                    >
                      <FormattedMessage
                        {...rootMessages.charts.noteRegionalBiasESRLink}
                      />
                    </ButtonText>
                  ),
                }}
              /> */}
              TODO
            </StyledHint>
          )}
          {notes.regionAvg && (
            <>
              {(!currentRegion || currentRegion === 'all') && (
                <StyledHint>
                  {/* <FormattedMessage {...messages.noteAssessmentMultiple} /> */}
                  TODO
                </StyledHint>
              )}
              {currentRegion && (
                <StyledHint>
                  {/* {count > 0 && count < total && (
                    <FormattedMessage
                      {...messages[
                        isMinSize(size, 'ms')
                          ? 'noteAssessmentRatio'
                          : 'noteAssessmentRatioSmall'
                      ]}
                      values={valuesAvg}
                    />
                  )}
                  {count > 0 && count === total && (
                    <FormattedMessage
                      {...messages.noteAssessmentRatioAll}
                      values={valuesAvg}
                    />
                  )}
                  {count === 0 && currentRegion === 'world' && (
                    <FormattedMessage
                      {...messages.noteAssessmentNoneWorld}
                      values={{ year }}
                    />
                  )}
                  {count === 0 &&
                    currentRegion !== 'world' &&
                    type === 'cpr' && (
                    <FormattedMessage
                      {...messages.noteAssessmentNoneRegion}
                      values={{ year }}
                    />
                  )}
                  {count === 0 &&
                    currentRegion !== 'world' &&
                    type === 'esr' && (
                    <FormattedMessage
                      {...messages.noteAssessmentNoneRegionESR}
                      values={{ year }}
                    />
                  )} */}
                  TODO
                </StyledHint>
              )}
            </>
          )}
          {(notes.regionIntervalCPR || notes.countryIntervalCPR) && (
            <Box direction="row" gap="xsmall" align="center">
              <RangeWrapper>
                <Range region={currentRegion} />
                <Mean region={currentRegion} />
              </RangeWrapper>
              <StyledHint>
                {/* {notes.regionIntervalCPR && isMinSize(size, 'ms') && (
                  <FormattedMessage
                    {...messages.noteCredibleIntervalRegions}
                    values={valuesInterval}
                  />
                )}
                {(notes.countryIntervalCPR || size === 'small') && (
                  <FormattedMessage
                    {...messages.noteCredibleIntervalSmall}
                    values={valuesInterval}
                  />
                )} */}
                TODO
              </StyledHint>
            </Box>
          )}
        </Styled>
      )}
    </ResponsiveContext.Consumer>
  );
}

CardFooter.propTypes = {
  currentRegion: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  column: PropTypes.string,
  countryScores: PropTypes.object,
  regionScores: PropTypes.object,
  regionTotals: PropTypes.object,
  mode: PropTypes.string,
  year: PropTypes.string,
  type: PropTypes.string,
  onSelectMetric: PropTypes.func,
  onSelectPage: PropTypes.func,
};

export default CardFooter;
