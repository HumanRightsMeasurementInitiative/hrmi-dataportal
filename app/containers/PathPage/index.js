/**
 *
 * Page
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
import { getContentByKey, getCloseTarget } from 'containers/App/selectors';

import Close from 'containers/Close';
import HTMLWrapper from 'components/HTMLWrapper';
import LoadingIndicator from 'components/LoadingIndicator';
import ContentWrap from 'styled/ContentWrap';
import ContentContainer from 'styled/ContentContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import { Heading } from 'grommet';

import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/App/saga';

import rootMessages from 'messages';

const StyledContent = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

export function PathPage({ match, onLoadContent, content, closeTarget, intl }) {
  useInjectSaga({ key: 'app', saga });

  useEffect(() => {
    // kick off loading of page content
    onLoadContent(match.params.page);
  }, [match.params.page]);
  const page = match && match.params.page;
  const pageTitle = intl.formatMessage(rootMessages.page[page]);

  return (
    <ContentWrap>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content="Description of Page" />
      </Helmet>
      <ContentContainer direction="column" header>
        <Close closeTarget={closeTarget} keepTab topRight />
        <ContentMaxWidth>
          <StyledContent>
            <Heading
              margin={{ top: 'small', bottom: 'medium' }}
              style={{ fontWeight: 400 }}
              level={1}
            >
              {pageTitle}
            </Heading>
            {content && <HTMLWrapper innerhtml={content.content} />}
            {!content && <LoadingIndicator />}
          </StyledContent>
        </ContentMaxWidth>
      </ContentContainer>
    </ContentWrap>
  );
}

PathPage.propTypes = {
  match: PropTypes.object,
  onLoadContent: PropTypes.func,
  closeTarget: PropTypes.object,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  content: (state, props) => getContentByKey(state, props.match.params.page),
  closeTarget: state => getCloseTarget(state),
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

export default compose(withConnect)(injectIntl(PathPage));
