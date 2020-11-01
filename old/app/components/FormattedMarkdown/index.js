import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import Markdown from 'react-remarkable';

function FormattedMarkdown ({ id, defaultMessage, values, intl }) {
  return (
    <span className='hrmi-formatted-markdown'>
      <Markdown
        options={{
          breaks: true,
        }}
        source={intl.formatMessage({ id, defaultMessage }, values)}
      />
    </span>
  );
}

FormattedMarkdown.propTypes = {
  intl: intlShape,
  id: PropTypes.string,
  defaultMessage: PropTypes.string,
  values: PropTypes.object,
};

export default injectIntl(FormattedMarkdown);
