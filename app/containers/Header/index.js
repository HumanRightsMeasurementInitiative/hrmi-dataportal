/**
 *
 * Header
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import styled from 'styled-components';
import { Box, Button, DropButton } from 'grommet';
import { Menu, Close } from 'grommet-icons';

import ContentContainer from 'styled/ContentContainer';

import Icon from 'components/Icon';

import LocaleToggle from 'containers/LocaleToggle';
import NavCountry from 'containers/NavCountry';
import NavMetric from 'containers/NavMetric';
import { PAGES } from 'containers/App/constants';
import { navigate } from 'containers/App/actions';

import rootMessages from 'messages';
import messages from './messages';

const Styled = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100px;
  color: ${props => props.theme.global.colors.white};
`;

const NavBarTop = props => (
  <ContentContainer
    direction="row"
    align="center"
    background="dark-1"
    height="44px"
    width="full"
    fill="horizontal"
    {...props}
  />
);
const NavBarBottom = props => (
  <Box
    elevation="large"
    direction="row"
    align="center"
    background="blue-dark"
    height="56px"
    width="full"
    fill="horizontal"
    {...props}
  />
);

const BrandButton = styled(Button)`
  height: 44px;
  width: 120px;
  padding: 1px 5px;
  margin-right: -5px;
  color: ${props => props.theme.global.colors.white};
  &:hover {
    color: ${props => props.theme.global.colors['light-3']};
  }
`;
const TitleButton = styled(Button)`
  height: 44px;
  width: 120px;
  padding: 1px 5px;
  margin-right: -5px;
  color: ${props => props.theme.global.colors.white};
  &:hover {
    color: ${props => props.theme.global.colors['light-3']};
  }
`;
// prettier-ignore
const NavButton = styled(Button)`
  height: 44px;
  padding: 5px 10px;
  color: ${props => props.theme.global.colors.white};
  display: block;
  @media (min-width: ${props => props.theme.global.breakpoints.medium.value}px) {
    display: inline-block;
  }
  &:hover {
    color: ${props => props.theme.global.colors['light-3']};
  }
`;

// prettier-ignore
const MenuList = styled.div`
  display: ${props => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 99999;
  background: ${props => props.theme.global.colors['dark-1']};
  @media (min-width: ${props => props.theme.global.breakpoints.medium.value}px) {
    position: relative;
    z-index: 300;
    top: auto;
    left: auto;
    right: auto;
    width: auto;
    height: 44px;
    background: transparent;
    display: flex;
    flex-direction: row;
    margin: 0 0 0 auto;
    align-items: center;
  }
`;
// prettier-ignore
const ToggleMenu = styled(Button)`
  display: block;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 300;
  width: 44px;
  height: 44px;
  background-color: transparent;
  text-align: center;
  @media (min-width: ${props => props.theme.global.breakpoints.medium.value}px) {
    display: none;
  }
`;
// prettier-ignore
const LocaleToggleWrap = styled.span`
  display: block;
  @media (min-width: ${props => props.theme.global.breakpoints.medium.value}px) {
    display: inline;
  }
`;

const SecondaryDropButton = styled(DropButton)`
  height: 56px;
  padding: 5px 40px;
  background-color: ${({ active, theme }) =>
    active ? theme.global.colors['dark-2'] : 'transparent'};
  border-right: 2px solid;
  border-color: ${({ theme }) => theme.global.colors['dark-2']};
  &:hover {
    background-color: ${({ theme }) => theme.global.colors['dark-2']};
  }
`;

export function Header({ nav, intl }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showCountries, setShowCountries] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);

  return (
    <Styled role="banner">
      <div>
        <NavBarTop>
          <BrandButton
            plain
            onClick={() => {
              setShowMenu(false);
              nav({ pathname: '', search: '' });
            }}
          >
            <Icon name="BRAND" />
          </BrandButton>
          <TitleButton
            plain
            onClick={() => {
              setShowMenu(false);
              nav({ pathname: '', search: '' });
            }}
          >
            <FormattedMessage {...messages.appTitle} />
          </TitleButton>
          <ToggleMenu plain onClick={() => setShowMenu(!showMenu)}>
            {!showMenu && <Menu />}
            {showMenu && <Close />}
          </ToggleMenu>
          <MenuList visible={showMenu}>
            <span>
              <LocaleToggleWrap>
                <FormattedMessage {...messages.language} />
                <LocaleToggle />
              </LocaleToggleWrap>
            </span>
            <span>
              {PAGES &&
                PAGES.map(page => (
                  <NavButton
                    plain
                    key={page}
                    onClick={() => {
                      setShowMenu(false);
                      nav(`page/${page}`);
                    }}
                  >
                    <FormattedMessage {...rootMessages.page[page]} />
                  </NavButton>
                ))}
            </span>
          </MenuList>
        </NavBarTop>
      </div>
      <div>
        <NavBarBottom>
          <SecondaryDropButton
            plain
            open={showCountries}
            active={showCountries}
            onClose={() => setShowCountries(false)}
            onOpen={() => setShowCountries(true)}
            dropProps={{ align: { top: 'bottom', left: 'left' } }}
            dropContent={<NavCountry onClose={() => setShowCountries(false)} />}
            icon={<Icon name="COUNTRY" />}
            label={intl.formatMessage(messages.countries)}
          />
          <SecondaryDropButton
            plain
            open={showMetrics}
            active={showMetrics}
            onClose={() => setShowMetrics(false)}
            onOpen={() => setShowMetrics(true)}
            dropProps={{ align: { top: 'bottom', left: 'left' } }}
            dropContent={<NavMetric onClose={() => setShowMetrics(false)} />}
            icon={<Icon name="METRICS" />}
            label={intl.formatMessage(messages.metrics)}
          />
        </NavBarBottom>
      </div>
    </Styled>
  );
}

Header.propTypes = {
  /** Navigation action */
  nav: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

const mapDispatchToProps = dispatch => ({
  // navigate to location
  nav: location => {
    dispatch(navigate(location, { keepTab: true }));
  },
});

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(Header));
