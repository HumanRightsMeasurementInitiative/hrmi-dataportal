/**
 *
 * SectionPeople
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContext, Paragraph, Box } from 'grommet';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import styled, { withTheme } from 'styled-components';

import { PATHS, PAGES, IMAGE_PATH } from 'containers/App/constants';
// styles
import SectionContainer from 'styled/SectionContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import ButtonPrimary from 'styled/ButtonPrimary';

import { isMinSize } from 'utils/responsive';

import SectionTitle from './SectionTitle';
import messages from './messages';

const Image = styled.img`
  width: 100%;
`;

const imageSrc = `${IMAGE_PATH}/Quality-of-LIfe.jpg`;

export function SectionPeople({ nav, intl, theme }) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <SectionContainer>
          <Box
            align="start"
            direction="row"
            pad={{ top: 'medium' }}
            style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
          >
            {isMinSize(size, 'large') && (
              <>
                <Box basis="1/2" />
                <Box
                  basis="1/2"
                  style={{
                    minHeight: '300px',
                    maxHeight: '300px',
                    overflow: 'hidden',
                    maxWidth: `${theme.sizes.imageHomeMaxWidth}px`,
                    position: 'relative',
                  }}
                  justify="start"
                  align="start"
                >
                  <Image alt="intro" src={imageSrc} />
                </Box>
              </>
            )}
          </Box>
          <ContentMaxWidth align="start" direction="row" stretch>
            <Box
              basis={isMinSize(size, 'large') ? '1/2' : '1'}
              pad={{ right: 'xlarge' }}
              style={{ position: 'relative' }}
              justify="start"
            >
              <SectionTitle title={intl.formatMessage(messages.people.title)} />
              <Paragraph size="large">
                <FormattedMessage {...messages.people.teaser} />
              </Paragraph>
              <Box direction="row" margin={{ top: 'large' }}>
                <ButtonPrimary
                  onClick={() => nav(`${PATHS.PAGE}/${PAGES.atRisk.key}`)}
                  label={intl.formatMessage(messages.people.link)}
                />
              </Box>
            </Box>
            {isMinSize(size, 'large') && (
              <Box
                basis="1/2"
                style={{
                  minHeight: '300px',
                  maxHeight: '300px',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              />
            )}
          </ContentMaxWidth>
        </SectionContainer>
      )}
    </ResponsiveContext.Consumer>
  );
}

SectionPeople.propTypes = {
  nav: PropTypes.func,
  theme: PropTypes.object,
  intl: intlShape.isRequired,
};

export default injectIntl(withTheme(SectionPeople));
