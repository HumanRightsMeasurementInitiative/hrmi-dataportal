/**
 *
 * SectionFooter
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { intlShape, injectIntl } from 'react-intl';
import { NewWindow } from 'grommet-icons';

import { DEFAULT_LOCALE } from 'i18n';
import { XPATHS } from 'containers/App/constants';
// styles
import SectionContainer from 'styled/SectionContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import ButtonTextIcon from 'styled/ButtonTextIcon';

import messages from './messages';

export function SectionFooter({ intl, locale }) {
  return (
    <SectionContainer background="footer">
      <ContentMaxWidth align="start">
        <Box direction="row" margin={{ top: 'large' }}>
          <ButtonTextIcon
            href={XPATHS.contact[locale] || XPATHS.contact[DEFAULT_LOCALE]}
            label={intl.formatMessage(messages.footer.contactLink)}
            target="_blank"
            icon={<NewWindow color="white" />}
          />
        </Box>
      </ContentMaxWidth>
    </SectionContainer>
  );
}

SectionFooter.propTypes = {
  // nav: PropTypes.func,
  locale: PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(SectionFooter);
