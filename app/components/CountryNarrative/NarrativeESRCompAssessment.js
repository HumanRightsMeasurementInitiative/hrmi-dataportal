import React from 'react';
// import PropTypes from 'prop-types';
// import { injectIntl, intlShape } from 'react-intl';
import { injectIntl } from 'react-intl';

// import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
// import { Paragraph } from 'grommet';
//
// import formatScore from 'utils/format-score';
//
// import { needsArticle, isPlural, getCPRScoreRange } from 'utils/narrative';
//
// import rootMessages from 'messages';
// import messages from './messages';

// function NarrativeESRCompAssessment({ dimensionKey, country, score, noData, intl }) {
function NarrativeESRCompAssessment() {
  // const messageValues = {
  //   physint: intl.formatMessage(rootMessages.dimensions.physint),
  //   empowerment: intl.formatMessage(rootMessages.dimensions.empowerment),
  //   country: intl.formatMessage(rootMessages.countries[country.country_code]),
  //   isPlural: isPlural(intl.locale, country.country_code),
  //   needsArticle: needsArticle(intl.locale, country.country_code),
  //   scoreBold: score && <strong>{formatScore(score.mean)}</strong>,
  //   score: score && formatScore(score.mean),
  // };
  // if (dimensionKey === 'empowerment') {
  // const range = getCPRScoreRange(score.mean);
  // return (
  //   range && (
  //     <Paragraph>
  //       <FormattedMessage
  //         {...messages.cpr.start}
  //         values={{
  //           dimension: intl.formatMessage(
  //             rootMessages.dimensions.empowerment,
  //           ),
  //           ...messageValues,
  //         }}
  //       />
  //       <FormattedMessage
  //         {...messages.cpr.then.empowerment[range]}
  //         values={{
  //           dimension: intl.formatMessage(
  //             rootMessages.dimensions.empowerment,
  //           ),
  //           ...messageValues,
  //         }}
  //       />
  //     </Paragraph>
  //   )
  // );
  // }
  // if (dimensionKey === 'physint') {
  // const range = getCPRScoreRange(score.mean);
  // return (
  //   range && (
  //     <Paragraph>
  //       <FormattedMessage
  //         {...messages.cpr.start}
  //         values={{
  //           dimension: intl.formatMessage(rootMessages.dimensions.physint),
  //           ...messageValues,
  //         }}
  //       />
  //       <FormattedMessage
  //         {...messages.cpr.then.physint[range]}
  //         values={{
  //           dimension: intl.formatMessage(rootMessages.dimensions.physint),
  //           ...messageValues,
  //         }}
  //       />
  //     </Paragraph>
  //   )
  // );
  // }
  return <span>TODO: ESR comparative assessment</span>;
}
NarrativeESRCompAssessment.propTypes = {
  // country: PropTypes.object,
  // dimensionKey: PropTypes.string,
  // score: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // intl: intlShape.isRequired,
};

export default injectIntl(NarrativeESRCompAssessment);
