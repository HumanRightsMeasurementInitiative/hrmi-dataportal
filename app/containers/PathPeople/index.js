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

import { Box, ResponsiveContext, Image as GImage, Paragraph } from 'grommet';
import { withTheme } from 'styled-components';

import rootMessages from 'messages';

import { getPeopleAtRiskForCountry } from 'containers/App/selectors';

import { loadDataIfNeeded, navigate } from 'containers/App/actions';
import { PATHS, IMAGE_PATH } from 'containers/App/constants';
import saga from 'containers/App/saga';

import Breadcrumb from 'components/Breadcrumb';
import AsideBackground from 'components/AsideBackground';
import Aside from 'components/Aside';

import ContentWrap from 'styled/ContentWrap';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import PageTitle from 'styled/PageTitle';
import ContentContainer from 'styled/ContentContainer';
import MainColumn from 'styled/MainColumn';

import { useInjectSaga } from 'utils/injectSaga';
import { isMinSize } from 'utils/responsive';
//
// const Image = styled.img`
//   width: 100%;
// `;

import messages from './messages';

const DEPENDENCIES = ['atRisk'];

export function PathPeople({
  intl,
  onLoadData,
  nav,
  match,
  // atRisk,
  // dataReady,
}) {
  // const layerRef = useRef();
  useInjectSaga({ key: 'app', saga });
  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);

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
  match: PropTypes.object,
  atRisk: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  dataReady: PropTypes.bool,
  theme: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  atRisk: (state, { match }) => getPeopleAtRiskForCountry(state, match.params),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () => {
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key)));
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
