/**
 *
 * Overview
 *
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Paragraph, ResponsiveContext, Box } from 'grommet';
import styled, { withTheme } from 'styled-components';
import { Helmet } from 'react-helmet';

import {
  // getDependenciesReady,
  getPeopleAtRiskCountryNo,
} from 'containers/App/selectors';
import { loadDataIfNeeded, selectGroup } from 'containers/App/actions';
import { AT_RISK_GROUPS, IMAGE_PATH } from 'containers/App/constants';
import { CARD_WIDTH } from 'theme';

import saga from 'containers/App/saga';
import { useInjectSaga } from 'utils/injectSaga';

import Aside from 'components/Aside';
import Card from 'components/Sections/Card';

// styles
import MainColumn from 'styled/MainColumn';
import ContentWrap from 'styled/ContentWrap';
import ContentContainer from 'styled/ContentContainer';
import SectionContainer from 'styled/SectionContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import PageTitle from 'styled/PageTitle';

import { isMinSize, isMaxSize } from 'utils/responsive';

import graphic from 'images/graphics/people_overview.svg';

import rootMessages from 'messages';
import messages from './messages';

const Image = styled.img`
  width: 100%;
  max-width: 200px;
`;
// prettier-ignore
const CardWrapper = styled(Box)`
  max-width: calc(100% + ${({ theme }) => {
    const value = parseInt(theme.global.edgeSize.xsmall.split('px')[0], 10);
    return value * 2;
  }}px);
`;

const DEPENDENCIES = ['atRisk'];

const getCardNumber = width => {
  const minCards = Math.floor(width / CARD_WIDTH.min);
  const maxCards = Math.floor(width / CARD_WIDTH.max);
  return minCards > maxCards ? minCards : maxCards;
};
const getCardWidth = (width, number, theme) => {
  const edge = parseInt(theme.global.edgeSize.xsmall.split('px')[0], 10);
  return `${width / number - edge * 2}px`;
};

export function PathPeopleOverview({
  onLoadData,
  countryNo,
  theme,
  intl,
  onSelectGroup,
}) {
  useInjectSaga({ key: 'app', saga });
  const ref = useRef(null);
  const [gridWidth, setGridWidth] = useState(0);

  const handleResize = () =>
    setGridWidth(ref.current ? ref.current.offsetWidth : 0);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);

  const cardNumber = gridWidth ? getCardNumber(gridWidth) : 1;
  const cardWidth = gridWidth
    ? getCardWidth(gridWidth, cardNumber, theme)
    : CARD_WIDTH.min;

  const metaTitle = intl.formatMessage(messages.title, {
    no: AT_RISK_GROUPS.length,
  });

  const metaDescription =
    intl.formatMessage(rootMessages.app.title) + ' - ' + metaTitle;

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <ContentWrap>
          <Helmet>
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta property="og:description" content={metaDescription} />
          </Helmet>
          <ContentContainer direction="column" header>
            <ContentMaxWidth
              header
              height={
                isMinSize(size, 'large')
                  ? `${theme.sizes.top.height}px`
                  : 'auto'
              }
              hasAside={isMinSize(size, 'large')}
            >
              <MainColumn hasAside={isMinSize(size, 'large')} header>
                <PageTitle>
                  <FormattedMessage
                    {...messages.title}
                    values={{ no: AT_RISK_GROUPS.length }}
                  />
                </PageTitle>
                <Paragraph size={isMaxSize(size, 'sm') ? 'medium' : 'large'}>
                  <FormattedMessage
                    {...messages.header}
                    values={{ no: countryNo }}
                  />
                </Paragraph>
              </MainColumn>
              {isMinSize(size, 'large') && (
                <Aside align="center" justify="center">
                  <Image src={graphic} />
                </Aside>
              )}
            </ContentMaxWidth>
          </ContentContainer>
          <SectionContainer background="sectionPeople">
            <ContentMaxWidth column>
              <CardWrapper
                pad={{ top: isMaxSize(size, 'sm') ? 'xsmall' : '0' }}
                align="start"
                responsive={false}
                margin={{ horizontal: `-${theme.global.edgeSize.xsmall}` }}
                ref={ref}
              >
                <Box
                  direction="row"
                  wrap
                  overflow={isMaxSize(size, 'medium') ? 'hidden' : 'visible'}
                  pad={isMaxSize(size, 'medium') ? '40px 0 0' : '20px 0 0'}
                  align="start"
                >
                  {gridWidth > 100 &&
                    AT_RISK_GROUPS.map(g => (
                      <Card
                        key={g.key}
                        margin={{ vertical: 'medium', horizontal: 'xsmall' }}
                        onCardClick={() => {
                          onSelectGroup(g.key);
                        }}
                        imageSrc={`${IMAGE_PATH}/people_${g.key}.png`}
                        label={`${intl.formatMessage(
                          rootMessages['people-at-risk'][g.key],
                        )}`}
                        imageWhitespace
                        activeColor="brand"
                        type="photos"
                        width={cardWidth}
                        minHeight
                      />
                    ))}
                </Box>
              </CardWrapper>
            </ContentMaxWidth>
          </SectionContainer>
        </ContentWrap>
      )}
    </ResponsiveContext.Consumer>
  );
}

PathPeopleOverview.propTypes = {
  onLoadData: PropTypes.func.isRequired,
  // dataReady: PropTypes.bool,
  countryNo: PropTypes.number,
  onSelectGroup: PropTypes.func,
  intl: intlShape.isRequired,
  theme: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  // dataReady: state => getDependenciesReady(state, DEPENDENCIES),
  countryNo: state => getPeopleAtRiskCountryNo(state),
});
export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () => {
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key)));
    },
    onSelectGroup: code => dispatch(selectGroup(code)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(withTheme(PathPeopleOverview)));
