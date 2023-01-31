/**
 *
 * About Page
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import styled from 'styled-components';
import { intlShape, injectIntl, formatMessage } from 'react-intl';

import { loadContentIfNeeded } from 'containers/App/actions';
import { getContentByKey, getCloseTargetPage } from 'containers/App/selectors';

import Close from 'containers/Close';
import LoadingIndicator from 'components/LoadingIndicator';
import ContentWrap from 'styled/ContentWrap';
import ContentContainer from 'styled/ContentContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import PageTitle from 'styled/PageTitle';
import icon from 'images/graphics/about.png';

import rootMessages from 'messages';

const StyledContent = styled.div`
  width: 100%;
  margin-bottom: 60px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    width: 50%;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    width: 50%;
  }
`;

const StyledContentHeader = styled.div`
  width: 100%;
  margin-top: 36px;
  margin-bottom: 48px;
  height: 260px;
  background-color: #fdf0dc;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledContentSubHeading = styled.div`
  width: 100%;
  fontsize: '1.2em';
  lineheight: '1.4';
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    width: 80%;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    width: 60%;
  }
`;

const StyledContentImg = styled.img`
  display: none;
  position: absolute;
  top: -42px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    left: 60%;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    display: block;
    left: 75%;
    width: 200px;
  }
`;

const StyledContentInfoBox = styled.div`
  width: 100%;
  padding: 40px;
  background-color: #fdf0dc;
  line-height: 150%;
  margin-top: 50px;
  margin-bottom: 50px;
`;

export function AboutPathPage({
  match,
  onLoadContent,
  content,
  closeTarget,
  intl,
}) {
  useEffect(() => {
    // kick off loading of page content
    onLoadContent(match.params.page);
  }, [match.params.page]);
  const page = match && match.params.page;
  const pageTitle = intl.formatMessage(rootMessages.page[page]);

  // actual data
  const bulkContent = content.content;

  const metaDescription =
    intl.formatMessage(rootMessages.app.metaTitle) + ' - ' + pageTitle;

  return (
    <ContentWrap>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="og:description" content={metaDescription} />
      </Helmet>
      <ContentContainer direction="column" header>
        <StyledContentHeader>
          <Close closeTarget={closeTarget} />
          <ContentMaxWidth direction="column">
            <PageTitle level={1}>{pageTitle}</PageTitle>
            <StyledContentSubHeading>
              <p>
                {bulkContent &&
                  bulkContent
                    .split('sub-heading')[1]
                    .replace('===end-', ' ')
                    .replace(/<\W?p>/g, ' ')}
              </p>
            </StyledContentSubHeading>
            <StyledContentImg src={icon} />
          </ContentMaxWidth>
        </StyledContentHeader>

        <ContentMaxWidth>
          <StyledContent>
            {/* eslint-disable react/no-danger */}
            {bulkContent &&
              bulkContent.split('===').map(section => {
                if (
                  section.includes('text-section') &&
                  !section.includes('end-')
                ) {
                  const sectionReplaced = section.replace('text-section', ' ');
                  return (
                    <p
                      key="text-section"
                      dangerouslySetInnerHTML={{ __html: sectionReplaced }}
                    />
                  );
                }
                if (section.includes('info-box') && !section.includes('end-')) {
                  const sectionReplaced = section.replace('info-box', ' ');
                  return (
                    <StyledContentInfoBox
                      key="info-box"
                      dangerouslySetInnerHTML={{ __html: sectionReplaced }}
                    />
                  );
                }
                return null;
              })}
            {/* eslint-enable react/no-danger */}
            {!bulkContent && <LoadingIndicator />}
          </StyledContent>
        </ContentMaxWidth>
      </ContentContainer>
    </ContentWrap>
  );
}

AboutPathPage.propTypes = {
  match: PropTypes.object,
  onLoadContent: PropTypes.func,
  closeTarget: PropTypes.object,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  content: (state, props) => getContentByKey(state, props.match.params.page),
  closeTarget: state => getCloseTargetPage(state),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadContent: page => {
      dispatch(loadContentIfNeeded(page));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(AboutPathPage));
