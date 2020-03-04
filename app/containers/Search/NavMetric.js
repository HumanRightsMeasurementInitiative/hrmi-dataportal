import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Box } from 'grommet';

import { SIZES } from 'theme';
import {
  DIMENSIONS,
  RIGHTS,
  INDICATORS,
  PATHS,
} from 'containers/App/constants';
import { selectMetric, navigate } from 'containers/App/actions';

import rootMessages from 'messages';

import { prepMetrics } from './search';

import NavWrapper from './NavWrapper';
import NavTop from './NavTop';
import NavScroll from './NavScroll';
import NavOptionGroup from './NavOptionGroup';

import messages from './messages';

export function NavMetric({
  onSelectMetric,
  intl,
  onClose,
  size,
  nav,
  subject,
}) {
  const [search, setSearch] = useState('');

  const dimensions = prepMetrics(DIMENSIONS, 'dimensions', search, intl);
  const rights = prepMetrics(RIGHTS, 'rights', search, intl);
  const indicators = prepMetrics(INDICATORS, 'indicators', search, intl);
  const hasMetrics =
    dimensions.length > 0 || rights.length > 0 || indicators.length > 0;
  // figure out available height for IE11
  const h = window.innerHeight - SIZES.header.height;
  return (
    <NavWrapper h={h}>
      <NavTop
        onClose={() => onClose()}
        search={search}
        onSearch={s => setSearch(s)}
        placeholder={intl.formatMessage(messages.metricSearch)}
        size={size}
        subject={subject}
      />
      <NavScroll>
        <Box flex overflow="auto" pad="medium">
          {search === '' && (
            <NavOptionGroup
              label="All rights"
              options={[
                {
                  key: 'metrics',
                  code: 'metrics',
                  label: 'Rights overview',
                  special: true,
                },
              ]}
              onClick={() => {
                onClose();
                nav(PATHS.METRICS);
              }}
            />
          )}
          {!hasMetrics && <FormattedMessage {...messages.noResults} />}
          {dimensions.length > 0 && (
            <NavOptionGroup
              label={intl.formatMessage(rootMessages.metricTypes.dimensions)}
              options={dimensions}
              onClick={key => {
                onClose();
                onSelectMetric(key);
              }}
            />
          )}
          {rights.length > 0 && (
            <NavOptionGroup
              label={intl.formatMessage(rootMessages.metricTypes.rights)}
              options={rights}
              onClick={key => {
                onClose();
                onSelectMetric(key);
              }}
            />
          )}
          {indicators.length > 0 && (
            <NavOptionGroup
              label={intl.formatMessage(rootMessages.metricTypes.indicators)}
              options={indicators}
              onClick={key => {
                onClose();
                onSelectMetric(key);
              }}
            />
          )}
        </Box>
      </NavScroll>
    </NavWrapper>
  );
}

NavMetric.propTypes = {
  onSelectMetric: PropTypes.func,
  onClose: PropTypes.func,
  nav: PropTypes.func,
  intl: intlShape.isRequired,
  size: PropTypes.string,
  subject: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSelectMetric: metric => dispatch(selectMetric(metric)),
    nav: location => {
      dispatch(
        navigate(location, {
          keepTab: true,
          trackEvent: {
            category: 'Content',
            action: 'Header: navigate',
            value: typeof location === 'object' ? location.pathname : location,
          },
        }),
      );
    },
  };
}
const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(NavMetric));
