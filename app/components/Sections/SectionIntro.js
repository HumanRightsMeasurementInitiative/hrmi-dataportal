/**
 *
 * Overview
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { Box, Paragraph, Heading, ResponsiveContext } from 'grommet';

import { IMAGE_PATH } from 'containers/App/constants';
import Search from 'containers/Search';
// styles
import SectionContainer from 'styled/SectionContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';

import { isMinSize } from 'utils/responsive';

import rootMessages from 'messages';
import messages from './messages';

const SearchWrapper = styled.div`
  width: 100%;
  margin: 20px 0;
`;

const Image = styled.img`
  width: 100%;
`;

const PageTitle = styled(Heading)`
  font-weight: normal;
  font-size: ${({ theme }) => theme.text.xxxlarge.size};
  line-height: ${({ theme }) => theme.text.xxxlarge.height};
  margin-top: 0;
  margin-bottom: 0;
`;

const Claim = styled(Heading)`
  font-weight: bold;
  font-size: ${({ theme }) => theme.text.xxlarge.size};
  line-height: ${({ theme }) => theme.text.xxlarge.height};
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.global.edgeSize.medium};
`;

export function SectionIntro() {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <SectionContainer pad={{ vertical: 'xlarge' }}>
          <ContentMaxWidth maxWidth="medium" align="start">
            <Box
              basis={isMinSize(size, 'large') ? '1/2' : '1'}
              pad={{ right: 'xlarge' }}
            >
              <PageTitle>
                <FormattedMessage {...rootMessages.app.title} />
              </PageTitle>
              <Claim>
                <FormattedMessage {...rootMessages.app.claim} />
              </Claim>
              <Paragraph size="xlarge">
                <FormattedMessage {...messages.intro} />
              </Paragraph>
              <SearchWrapper>
                <Search dark stretch large float />
              </SearchWrapper>
            </Box>
            {isMinSize(size, 'large') && (
              <Box
                basis="1/2"
                style={{
                  minHeight: '300px',
                  maxHeight: '200px',
                  overflow: 'hidden',
                }}
                justify="start"
                align="start"
              >
                <Image alt="intro" src={`${IMAGE_PATH}/Quality-of-LIfe.jpg`} />
              </Box>
            )}
          </ContentMaxWidth>
        </SectionContainer>
      )}
    </ResponsiveContext.Consumer>
  );
}

SectionIntro.propTypes = {};

export default SectionIntro;
