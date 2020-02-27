import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Paragraph } from 'grommet';

import { COLUMNS } from 'containers/App/constants';
import rootMessages from 'messages';
import messages from './messages';

const getDefaultStandard = country =>
  country[COLUMNS.COUNTRIES.HIGH_INCOME] === '1' ? 'hi' : 'core';

const isDefaultStandard = (country, standard) =>
  getDefaultStandard(country) === standard;

const getIncomeCategory = country =>
  country[COLUMNS.COUNTRIES.HIGH_INCOME] === '1' ? 'hi' : 'lmi';

function NarrativeESRStandardHint({ standard, country, intl }) {
  return isDefaultStandard(country, standard) ? null : (
    <Paragraph>
      <strong>
        <FormattedMessage
          {...messages.esr.changeStandardNote}
          values={{
            otherStandard: intl.formatMessage(
              rootMessages.settings.standard[standard],
            ),
            defaultStandard: intl.formatMessage(
              rootMessages.settings.standard[getDefaultStandard(country)],
            ),
            incomeCategory: intl.formatMessage(
              rootMessages.income[getIncomeCategory(country)],
            ),
          }}
        />
      </strong>
    </Paragraph>
  );
}

NarrativeESRStandardHint.propTypes = {
  country: PropTypes.object,
  standard: PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(NarrativeESRStandardHint);
