/**
 *
 * Country
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import {
  Heading,
  Box,
  ResponsiveContext,
  Image as GImage,
  Paragraph,
} from 'grommet';
import styled, { withTheme } from 'styled-components';

import rootMessages from 'messages';

import {
  getPeopleAtRiskForGroup,
  getCountries,
  getDependenciesReady,
} from 'containers/App/selectors';

import {
  loadDataIfNeeded,
  navigate,
  selectCountry,
} from 'containers/App/actions';
import { PATHS, IMAGE_PATH } from 'containers/App/constants';
import saga from 'containers/App/saga';

import Breadcrumb from 'components/Breadcrumb';
import AsideBackground from 'components/AsideBackground';
import Aside from 'components/Aside';

import ContentWrap from 'styled/ContentWrap';
import SectionContainer from 'styled/SectionContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import PageTitle from 'styled/PageTitle';
import ContentContainer from 'styled/ContentContainer';
import MainColumn from 'styled/MainColumn';
import ButtonText from 'styled/ButtonText';

import { useInjectSaga } from 'utils/injectSaga';
import { isMinSize } from 'utils/responsive';

import messages from './messages';

const Styled = styled.div`
  margin-top: 60px;
  margin-bottom: 20px;
`;
const Top = styled.div``;

const DEPENDENCIES = ['atRisk', 'countries'];

export function PathPeople({
  intl,
  onLoadData,
  nav,
  match,
  atRisk,
  countries,
  dataReady,
  onSelectCountry,
}) {
  // const layerRef = useRef();
  useInjectSaga({ key: 'app', saga });
  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);
  console.log(atRisk);
  console.log(countries);

  const peopleCode = match.params.group;
  let groupTitle = peopleCode;
  if (rootMessages['people-at-risk'][peopleCode]) {
    groupTitle = intl.formatMessage(rootMessages['people-at-risk'][peopleCode]);
  } else {
    console.log('People code not in language files:', peopleCode);
  }
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <ContentWrap>
          <Helmet>
            <title>{groupTitle}</title>
            <meta name="description" content="Description of Country page" />
          </Helmet>
          <Box style={{ position: 'relative' }} height="280px">
            {isMinSize(size, 'large') && <AsideBackground />}
            <ContentContainer direction="column" header>
              <ContentMaxWidth
                header
                height="280px"
                hasAside={isMinSize(size, 'large')}
              >
                <MainColumn hasAside={isMinSize(size, 'large')} header hasLinks>
                  <Breadcrumb
                    onItemClick={() => nav(PATHS.GROUPS)}
                    breadcrumb
                    items={[
                      {
                        key: 'all',
                        label: intl.formatMessage(
                          rootMessages.labels.allPeople,
                        ),
                      },
                    ]}
                  />
                  <PageTitle>{groupTitle}</PageTitle>
                  <Paragraph>
                    <FormattedMessage {...messages.header} />
                  </Paragraph>
                  <Paragraph>
                    <FormattedMessage {...messages.link} />
                  </Paragraph>
                </MainColumn>
                {isMinSize(size, 'large') && (
                  <Aside image>
                    <GImage
                      src={`${IMAGE_PATH}/${peopleCode}.jpg`}
                      fit="cover"
                    />
                  </Aside>
                )}
              </ContentMaxWidth>
            </ContentContainer>
          </Box>
          <SectionContainer>
            <ContentMaxWidth column>
              <Styled>
                <Top>
                  <Heading level={2} margin={{ bottom: 'xsmall', top: '0' }}>
                    <FormattedMessage {...messages.header} />
                  </Heading>
                </Top>
                {dataReady && (
                  <Box>
                    {atRisk.map(c => (
                      <ButtonText
                        onClick={() => onSelectCountry(c, peopleCode)}
                      >
                        {rootMessages.countries[c] && (
                          <FormattedMessage {...rootMessages.countries[c]} />
                        )}
                      </ButtonText>
                    ))}
                  </Box>
                )}
              </Styled>
            </ContentMaxWidth>
          </SectionContainer>
        </ContentWrap>
      )}
    </ResponsiveContext.Consumer>
  );
}

PathPeople.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  onLoadData: PropTypes.func.isRequired,
  nav: PropTypes.func,
  onSelectCountry: PropTypes.func,
  match: PropTypes.object,
  atRisk: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  countries: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  dataReady: PropTypes.bool,
  theme: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  dataReady: state => getDependenciesReady(state, DEPENDENCIES),
  atRisk: (state, { match }) => getPeopleAtRiskForGroup(state, match.params),
  countries: state => getCountries(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () => {
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key)));
    },
    onSelectCountry: (countryCode, peopleCode) => {
      dispatch(selectCountry(countryCode, 'atrisk', peopleCode));
    },
    nav: location => {
      dispatch(
        navigate(location, {
          keepTab: true,
          trackEvent: {
            category: 'Content',
            action: 'At risk group: navigate',
            value: typeof location === 'object' ? location.pathname : location,
          },
        }),
      );
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(withTheme(PathPeople)));
