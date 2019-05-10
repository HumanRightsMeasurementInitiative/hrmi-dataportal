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

import { loadContentIfNeeded } from 'containers/App/actions';
import { getContentByKey, getCloseTarget } from 'containers/App/selectors';

import Close from 'containers/Close';
import HTMLWrapper from 'components/HTMLWrapper';
import Loading from 'components/Loading';

export function PathPage({ match, onLoadContent, content, closeTarget }) {
  useEffect(() => {
    // kick off loading of page content
    onLoadContent(match.params.page);
  });
  console.log('Page', closeTarget);
  return (
    <div>
      <Helmet>
        <title>Page</title>
        <meta name="description" content="Description of Page" />
      </Helmet>
      <Close closeTarget={closeTarget} />
      <div>
        {content && <HTMLWrapper innerhtml={content} />}
        {!content && <Loading />}
      </div>
    </div>
  );
}

PathPage.propTypes = {
  match: PropTypes.object,
  onLoadContent: PropTypes.func,
  closeTarget: PropTypes.object,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
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

export default compose(withConnect)(PathPage);
