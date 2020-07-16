import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Box, Layer, Paragraph } from 'grommet';
import {
  getCookieConsent,
  getCookieConsentApp,
  getCookieConsentChecked,
} from 'containers/App/selectors';
import { checkCookieConsent, setCookieConsent } from 'containers/App/actions';
import saga from 'containers/App/saga';
import { useInjectSaga } from 'utils/injectSaga';

import ButtonHero from 'styled/ButtonHero';

import messages from './messages';

const Styled = styled.div``;

const StyledLayer = styled(Layer)`
  @media print {
    display: none;
  }
`;

const LinkInText = styled.a`
  color: ${props => props.theme.global.colors.white};
  &:hover {
    color: rgba(255, 255, 255, 0.85);
  }
`;

const StyledButtonHero = styled(ButtonHero)`
  margin: 0 ${({ theme }) => theme.global.edgeSize.xsmall};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 5px 10px;
  }
`;

const ButtonWrap = styled.div`
  text-align: center;
  margin: 0 auto;
`;

export function CookieConsent({
  init,
  cookieConsent,
  cookieConsentApp,
  intl,
  onConsent,
  checked,
}) {
  useInjectSaga({ key: 'app', saga });
  useEffect(() => {
    init();
  }, []);

  // no longer used - provided an option to reconfigure your settings
  // const [showDialogue, setShowDialogue] = useState(false);

  const consentUnset =
    cookieConsent !== 'true' &&
    cookieConsent !== 'false' &&
    cookieConsentApp !== 'true' &&
    cookieConsentApp !== 'false';
  // console.log('Show cookie consent dialogue: ', checked && consentUnset);
  // console.log('Cookie consent cookie status: ', cookieConsent);
  // console.log('Cookie consent app status: ', cookieConsentApp);
  // console.log('Cookie consent checked: ', checked);
  // console.log('showDialogue', showDialogue);

  return (
    <Styled>
      {checked && consentUnset && (
        <StyledLayer
          position="bottom-right"
          plain
          responsive={false}
          modal={false}
          animate={false}
          margin="small"
        >
          <Box
            pad={{ vertical: 'small', horizontal: 'medium' }}
            background="darker"
            style={{ maxWidth: '100%', width: '360px' }}
            elevation="large"
          >
            <Paragraph
              margin={{ top: 'small', bottom: 'medium' }}
              size="medium"
            >
              <FormattedMessage {...messages.nonEssentialConsentInfo} />
            </Paragraph>
            <ButtonWrap>
              <StyledButtonHero
                onClick={() => {
                  onConsent('true');
                  // setShowDialogue(false);
                }}
              >
                <FormattedMessage {...messages.buttonAccept} />
              </StyledButtonHero>
              <StyledButtonHero
                secondary
                onClick={() => {
                  onConsent('false');
                  // setShowDialogue(false);
                }}
              >
                <FormattedMessage {...messages.buttonReject} />
              </StyledButtonHero>
            </ButtonWrap>
            <Paragraph margin={{ top: 'medium', bottom: 'small' }} size="small">
              <FormattedMessage {...messages.additionalInfo} />
              <LinkInText
                href={intl.formatMessage(messages.urlPrivacyPolicy)}
                target="_blank"
              >
                <FormattedMessage {...messages.linkPrivacyPolicy} />
              </LinkInText>
            </Paragraph>
          </Box>
        </StyledLayer>
      )}
    </Styled>
  );
}

CookieConsent.propTypes = {
  init: PropTypes.func,
  onConsent: PropTypes.func,
  cookieConsent: PropTypes.string,
  cookieConsentApp: PropTypes.string,
  checked: PropTypes.bool,
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  cookieConsent: state => getCookieConsent(state),
  cookieConsentApp: state => getCookieConsentApp(state),
  checked: state => getCookieConsentChecked(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    init: () => dispatch(checkCookieConsent()),
    onConsent: status => dispatch(setCookieConsent(status)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(CookieConsent));
