/**
 *
 * Overview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

// import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

// containers
import { RIGHTS, DIMENSIONS } from 'containers/App/constants';
import { selectMetric } from 'containers/App/actions';

// components
import SectionRights from 'components/Sections/SectionRights';

// styles
import ContentWrap from 'styled/ContentWrap';
import ContentContainer from 'styled/ContentContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import PageTitle from 'styled/PageTitle';

import rootMessages from 'messages';
import messages from './messages';

export function PathMetricOverview({ onSelectMetric, intl }) {
  return (
    <ContentWrap>
      <ContentContainer header background="light-1">
        <ContentMaxWidth maxWidth="medium">
          <PageTitle level={2}>
            <FormattedMessage {...messages.title} />
          </PageTitle>
        </ContentMaxWidth>
      </ContentContainer>
      {DIMENSIONS.map(d => {
        const rights = RIGHTS.filter(r => r.dimension === d.key);
        return (
          <SectionRights
            rights={rights}
            onSelectRight={onSelectMetric}
            navAllRights={() => onSelectMetric(d.key)}
            labelAllRights={`${intl.formatMessage(
              rootMessages.dimensions[d.key],
            )} scores`}
            title={`${rights.length} ${intl.formatMessage(
              rootMessages.dimensions[d.key],
            )} rights`}
          />
        );
      })}
    </ContentWrap>
  );
}

PathMetricOverview.propTypes = {
  onSelectMetric: PropTypes.func,
  intl: intlShape.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSelectMetric: metric => dispatch(selectMetric(metric)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(PathMetricOverview));
