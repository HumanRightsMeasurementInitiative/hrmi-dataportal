/**
 *
 * TabCountryBehindTheNumbers
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Flex, Box, Text, Heading } from '@chakra-ui/react';
import { ResponsiveContext, Button, Image, Text as GText } from 'grommet';
import { CircleQuestion } from 'grommet-icons';
import styled from 'styled-components';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import messages from '../BehindTheNumbersSfs/messages';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { loadDataIfNeeded, navigate } from 'containers/App/actions';

import ChartBars from '../ChartBars';
import CountryLabel from 'components/CountryLabel';
import { COLUMNS } from 'containers/App/constants';
import { sortScores } from 'utils/scores';

import {
  getCPRRightScores,
  getCountries,
  getAuxIndicatorsLatest,
  getDependenciesReady,
} from 'containers/App/selectors';

const DEPENDENCIES = ['countries', 'cprScores', 'auxIndicators'];

const getBand = score => ({
  lo: score && parseFloat(score[COLUMNS.CPR.LO]),
  hi: score && parseFloat(score[COLUMNS.CPR.HI]),
});

const getCPRDimensionValue = score =>
  score && parseFloat(score[COLUMNS.CPR.MEAN]);

const prepareData = ({
  scores,
  metric,
  countries,
  onCountryClick,
  activeCode,
  showHILabel,
  showGovRespondentsLabel,
}) =>
  // prettier-ignore
  scores.map(s => ({
        color: metric.dimension,
        value: getCPRDimensionValue(s),
        maxValue: 10,
        unit: '',
        band: getBand(s),
        key: s.country_code,
        label: (
          <CountryLabel
            country={countries.find(c => c.country_code === s.country_code)}
            showGovRespondentsLabel={showGovRespondentsLabel}
            showHILabel={showHILabel}
          />
        ),
        onClick: () => onCountryClick(s.country_code),
        active: activeCode === s.country_code,
      })
  );

function CprChart({
  intl,
  metric,
  selectedYear,
  countries,
  scores,
  auxIndicators,
  onLoadData,
}) {
  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);

  if (!scores) {
    return null;
  }

  const filteredScores = scores.filter(
    s =>
      s.country_code === 'CHN' ||
      s.country_code === 'HKG' ||
      s.country_code === 'KOR' ||
      s.country_code === 'MYS' ||
      s.country_code === 'TWN' ||
      s.country_code === 'VNM',
  );

  const { sorted, other } = sortScores({
    intl,
    sort: 'assessment',
    order: 'desc',
    scores: filteredScores,
    auxIndicators,
    column: 'mean',
  });

  const data = prepareData({
    scores: sorted,
    metric,
    countries,
    onCountryClick: () => {},
    showHILabel: false,
    showGovRespondentsLabel: false,
  });
  return (
    <>
      <ChartBars
        data={data}
        listHeader={true}
        labelColor={`${metric.color}Dark`}
        padVertical="xsmall"
        metric={metric}
        allowWordBreak={true}
        bullet={true}
      />
    </>
  );
}

CprChart.propTypes = {};

const mapStateToProps = createStructuredSelector({
  dataReady: state => getDependenciesReady(state, DEPENDENCIES),
  countries: state => getCountries(state),
  scores: (state, { metric, selectedYear }) =>
    getCPRRightScores(state, metric.key, selectedYear, true),
  auxIndicators: state => getAuxIndicatorsLatest(state),
});

const mapDispatchToProps = dispatch => {
  return {
    onLoadData: () => {
      return DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key)));
    },
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(CprChart));
