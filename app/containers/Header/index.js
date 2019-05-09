/**
 *
 * Header
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import styled from 'styled-components';
import { Box, Button } from 'grommet';
import { Menu, Close } from 'grommet-icons';

import LocaleToggle from 'containers/LocaleToggle';
import CountryToggle from 'containers/CountryToggle';
import { PAGES } from 'containers/App/constants';
import { navigate } from 'containers/App/actions';

import rootMessages from 'messages';
import messages from './messages';

const Styled = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  color: ${props => props.theme.global.colors.white};
`;

const NavBarTop = props => (
  <Box
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
    elevation="medium"
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
  width: 200px;
  padding: 5px 10px;
  color: ${props => props.theme.global.colors.white};
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
    position: absolute;
    top: 0;
    height: 44px;
    left: auto;
    right: 0;
    width: auto;
    z-index: 300;
    display: inline-block;
    background: transparent;
  }
`;
// prettier-ignore
const ToggleMenu = styled(Button)`
  display: ${props => (props.visible ? 'block' : 'none')};
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

export function Header({ nav }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Styled role="banner">
      <div>
        <NavBarTop>
          <BrandButton
            plain
            onClick={() => {
              setShowMenu(false);
              nav('');
            }}
          >
            <span>HRMI | </span>
            <span>Data Portal</span>
          </BrandButton>
          <ToggleMenu
            plain
            visible={!showMenu}
            onClick={() => setShowMenu(true)}
          >
            <Menu />
          </ToggleMenu>
          <ToggleMenu
            plain
            visible={showMenu}
            onClick={() => setShowMenu(false)}
          >
            <Close />
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
          <CountryToggle />
        </NavBarBottom>
      </div>
    </Styled>
  );
}

Header.propTypes = {
  /** Navigation action */
  nav: PropTypes.func.isRequired,
  // dispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  // navigate to location
  nav: location => {
    dispatch(navigate(location));
  },
});

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(Header);
