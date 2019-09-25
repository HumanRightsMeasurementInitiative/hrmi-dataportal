import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Box, Drop, Paragraph } from 'grommet';
// import { Checkmark } from 'grommet-icons';
import { getCookieConsent } from 'containers/App/selectors';
import { checkCookieConsent, setCookieConsent } from 'containers/App/actions';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/App/saga';
import ButtonPlain from 'styled/ButtonPlain';
import ButtonHighlight from 'styled/ButtonHighlight';

import messages from './messages';

const Styled = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 20px;
  background: ${props => props.theme.global.colors.black};
  z-index: 9999;
  display: block;
  text-align: right;
  line-height: 0;
`;
const Link = styled.a`
  color: ${props => props.theme.global.colors['light-4']};
  font-size: 14px;
  line-height: 20px;
  text-decoration: none;
  padding: 0 10px;
  &:hover {
    color: ${({ theme }) => theme.global.colors.white};
  }
`;
const LinkInText = styled.a`
  color: ${props => props.theme.global.colors.white};
  &:hover {
    color: ${({ theme }) => theme.global.colors.highlight};
  }
`;
const ButtonDrop = styled(ButtonPlain)`
  color: ${props => props.theme.global.colors['light-4']};
  font-size: 14px;
  line-height: 20px;
  margin-right: 20px;
  padding: 0 10px;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.global.colors.white};
    background-color: transparent;
  }
  &:active {
    color: ${({ theme }) => theme.global.colors.white};
    background-color: transparent;
  }
  &:visited {
    color: ${({ theme }) => theme.global.colors['light-4']};
    background-color: transparent;
  }
  &:focus {
    color: ${({ theme }) => theme.global.colors.white};
    background-color: transparent;
    box-shadow: none;
    border-radius: 0;
    outline: none;
  }
`;

const ButtonHighlightPrimary = styled(ButtonHighlight)`
  margin: 0 ${({ theme }) => theme.global.edgeSize.xsmall};
  border: 1px solid ${({ theme }) => theme.global.colors.highlight};
  &:hover {
    border-color: ${({ theme }) => theme.global.colors.highlight2};
  }
`;
// color: ${({ theme }) => theme.global.colors.dark};
// background-color: ${({ theme }) => theme.global.colors.white};
const ButtonHighlightSecondary = styled(ButtonHighlightPrimary)`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.global.colors.highlight};
  color: ${({ theme }) => theme.global.colors.highlight};
  &:hover {
    background-color: transparent;
    color: ${({ theme }) => theme.global.colors.white};
    border-color: ${({ theme }) => theme.global.colors.white};
  }
`;

const ButtonWrap = styled.div`
  text-align: center;
  margin: 0 auto;
`;

export function CookieConsent({ init, cookieConsent, intl, consent }) {
  useInjectSaga({ key: 'app', saga });
  useEffect(() => {
    init();
  }, []);

  const [showDialogue, setShowDialogue] = useState(false);
  const dialogueRef = useRef(null);

  const consentUnset = cookieConsent !== 'true' && cookieConsent !== 'false';

  return (
    <Styled>
      <Link
        href={intl.formatMessage(messages.urlPrivacyPolicy)}
        target="_blank"
      >
        <FormattedMessage {...messages.linkPrivacyPolicy} />
      </Link>
      <ButtonDrop
        ref={dialogueRef}
        onClick={() => {
          setShowDialogue(!showDialogue);
        }}
      >
        <FormattedMessage {...messages.linkDialogue} />
      </ButtonDrop>
      {(consentUnset || showDialogue) && dialogueRef.current && (
        <Drop
          align={{ bottom: 'top', right: 'right' }}
          target={dialogueRef.current}
          elevation="small"
        >
          <Box
            pad={{ vertical: 'small', horizontal: 'medium' }}
            background="dark-1"
            style={{ maxWidth: '100%', width: '360px' }}
          >
            <Paragraph margin={{ vertical: 'small' }}>
              <FormattedMessage {...messages.nonEssentialConsentInfo} />
            </Paragraph>
            <ButtonWrap>
              <ButtonHighlightPrimary
                onClick={() => {
                  consent('true');
                  setShowDialogue(false);
                }}
              >
                <FormattedMessage {...messages.buttonAccept} />
              </ButtonHighlightPrimary>
              <ButtonHighlightSecondary
                onClick={() => {
                  consent('false');
                  setShowDialogue(false);
                }}
              >
                <FormattedMessage {...messages.buttonReject} />
              </ButtonHighlightSecondary>
            </ButtonWrap>
            <Paragraph margin={{ vertical: 'small' }}>
              <FormattedMessage {...messages.additionalInfo} />
              <LinkInText
                href={intl.formatMessage(messages.urlPrivacyPolicy)}
                target="_blank"
              >
                <FormattedMessage {...messages.linkPrivacyPolicy} />
              </LinkInText>
            </Paragraph>
          </Box>
        </Drop>
      )}
    </Styled>
  );
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
