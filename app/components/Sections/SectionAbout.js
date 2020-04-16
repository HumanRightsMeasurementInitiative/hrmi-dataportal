/**
 *
 * SectionAbout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { Paragraph, Box, ResponsiveContext, Text } from 'grommet';
import { NewWindow } from 'grommet-icons';

import { DEFAULT_LOCALE } from 'i18n';
import { XPATHS } from 'containers/App/constants';
// styles
import SectionContainer from 'styled/SectionContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import ButtonTextIcon from 'styled/ButtonTextIcon';

import { isMinSize } from 'utils/responsive';

import SectionTitle from './SectionTitle';
import messages from './messages';

export function SectionAbout({ intl, locale }) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <SectionContainer background="sectionDark">
          <ContentMaxWidth stretch direction="column">
            <SectionTitle title={intl.formatMessage(messages.about.title)} />
            <Box direction={isMinSize(size, 'large') ? 'row' : 'column'}>
              <Box
                basis={isMinSize(size, 'large') ? '1/2' : '1'}
                pad={{ right: isMinSize(size, 'large') ? 'ms' : '0' }}
                margin={{ bottom: 'small' }}
              >
                <Paragraph>
                  <Text weight={600}>
                    <FormattedMessage {...messages.about.lead} />
                  </Text>
                </Paragraph>
                <ButtonTextIcon
                  href={XPATHS.home[locale] || XPATHS.home[DEFAULT_LOCALE]}
                  target="_blank"
                  label={intl.formatMessage(messages.about.link)}
                  icon={<NewWindow />}
                />
              </Box>
              <Box
                basis={isMinSize(size, 'large') ? '1/2' : '1'}
                pad={{ left: isMinSize(size, 'large') ? 'ms' : '0' }}
                margin={{ bottom: 'small' }}
              >
                <Paragraph>
                  <FormattedMessage {...messages.about.text} />
                </Paragraph>
              </Box>
            </Box>
          </ContentMaxWidth>
        </SectionContainer>
      )}
    </ResponsiveContext.Consumer>
  );
}

SectionAbout.propTypes = {
  locale: PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(SectionAbout);
