import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import {
  Paragraph,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Text,
  Box,
} from 'grommet';

// import formatScore from 'utils/format-score';
import { needsArticle, isPlural, genderNumber } from 'utils/narrative';
import quasiEquals from 'utils/quasi-equals';
//
// import { BENCHMARKS } from 'containers/App/constants';

import ButtonText from 'styled/ButtonText';

import rootMessages from 'messages';
import messages from './messages';

const AT_RISK_THRESHOLD = 0.6;

function NarrativeAtRisk({
  data,
  country,
  onAtRiskClick,
  intl,
  noData,
  countryGrammar,
}) {
  // const scoreAdjusted =
  //   score && score[BENCHMARKS.find(s => s.key === 'adjusted').column];
  // const scoreBest =
  //   score && score[BENCHMARKS.find(s => s.key === 'best').column];
  //
  const messageValues = {
    country: intl.formatMessage(rootMessages.countries[country.country_code]),
    isPlural: isPlural(intl.locale, countryGrammar),
    needsArticle: needsArticle(intl.locale, countryGrammar),
    genderNumber: genderNumber(intl.locale, countryGrammar),
  };
  if (noData) {
    return (
      <Paragraph>
        <FormattedMessage {...messages.atRisk.noData} values={messageValues} />
      </Paragraph>
    );
  }

  // TODO: this is likely better be handled in a specific selector
  const groups = [];
  /* eslint-disable no-plusplus */
  for (let i = 1; i <= 31; i++) {
    groups.push(i);
  }
  /* eslint-enable no-plusplus */
  const rows = groups.reduce((memo, code) => {
    const rights = Object.values(data)
      .map(d => d.rights)
      .reduce(
        (m, d) => ({
          ...m,
          ...d,
        }),
        {},
      );
    // console.log('rights', code, rights);
    const atRiskData = Object.values(rights)
      .map(d => d.atRiskData)
      .reduce(
        (m, d) => ({
          ...m,
          ...d,
        }),
        {},
      );
    const atRiskRights = Object.values(atRiskData).reduce((m, d) => {
      const scores = d.scores.filter(
        s =>
          quasiEquals(s.people_code, code) &&
          parseFloat(s.proportion) > AT_RISK_THRESHOLD,
      );
      return scores.length > 0 ? [...m, d.subright || d.right] : m;
    }, []);
    // prettier-ignore
    return atRiskRights.length > 0
      ? [ ...memo, {
        group: code,
        rights: atRiskRights,
      }]
      : memo;
  }, []);
  // console.log('rows', rows)
  return (
    <>
      <Paragraph>
        <FormattedMessage {...messages.atRisk.start} values={messageValues} />
      </Paragraph>
      <Box
        elevation="small"
        margin={{ vertical: 'small' }}
        pad={{ bottom: 'small', top: 'xsmall' }}
        fill="horizontal"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell
                scope="col"
                pad={{
                  top: 'small',
                  left: 'medium',
                  bottom: 'xsmall',
                  right: 'small',
                }}
                border="bottom"
              >
                <Text size="medium" style={{ fontWeight: 600 }}>
                  {intl.formatMessage(messages.atRisk.tableGroupLabel)}
                </Text>
              </TableCell>
              <TableCell
                scope="col"
                pad={{ top: 'small', right: 'medium', bottom: 'xsmall' }}
                border="bottom"
              >
                <Text size="medium" style={{ fontWeight: 600 }}>
                  {intl.formatMessage(messages.atRisk.tableRightsLabel)}
                </Text>
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r, index) => (
              <TableRow key={r.group}>
                <TableCell
                  verticalAlign="top"
                  border={index === 0 ? false : 'top'}
                  pad={{ left: 'medium', vertical: 'small', right: 'small' }}
                >
                  <Text size="small" style={{ fontWeight: 600 }}>
                    <FormattedMessage
                      {...rootMessages['people-at-risk'][r.group]}
                    />
                  </Text>
                </TableCell>
                <TableCell
                  verticalAlign="top"
                  border={index === 0 ? false : 'top'}
                  pad={{ right: 'medium', vertical: 'small' }}
                >
                  {r.rights.map(right => (
                    <div key={right}>
                      <Text size="small">
                        <FormattedMessage
                          {...rootMessages['rights-short'][right]}
                        />
                      </Text>
                    </div>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Paragraph>
        <FormattedMessage
          {...messages.atRisk.end.beforeLink}
          values={messageValues}
        />
        <ButtonText
          onClick={evt => {
            if (evt) evt.preventDefault();
            return onAtRiskClick();
          }}
        >
          <FormattedMessage
            {...messages.atRisk.end.link}
            values={messageValues}
          />
        </ButtonText>
        <FormattedMessage
          {...messages.atRisk.end.afterLink}
          values={messageValues}
        />
      </Paragraph>
    </>
  );
}

NarrativeAtRisk.propTypes = {
  noData: PropTypes.bool,
  country: PropTypes.object,
  countryGrammar: PropTypes.object,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onAtRiskClick: PropTypes.func,
  intl: intlShape.isRequired,
};

export default injectIntl(NarrativeAtRisk);
