import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import UL from 'styled/UL';

import Tooltip from 'components/Tooltip';
import { rightsForDimension } from 'utils/rights';

import rootMessages from 'messages';

function DimensionTooltip({ intl, dimensionKey }) {
  const rights = rightsForDimension(dimensionKey);
  return (
    <Tooltip
      iconSize="medium"
      text={intl.formatMessage(rootMessages.tooltip[dimensionKey], {
        count: rights.length,
      })}
      large
      component={
        <>
          <FormattedMessage
            {...rootMessages.tooltip[dimensionKey]}
            values={{ count: rights.length }}
          />
          <UL>
            {rights.map(r => (
              <li key={r.key}>
                <FormattedMessage {...rootMessages.rights[r.key]} />
              </li>
            ))}
          </UL>
        </>
      }
    />
  );
}

DimensionTooltip.propTypes = {
  intl: intlShape.isRequired,
  dimensionKey: PropTypes.string,
};

export default injectIntl(DimensionTooltip);
