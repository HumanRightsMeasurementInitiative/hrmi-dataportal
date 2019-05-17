import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import {
  Paragraph,
  Anchor,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Text,
} from 'grommet';

// import formatScore from 'utils/format-score';
import { needsArticle, isPlural } from 'utils/narrative';
import quasiEquals from 'utils/quasi-equals';
//
// import { BENCHMARKS } from 'containers/App/constants';

import rootMessages from 'messages';
import messages from './messages';

const AT_RISK_THRESHOLD = 0.6;

function NarrativeAtRisk({ data, country, onAtRiskClick, intl, noData }) {
  // const scoreAdjusted =
  //   score && score[BENCHMARKS.find(s => s.key === 'adjusted').column];
  // const scoreBest =
  //   score && score[BENCHMARKS.find(s => s.key === 'best').column];
  //
  const messageValues = {
    country: intl.formatMessage(rootMessages.countries[country.country_code]),
    isPlural: isPlural(intl.locale, country.country_code),
    needsArticle: needsArticle(intl.locale, country.country_code),
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell scope="col" border="bottom">
              <Text>{intl.formatMessage(messages.atRisk.tableGroupLabel)}</Text>
            </TableCell>
            <TableCell scope="col" border="bottom">
              <Text>
                {intl.formatMessage(messages.atRisk.tableRightsLabel)}
              </Text>
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(r => (
            <TableRow key={r.group}>
              <TableCell verticalAlign="top">
                <Text>
                  <FormattedMessage
                    {...rootMessages['people-at-risk'][r.group]}
                  />
                </Text>
              </TableCell>
              <TableCell verticalAlign="top">
                <ul>
                  {r.rights.map(right => (
                    <li>
                      <Text>
                        <FormattedMessage
                          {...rootMessages['rights-short'][right]}
                        />
                      </Text>
                    </li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Paragraph>
        <FormattedMessage
          {...messages.atRisk.end.beforeLink}
          values={messageValues}
        />
        <Anchor href="#" onClick={() => onAtRiskClick()}>
          <FormattedMessage
            {...messages.atRisk.end.link}
            values={messageValues}
          />
        </Anchor>
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
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onAtRiskClick: PropTypes.func,
  intl: intlShape.isRequired,
};

export default injectIntl(NarrativeAtRisk);
