import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends React.Component {
  componentDidUpdate (prevProps) {
    const nextSplitPath = this.props.location.pathname.split('/');
    const prevSplitPath = prevProps.location.pathname.split('/');

    // const nextTab = new URLSearchParams(this.props.location.search).get('tab');
    // const prevTab = new URLSearchParams(prevProps.location.search).get('tab');

    // eg ['', 'en', 'route', 'param1', 'param2']
    if (
      this.props.location.pathname !== prevProps.location.pathname &&
      (nextSplitPath.length < 4 ||
        prevSplitPath.length < 4 ||
        nextSplitPath[2] !== prevSplitPath[2] ||
        nextSplitPath[3] !== prevSplitPath[3])
    ) {
      window.scrollTo(0, 0);
    }
    // if (nextTab !== prevTab) {
    //   window.scrollTo(0, 0);
    // }
  }

  render () {
    return this.props.children;
  }
}
ScrollToTop.propTypes = {
  location: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default withRouter(ScrollToTop);
