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

import { INTRO_IMAGES } from 'containers/App/constants';
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
  font-size: 40px;
  line-height: 60px;
  margin-top: 0;
  margin-bottom: 0;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    font-size: ${({ theme }) => theme.text.xxxlarge.size};
    line-height: ${({ theme }) => theme.text.xxxlarge.height};
  }
`;

const Claim = styled(Heading)`
  font-weight: bold;
  font-size: ${({ theme }) => theme.text.xlarge.size};
  line-height: ${({ theme }) => theme.text.xlarge.height};
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.global.edgeSize.medium};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    font-size: ${({ theme }) => theme.text.xxlarge.size};
    line-height: ${({ theme }) => theme.text.xxlarge.height};
  }
`;

const getRightPad = size => {
  if (isMinSize(size, 'xlarge')) return { right: '110px' };
  if (isMinSize(size, 'large')) return { right: '80px' };
  return { right: '0' };
};

export function SectionIntro({ theme }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((index + 1) % INTRO_IMAGES.length);
    }, 5000);
    return () => clearTimeout(timer);
  });
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <SectionContainer
          pad={{
            top: 'xxlarge',
            bottom: size === 'small' ? 'large' : 'xxlarge',
          }}
        >
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
                    maxHeight: '444px',
                    overflow: 'hidden',
                    maxWidth: `${theme.sizes.imageHomeMaxWidth}px`,
                    position: 'relative',
                  }}
                  justify="start"
                  align="start"
                >
                  <Image alt="intro" src={INTRO_IMAGES[index]} />
                </Box>
              </>
            )}
          </Box>
          <ContentMaxWidth align="start" direction="row" stretch>
            <Box
              basis={isMinSize(size, 'large') ? '1/2' : '1'}
              pad={getRightPad(size)}
              style={{ position: 'relative' }}
            >
              <GraphicWrap
                style={{ top: 0, left: 0, transform: 'translate(-55%, -45%)' }}
              >
                <GraphicCircle
                  color="graphicRed"
                  size={size === 'small' ? '75px' : '100px'}
                />
              </GraphicWrap>
              <div style={{ position: 'relative' }}>
                <PageTitle>
                  <FormattedMessage {...rootMessages.app.title} />
                </PageTitle>
                <Claim>
                  <FormattedMessage {...rootMessages.app.claim} />
                </Claim>
                <Paragraph
                  size={size === 'small' ? 'large' : 'xlarge'}
                  margin={{ bottom: size === 'small' ? 'medium' : 'xlarge' }}
                >
                  <FormattedMessage {...messages.intro} />
                </Paragraph>
                <SearchWrapper>
                  <Search
                    stretch
                    size={size === 'small' ? 'medium' : 'large'}
                    example
                    focus
                  />
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
                  minHeight: '400px',
                  maxHeight: '444px',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              />
            )}
            {isMinSize(size, 'large') && (
              <GraphicWrap
                style={{
                  bottom: 0,
                  right: 0,
                  transform: 'translate(40%, 40%)',
                }}
              >
                <GraphicDiamond
                  color="physint"
                  size={isMinSize(size, 'xlarge') ? 140 : 80}
                />
              </GraphicWrap>
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
