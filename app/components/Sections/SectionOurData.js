/**
 *
 * SectionOurData
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Paragraph, Box, ResponsiveContext } from 'grommet';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Share } from 'grommet-icons';

import { PATHS, PAGES, XPATHS } from 'containers/App/constants';
import { DEFAULT_LOCALE } from 'i18n';

// styles
import SectionContainer from 'styled/SectionContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import ButtonTextIcon from 'styled/ButtonTextIcon';

import { isMinSize, isMaxSize } from 'utils/responsive';

import graphic from 'images/graphics/people_overview.svg';

import SectionTitle from './SectionTitle';
import messages from './messages';

const Image = styled.img`
  width: 100%;
  max-width: 260px;
`;
const getBasisMain = size => {
  if (isMinSize(size, 'xlarge')) {
    return '1/2';
  }
  if (isMinSize(size, 'large')) {
    return '2/3';
  }
  return '1';
};
const getBasisAside = size => {
  if (isMinSize(size, 'xlarge')) {
    return '1/2';
  }
  if (isMinSize(size, 'large')) {
    return '1/3';
  }
  return '0';
};

export function SectionOurData({ nav, intl, locale }) {
  const hasSecondPara =
    intl.messages[messages.ourData.para2] &&
    intl.formatMessage(messages.ourData.para2).trim() !== '';
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <SectionContainer>
          <ContentMaxWidth>
            {isMinSize(size, 'large') && (
              <Box
                pad={{
                  left: isMinSize(size, 'large') ? 'xlarge' : 'medium',
                  top: isMinSize(size, 'large') ? 'medium' : 'small',
                }}
                basis={getBasisAside(size)}
              >
                <Image src={graphic} />
              </Box>
            )}
            <Box
              basis={getBasisMain(size)}
              pad={{ right: isMinSize(size, 'large') ? 'xlarge' : '0' }}
            >
              <SectionTitle
                title={intl.formatMessage(messages.ourData.title)}
              />
              <Paragraph
                margin={{ bottom: hasSecondPara ? 'small' : 'medium' }}
              >
                <FormattedMessage {...messages.ourData.para1} />
              </Paragraph>
              {hasSecondPara && (
                <Paragraph margin={{ bottom: 'medium' }}>
                  <FormattedMessage {...messages.ourData.para2} />
                </Paragraph>
              )}
              <Box direction={isMaxSize(size, 'sm') ? 'column' : 'row'}>
                <ButtonTextIcon
                  href={
                    XPATHS.download[locale] || XPATHS.download[DEFAULT_LOCALE]
                  }
                  target="_blank"
                  label={intl.formatMessage(messages.ourData.downloadLink)}
                  icon={<Share color="dark" size="small" />}
                  gap="xsmall"
                />
                <ButtonTextIcon
                  style={
                    isMaxSize(size, 'sm')
                      ? { marginTop: '5px' }
                      : { marginLeft: 'auto' }
                  }
                  onClick={() => nav(`${PATHS.PAGE}/${PAGES.methodology.key}`)}
                  label={intl.formatMessage(messages.ourData.aboutLink)}
                  hasIcon
                  secondary
                />
              </Box>
            </Box>
          </ContentMaxWidth>
        </SectionContainer>
      )}
    </ResponsiveContext.Consumer>
  );
}

SectionOurData.propTypes = {
  nav: PropTypes.func,
  intl: intlShape.isRequired,
  locale: PropTypes.string,
};

export default injectIntl(SectionOurData);
