/**
 *
 * Overview
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Paragraph, ResponsiveContext, Box } from 'grommet';
import styled, { withTheme } from 'styled-components';

import {
  // getDependenciesReady,
  getPeopleAtRiskCountryNo,
} from 'containers/App/selectors';
import { loadDataIfNeeded, selectGroup } from 'containers/App/actions';
import { AT_RISK_GROUPS, IMAGE_PATH } from 'containers/App/constants';

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

import graphic from 'images/graphics/countries_overview.svg';

import rootMessages from 'messages';
import messages from './messages';

const Image = styled.img`
  width: 100%;
  max-width: 200px;
`;

const DEPENDENCIES = ['atRisk'];

export function PathPeopleOverview({
  onLoadData,
  countryNo,
  theme,
  intl,
  onSelectGroup,
}) {
  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <ContentWrap>
          <ContentContainer direction="column" header>
            <ContentMaxWidth
              header
              height={`${theme.sizes.top.height}px`}
              hasAside={isMinSize(size, 'large')}
            >
              <MainColumn hasAside={isMinSize(size, 'large')} header>
                <PageTitle>
                  <FormattedMessage
                    {...messages.title}
                    values={{ no: AT_RISK_GROUPS.length }}
                  />
                </PageTitle>
                <Paragraph size="large">
                  <FormattedMessage
                    {...messages.header}
                    values={{ no: countryNo }}
                  />
                </Paragraph>
              </MainColumn>
              {isMinSize(size, 'large') && (
                <Aside align="start" justify="center">
                  <Image src={graphic} />
                </Aside>
              )}
            </ContentMaxWidth>
          </ContentContainer>
          <SectionContainer>
            <ContentMaxWidth column>
              <Box
                width="100%"
                pad={{ top: size === 'small' ? 'xsmall' : '0' }}
                align="start"
                responsive={false}
                margin={{ horizontal: `-${theme.global.edgeSize.small}` }}
              >
                <Box
                  direction="row"
                  wrap
                  overflow={isMaxSize(size, 'medium') ? 'hidden' : 'visible'}
                  pad={isMaxSize(size, 'medium') ? '40px 0 0' : '20px 0 0'}
                  align="start"
                >
                  {AT_RISK_GROUPS.map(g => (
                    <Card
                      key={g.key}
                      margin={{ vertical: 'medium', horizontal: 'xsmall' }}
                      onCardClick={() => {
                        onSelectGroup(g.key);
                      }}
                      imageSrc={`${IMAGE_PATH}/${g.key}.jpg`}
                      label={`${intl.formatMessage(
                        rootMessages['people-at-risk'][g.key],
                      )}`}
                      imageWhitespace
                      activeColor="brand"
                      type="photos"
                      basis={isMinSize(size, 'large') ? '240px' : '280px'}
                      minHeight
                    />
                  ))}
                </Box>
              </Box>
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
