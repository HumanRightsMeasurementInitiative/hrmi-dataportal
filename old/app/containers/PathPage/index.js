/**
 *
 * Path Index Page
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { loadContentIfNeeded } from 'containers/App/actions';
import { getContentByKey, getCloseTargetPage } from 'containers/App/selectors';
import Methodology from './methodologyPathPage';
import About from './aboutPathPage';
import Generic from './genericPathPage';

export function PathPage({ match, onLoadContent, content, closeTarget, intl }) {
  let pageName;
  if (match) pageName = match.params.page;

  const choosePage = () => {
    if (pageName === 'methodology')
      return (
        <Methodology
          match={match}
          onLoadContent={onLoadContent}
          content={content}
          closeTarget={closeTarget}
          intl={intl}
        />
      );
    if (pageName === 'about')
      return (
        <About
          match={match}
          onLoadContent={onLoadContent}
          content={content}
          closeTarget={closeTarget}
          intl={intl}
        />
      );
    return (
      <Generic
        match={match}
        onLoadContent={onLoadContent}
        content={content}
        closeTarget={closeTarget}
        intl={intl}
      />
    );
  };

  return <React.Fragment>{choosePage()}</React.Fragment>;
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

export default compose(withConnect)(injectIntl(PathPage));
