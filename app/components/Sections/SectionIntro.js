/**
 *
 * Overview
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled, { withTheme } from 'styled-components';

import { Box, Paragraph, Heading, ResponsiveContext } from 'grommet';

import { IMAGE_PATH } from 'containers/App/constants';
import Search from 'containers/Search';
// styles
import SectionContainer from 'styled/SectionContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import GraphicWrap from 'styled/GraphicWrap';
import GraphicCircle from 'styled/GraphicCircle';
import GraphicDiamond from 'styled/GraphicDiamond';

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

const images = [
  `${IMAGE_PATH}/Header-Ethiopian-girl-768x510.jpg`,
  `${IMAGE_PATH}/Header-Kazakh-768x576.jpg`,
  `${IMAGE_PATH}/Header-Cambodian-boy-768x513.jpg`,
  `${IMAGE_PATH}/Header-boy-stripes-768x512.jpg`,
];

export function SectionIntro({ theme }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((index + 1) % images.length);
    }, 5000);
    return () => clearTimeout(timer);
  });
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <SectionContainer pad={{ top: 'xxlarge', bottom: 'xxlarge' }}>
          <Box
            align="start"
            direction="row"
            pad={{ top: 'xxlarge' }}
            style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
          >
            {isMinSize(size, 'large') && (
              <>
                <Box basis="1/2" />
                <Box
                  basis="1/2"
                  style={{
                    minHeight: '400px',
                    maxHeight: '400px',
                    overflow: 'hidden',
                    maxWidth: `${theme.sizes.imageHomeMaxWidth}px`,
                    position: 'relative',
                  }}
                  justify="start"
                  align="start"
                >
                  <Image alt="intro" src={images[index]} />
                </Box>
              </>
            )}
          </Box>
          <ContentMaxWidth align="start" direction="row" stretch>
            <Box
              basis={isMinSize(size, 'large') ? '1/2' : '1'}
              pad={{ right: isMinSize(size, 'large') ? 'xlarge' : '0' }}
              style={{ position: 'relative' }}
            >
              <GraphicWrap
                style={{ top: 0, left: 0, transform: 'translate(-55%, -45%)' }}
              >
                <GraphicCircle color="graphicRed" size="100px" />
              </GraphicWrap>
              {isMinSize(size, 'large') && (
                <GraphicWrap
                  style={{ top: 0, right: 0, transform: 'translate(85%, 40%)' }}
                >
                  <GraphicDiamond color="physint" size={200} />
                </GraphicWrap>
              )}
              <div style={{ position: 'relative' }}>
                <PageTitle>
                  <FormattedMessage {...rootMessages.app.title} />
                </PageTitle>
                <Claim>
                  <FormattedMessage {...rootMessages.app.claim} />
                </Claim>
                <Paragraph size="xlarge" margin={{ bottom: 'xlarge' }}>
                  <FormattedMessage {...messages.intro} />
                </Paragraph>
                <SearchWrapper>
                  <Search stretch size="large" />
                </SearchWrapper>
              </div>
            </Box>
            {isMinSize(size, 'large') && (
              <GraphicWrap
                style={{
                  top: 0,
                  left: '66%',
                  transform: 'translateY(-240%)',
                }}
              >
                <GraphicCircle color="graphicRed" size="32px" />
              </GraphicWrap>
            )}
            {isMinSize(size, 'large') && (
              <Box
                basis="1/2"
                style={{
                  minHeight: '350px',
                  maxHeight: '350px',
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

SectionIntro.propTypes = {
  theme: PropTypes.object,
};

export default withTheme(SectionIntro);
