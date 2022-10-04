import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Box,
  ResponsiveContext,
  // Button,
  Text,
} from 'grommet';
// import { Performance } from 'grommet-icons';
import { injectIntl, FormattedMessage } from 'react-intl'; // not used now?

import rootMessages from 'messages';
import ButtonToggleSetting from 'styled/ButtonToggleSetting';
import BarWrapper from './BarWrapper';
import Grades from './Grades';
import ListHeader from './ListHeader';

const Styled = styled(Box)`
  margin: 0 auto;
  position: relative;
`;
const WrapInnerChart = styled(Box)`
  position: relative;
`;
// prettier-ignore
// const StyledText = styled(Text)`
//   color: ${({ selected }) => selected ? 'inherit' : '#B1B0CB'};
//   border-bottom: 3px solid
//     ${({ theme, hasWhiteBG = true }) =>
//     hasWhiteBG
//       ? theme.global.colors.buttonSecondaryOnWhiteHover
//       : theme.global.colors.buttonSecondaryHover};
// `;
// const StyledButton = styled(Button)`
//   background: transparent;
//   padding: 3px;
//   margin-right: ${({ theme }) => theme.global.edgeSize.xxsmall};
//   font-weight: 600;
//   @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
//     padding: 3px 10px;
//   }
// `;

function ChartBars({
  data,
  listHeader,
  metric,
  currentBenchmark,
  bullet,
  allowWordBreak,
  commonLabel,
  labelColor,
  padVertical,
  grades,
  gradeLabels,
  level = 2,
  annotateBetter = true,
  scoreOnHover,
  scoresAside = true,
  summaryScore,
  isStatic,
  benchmarkIconOnly,
  annotateBenchmark = true,
  annotateMinMax = true,
  canShowRaw,
  rawScores,
  setRawScores,
  closeAsideLayer
}) {
  if (!data) return null;

  return (
    <ResponsiveContext.Consumer>
      {() => (
        <Styled
          pad={{
            top: 'ms',
            bottom: padVertical || 'medium',
          }}
          direction="column"
          fill="horizontal"
        >
          <Box
            width="100%"
            direction={canShowRaw ? 'row' : 'column'}
            justify={canShowRaw ? 'between' : 'center'}
          >
            {(commonLabel || listHeader) && (
              <ListHeader
                metric={metric}
                benchmark={currentBenchmark && currentBenchmark.key}
                commonLabel={commonLabel}
                labelColor={labelColor}
                annotateBetter={!grades && annotateBetter}
                hasAside={scoresAside}
                benchmarkIconOnly={benchmarkIconOnly}
                annotateBenchmark={annotateBenchmark}
                annotateMinMax={annotateMinMax}
              />
            )}
            {canShowRaw && (
              <Box align="end" margin={{ bottom: '8px' }}>
                <ButtonToggleSetting
                  // key={option.key}
                  active={!rawScores}
                  onClick={() => {
                    setRawScores(false)
                    closeAsideLayer()
                  }}
                  stacked
                >
                  <Text size="small">
                    <FormattedMessage
                      {...rootMessages.labels.indicatorToggles.hrmi}
                      values={{
                        isPlural: data.length > 1,
                      }}
                    />
                  </Text>
                </ButtonToggleSetting>
                <ButtonToggleSetting
                  // key={option.key}
                  active={rawScores}
                  onClick={() => {
                    closeAsideLayer()
                    setRawScores(true)
                  }}
                  stacked
                >
                  <Text size="small">
                    <FormattedMessage
                      {...rootMessages.labels.indicatorToggles.indicator}
                      values={{
                        isPlural: data.length > 1,
                      }}
                    />
                  </Text>
                </ButtonToggleSetting>
              </Box>
            )}
          </Box>
          <WrapInnerChart>
            {grades && (
              <Grades
                grades={grades}
                labels={gradeLabels}
                hasAside={scoresAside}
                rawScores={rawScores}
              />
            )}
            {data.filter(d => !isNaN(d.value) || d.value === undefined).map(d => 
              <BarWrapper
                key={d.key}
                score={d}
                bullet={bullet}
                allowWordBreak={allowWordBreak}
                labelColor={labelColor}
                hasBackground={!grades}
                level={level}
                scoreOnHover={!scoresAside || scoreOnHover}
                scoresAside={scoresAside}
                summaryScore={summaryScore}
                isStatic={isStatic}
                rawScores={rawScores}
              />
            )}
          </WrapInnerChart>
        </Styled>
      )}
    </ResponsiveContext.Consumer>
  );
}
// metric={metric}
// standard={standard}
// currentBenchmark={currentBenchmark}

ChartBars.propTypes = {
  allowWordBreak: PropTypes.bool,
  annotateBetter: PropTypes.bool,
  scoreOnHover: PropTypes.bool,
  scoresAside: PropTypes.bool,
  commonLabel: PropTypes.string,
  labelColor: PropTypes.string,
  padVertical: PropTypes.string,
  listHeader: PropTypes.bool,
  bullet: PropTypes.bool,
  metric: PropTypes.object,
  currentBenchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  data: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  grades: PropTypes.array,
  gradeLabels: PropTypes.bool,
  isStatic: PropTypes.bool,
  benchmarkIconOnly: PropTypes.bool,
  annotateBenchmark: PropTypes.bool,
  annotateMinMax: PropTypes.bool,
  level: PropTypes.number,
  summaryScore: PropTypes.object,
  canShowRaw: PropTypes.bool,
  rawScores: PropTypes.bool,
  setRawScores: PropTypes.func,
  closeAsideLayer: PropTypes.func,
};

export default injectIntl(ChartBars);
