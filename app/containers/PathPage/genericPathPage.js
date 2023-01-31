/**
 *
 * Generic Page
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import styled from 'styled-components';
import { intlShape, injectIntl } from 'react-intl';

import { loadContentIfNeeded } from 'containers/App/actions';
import { getContentByKey, getCloseTargetPage } from 'containers/App/selectors';

import Close from 'containers/Close';
import HTMLWrapper from 'components/HTMLWrapper';
import LoadingIndicator from 'components/LoadingIndicator';
import ContentWrap from 'styled/ContentWrap';
import ContentContainer from 'styled/ContentContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import PageTitle from 'styled/PageTitle';

import rootMessages from 'messages';

const StyledContent = styled.div`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 60px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    margin-top: 40px;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    margin-top: 60px;
  }
`;

export function GenericPathPage({
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
        <ContentMaxWidth>
          <Close closeTarget={closeTarget} />
          <StyledContent>
            <PageTitle level={1}>{pageTitle}</PageTitle>
            {content && <HTMLWrapper innerhtml={content.content} fullPage />}
            {!content && <LoadingIndicator />}
          </StyledContent>
        </ContentMaxWidth>
      </ContentContainer>
    </ContentWrap>
  );
}

GenericPathPage.propTypes = {
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

export default compose(withConnect)(injectIntl(GenericPathPage));
