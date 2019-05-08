/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import styled from 'styled-components';

import Icon from 'components/Icon';

import LocaleToggle from 'containers/LocaleToggle';
import CountryToggle from 'containers/CountryToggle';
import { BREAKPOINTS } from 'containers/App/constants';
import { navigate } from 'containers/App/actions';

import NavLink from 'styled/NavLink';
import ContentContainer from 'styled/ContentContainer';

// import messages from './messages';

const Styled = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  @media (min-width: ${props => props.theme.breakpoints[BREAKPOINTS.SMALL]}) {
    height: 100px;
  }
  background: ${props => props.theme.colors.white};
`;

const NavBar = styled.div`
  position: relative;
  height: 50px;
  @media (min-width: ${props => props.theme.breakpoints[BREAKPOINTS.SMALL]}) {
    height: 70px;
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

// const LogoWrapper = styled.div`
//   position: absolute;
//   left: 0;
//   top: 0;
//   height: 50px;
//   @media (min-width: ${props => props.theme.breakpoints[BREAKPOINTS.MEDIUM]}) {
//     height: 70px;
//   }
// `;
// small helper function to figure out logo aspect ratio and infer display width from height
// (width and height are needed to show SVG on iPhone 4
// const widthForViewBox = (viewBox, height) => {
//   const vB = viewBox.split(' ');
//   const w = vB.length > 3 ? vB[2] : 164;
//   const h = vB.length > 3 ? vB[3] : 70;
//   return (w / h) * height;
// };

// const Logo = styled.svg`
//   position: relative;
//   height: 50px;
//   width: ${props => widthForViewBox(props.viewBox, 50)}px;
//   @media (min-width: ${props => props.theme.breakpoints[BREAKPOINTS.MEDIUM]}) {
//     height: 70px;
//     width: ${props => widthForViewBox(props.viewBox, 70)}px;
//   }
// `;

export function Header({ nav }) {
  return (
    <Styled role="banner">
      <NavBar>
        <ContentContainer>
          <Brand onClick={() => nav('')}>
            <Icon name="brand" />
          </Brand>
          <LocaleToggle />
          <CountryToggle />
        </ContentContainer>
      </NavBar>
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
