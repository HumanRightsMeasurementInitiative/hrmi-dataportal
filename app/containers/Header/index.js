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

import Icon from 'components/Icon';

import LocaleToggle from 'containers/LocaleToggle';
import CountryToggle from 'containers/CountryToggle';
import { BREAKPOINTS, PAGES } from 'containers/App/constants';
import { navigate } from 'containers/App/actions';

import NavLink from 'styled/NavLink';

import messages from './messages';

const Styled = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  color: ${props => props.theme.colors.white};
  background: ${props => props.theme.colors.dark};
  @media (min-width: ${props => props.theme.breakpoints[BREAKPOINTS.SMALL]}) {
    height: 100px;
  }
`;

const NavBar = styled.div`
  position: relative;
  height: 50px;
  @media (min-width: ${props => props.theme.breakpoints[BREAKPOINTS.SMALL]}) {
    height: 50px;
  }
`;
const NavBarSecondary = styled(NavBar)`
  height: 50px;
  background: ${props => props.theme.colors.darkBlue};
  @media (min-width: ${props => props.theme.breakpoints[BREAKPOINTS.SMALL]}) {
    height: 50px;
  }
`;

const Brand = styled(NavLink)`
  box-shadow: none;
  min-width: 0;
  max-width: 130px;
  padding: 5px 10px;
  margin: 0;
  @media (min-width: ${props => props.theme.breakpoints[BREAKPOINTS.SMALL]}) {
    max-width: none;
    padding: 5px 14px;
    margin: 0 5px;
  }
`;

const Menu = styled.div`
  display: ${props => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 30px;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 99999;
  background: ${props => props.theme.colors.black};
  @media (min-width: ${props => props.theme.breakpoints[BREAKPOINTS.SMALL]}) {
    position: absolute;
    top: 0;
    bottom: auto;
    left: auto;
    right: 0;
    width: auto;
    z-index: 300;
    display: inline-block;
    background: transparent;
  }
`;
const ShowMenu = styled.button`
  display: ${props => (props.visible ? 'block' : 'none')};
  position: absolute;
  right: 0;
  top: 0;
  z-index: 300;
  @media (min-width: ${props => props.theme.breakpoints[BREAKPOINTS.SMALL]}) {
    display: none;
  }
  background-color: transparent;
`;
const HideMenu = styled.button`
  display: ${props => (props.visible ? 'block' : 'none')};
  position: absolute;
  right: 0;
  top: 0;
  z-index: 300;
  @media (min-width: ${props => props.theme.breakpoints[BREAKPOINTS.SMALL]}) {
    display: none;
  }
  background-color: transparent;
`;

const NavPages = styled.span``;

export function Header({ nav }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Styled role="banner">
      <NavBar>
        <Brand
          onClick={() => {
            setShowMenu(false);
            nav('');
          }}
        >
          <span>HRMI | </span>
          <span>Data Portal</span>
        </Brand>
        <ShowMenu visible={!showMenu} onClick={() => setShowMenu(true)}>
          <Icon name="brand" />
        </ShowMenu>
        <HideMenu visible={showMenu} onClick={() => setShowMenu(false)}>
          <Icon name="brand" />
        </HideMenu>
        <Menu visible={showMenu}>
          <LocaleToggle />
          <NavPages>
            {PAGES &&
              PAGES.map(page => (
                <NavLink
                  key={page}
                  onClick={() => {
                    setShowMenu(false);
                    nav(`page/${page}`);
                  }}
                >
                  <FormattedMessage {...messages.page[page]} />
                </NavLink>
              ))}
          </NavPages>
        </Menu>
      </NavBar>
      <NavBarSecondary>
        <CountryToggle />
      </NavBarSecondary>
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
