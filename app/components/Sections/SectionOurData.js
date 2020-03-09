/**
 *
 * SectionOurData
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Paragraph, Box } from 'grommet';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

import { PATHS, PAGES } from 'containers/App/constants';
// styles
import SectionContainer from 'styled/SectionContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import ButtonPrimary from 'styled/ButtonPrimary';
import ButtonTextIcon from 'styled/ButtonTextIcon';

import SectionTitle from './SectionTitle';
import messages from './messages';

export function SectionOurData({ nav, intl }) {
  return (
    <SectionContainer>
      <ContentMaxWidth>
        <Box basis="2/3">
          <SectionTitle title={intl.formatMessage(messages.ourData.title)} />
          <Paragraph>
            <FormattedMessage {...messages.ourData.para1} />
          </Paragraph>
          <Paragraph>
            <FormattedMessage {...messages.ourData.para2} />
          </Paragraph>
          <Box direction="row">
            <ButtonPrimary
              onClick={() => nav(`${PATHS.PAGE}/${PAGES.download.key}`)}
              label={intl.formatMessage(messages.ourData.downloadLink)}
            />
            <ButtonTextIcon
              onClick={() => nav(`${PATHS.PAGE}/${PAGES.methodology.key}`)}
              label={intl.formatMessage(messages.ourData.aboutLink)}
              icon
            />
          </Box>
        </Box>
        <Box basis="1/3">TODO graphic</Box>
      </ContentMaxWidth>
    </SectionContainer>
  );
}

SectionOurData.propTypes = {
  nav: PropTypes.func,
  intl: intlShape.isRequired,
};

export default injectIntl(SectionOurData);
