import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import { getCookieConsent } from 'containers/App/selectors';
import { checkCookieConsent, setCookieConsent } from 'containers/App/actions';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/App/saga';
import Button from 'styled/Button';

import messages from './messages';

const Styled = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 320px;
  height: 300px;
  background: white;
  z-index: 9999;
`;

export function CookieConsent({ init, cookieConsent, intl, consent }) {
  useInjectSaga({ key: 'app', saga });
  useEffect(() => {
    init();
  }, []);

  return cookieConsent !== 'true' && cookieConsent !== 'false' ? (
    <Styled>
      <div>
        <FormattedMessage {...messages.nonEssentialConsentInfo} />
      </div>
      <div>
        <Button onClick={() => consent('true')}>
          <FormattedMessage {...messages.buttonAccept} />
        </Button>
        <Button onClick={() => consent('false')}>
          <FormattedMessage {...messages.buttonReject} />
        </Button>
      </div>
      <div>
        <FormattedMessage {...messages.additionalInfo} />
        <a href={intl.formatMessage(messages.urlPrivacyPolicy)} target="_blank">
          <FormattedMessage {...messages.anchorPrivacyPolicy} />
        </a>
      </div>
    </Styled>
  ) : null;
}

CookieConsent.propTypes = {
  init: PropTypes.func,
  consent: PropTypes.func,
  cookieConsent: PropTypes.string,
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  cookieConsent: state => getCookieConsent(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    init: () => dispatch(checkCookieConsent()),
    consent: status => dispatch(setCookieConsent(status)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(CookieConsent));
