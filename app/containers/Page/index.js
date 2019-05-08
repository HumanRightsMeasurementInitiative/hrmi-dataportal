/**
 *
 * Page
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { loadContentIfNeeded } from 'containers/App/actions';
import { getContentByKey } from 'containers/App/selectors';

import HTMLWrapper from 'components/HTMLWrapper';
import Loading from 'components/Loading';

export function Page({ match, onLoadContent, content }) {
  useEffect(() => {
    // kick off loading of page content
    onLoadContent(match.params.page);
  });
  return (
    <div>
      {content && <HTMLWrapper innerhtml={content} />}
      {!content && <Loading />}
    </div>
  );
}

Page.propTypes = {
  match: PropTypes.object,
  onLoadContent: PropTypes.func,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  content: (state, props) => getContentByKey(state, props.match.params.page),
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

export default compose(withConnect)(Page);
